// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./Interfaces/Interfaces.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';


contract Booster{
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    address public constant ekl = address(0xADbC5fe6E80E606E640832656E3A7D8AE0dd1CA1); //EKL
    address public constant registry = address(0x0000000022D53366457F9d5E68Ec105046FC4383); //EKL Registry
    uint256 public constant distributionAddressId = 4;
    address public constant voteOwnership = address(0xE478de485ad2fe566d49342Cbd03E49ed7DB3356); //EKL VOteOwnership
    address public constant voteParameter = address(0xBCfF8B0b9419b9A88c44546519b1e909cF330399); //EKL VoteParameter

    uint256 public lockIncentive = 1000; //kpEKL Staker에게 뿌려줄 EKL
    uint256 public stakerIncentive = 450; //KP Staker에게 뿌려줄 EKL
    uint256 public earmarkIncentive = 50; //함수Caller에게 뿌려줄 EKL
    uint256 public platformFee = 0; //Locker에게 뿌려줄 EKL
    uint256 public distributionrate = 2000;
    uint256 public constant MaxFees = 10000; //다합쳐서 20%를 넘을 수 X
    uint256 public constant FEE_DENOMINATOR = 10000;
    

    address public owner;
    address public feeManager;
    address public poolManager;
    address public immutable staker; //
    address public immutable minter;
    address public rewardFactory;
    address public stashFactory;
    address public tokenFactory;
    address public rewardArbitrator;
    address public voteDelegate;
    address public treasury; //StakingProxy
    address public stakerRewards; //KP stake 주소
    address public lockRewards; //kpEKL stake 주소
    address public lockFees; //kpekl veekl fees
    address public feeDistro;
    address public feeToken;
    address public bondTreasury;

    bool public isShutdown;

    struct PoolInfo {
        address lptoken;
        address token;
        address gauge;
        address kpRewards;
        address stash;
        bool shutdown;
    }

    //index(pid) -> pool
    PoolInfo[] public poolInfo;
    mapping(address => bool) public gaugeMap;

    event Deposited(address indexed user, uint256 indexed poolid, uint256 amount);
    event Withdrawn(address indexed user, uint256 indexed poolid, uint256 amount);

    constructor(address _staker, address _minter) public {
        isShutdown = false;
        staker = _staker; //VoterProxy
        owner = msg.sender;
        voteDelegate = msg.sender;
        feeManager = msg.sender;
        poolManager = msg.sender;
        feeDistro = address(0x7e6d10a83CFb603b0325241492Eda23b93B53C89); //address(0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc); //EKLfeeDistributor
        feeToken = address(0x96748564751bEF5376B3f632f009BCca21700D12); //address(0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490); //3Moon
        treasury = address(0); //StakingProxy(Locker에게 줄 ekl, 3Moon)
        minter = _minter; //KP
    }


    /// SETTER SECTION ///

    function setOwner(address _owner) external {
        require(msg.sender == owner, "!auth");
        owner = _owner;
    }

    function setFeeManager(address _feeM) external {
        require(msg.sender == feeManager, "!auth");
        feeManager = _feeM;
    }

    function setPoolManager(address _poolM) external {
        require(msg.sender == poolManager, "!auth");
        poolManager = _poolM;
    }

    function setFactories(address _rfactory, address _sfactory, address _tfactory) external {
        require(msg.sender == owner, "!auth");
        
        //reward factory only allow this to be called once even if owner
        //removes ability to inject malicious staking contracts
        //token factory can also be immutable
        if(rewardFactory == address(0)){
            rewardFactory = _rfactory;
            tokenFactory = _tfactory;
        }

        //stash factory should be considered more safe to change
        //updating may be required to handle new types of gauges
        stashFactory = _sfactory;
    }

    function setVoteDelegate(address _voteDelegate) external {
        require(msg.sender==voteDelegate, "!auth");
        voteDelegate = _voteDelegate;
    }

    function setRewardContracts(address _rewards, address _stakerRewards) external {
        require(msg.sender == owner, "!auth");
        
        //reward contracts are immutable or else the owner
        //has a means to redeploy and mint kp via rewardClaimed()
        if(lockRewards == address(0)){
            lockRewards = _rewards;
            stakerRewards = _stakerRewards;
        }
    }

    // Set reward token and claim contract, get from Curve's registry
    function setFeeInfo() external {
        require(msg.sender==feeManager, "!auth");
        
        feeDistro = IRegistry(registry).get_address(distributionAddressId);
        address _feeToken = IFeeDistro(feeDistro).token();
        if(feeToken != _feeToken){
            //create a new reward contract for the new token
            lockFees = IRewardFactory(rewardFactory).CreateTokenRewards(_feeToken,lockRewards,address(this));
            feeToken = _feeToken;
        }
    }

    function setFees(uint256 _lockFees, uint256 _stakerFees, uint256 _callerFees, uint256 _platform, uint256 _distrrate) external{
        require(msg.sender==feeManager, "!auth");

        uint256 total = _lockFees.add(_stakerFees).add(_callerFees).add(_platform);
        require(total == MaxFees, ">MaxFees");

        //values must be within certain ranges     
        if(_lockFees >= 1000 && _lockFees <= 3000
            && _stakerFees >= 1000 && _stakerFees <= 3000
            && _callerFees >= 10 && _callerFees <= 100
            && _platform <= 6000){
            lockIncentive = _lockFees;
            stakerIncentive = _stakerFees;
            earmarkIncentive = _callerFees;
            platformFee = _platform;
            distributionrate = _distrrate;
        }
    }

    function setTreasury(address _treasury) external {
        require(msg.sender==feeManager, "!auth");
        treasury = _treasury;
    }
    
    function setArbitrator(address _arb) external {
        require(msg.sender==owner, "!auth");
        rewardArbitrator = _arb;
    }

    function setBondTreasury(address _bondTreasury) external {
        require(msg.sender==owner, "!auth");
        bondTreasury = _bondTreasury;
    }    
    /// END SETTER SECTION ///

    function mint_KP(uint256 _amount) external {
      require(msg.sender ==owner, "!auth");
      ITokenMinter(minter).mint(bondTreasury, _amount);
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    //create a new pool
    function addPool(address _lptoken, address _gauge, uint256 _stashVersion) external returns(bool){
        require(msg.sender==poolManager && !isShutdown, "!add");
        require(_gauge != address(0) && _lptoken != address(0),"!param");

        //the next pool's pid
        uint256 pid = poolInfo.length;
        //create a tokenized deposit
        address token = ITokenFactory(tokenFactory).CreateDepositToken(_lptoken);
        //create a stash to handle extra incentives
        address stash = IStashFactory(stashFactory).CreateStash(pid,_gauge,staker,_stashVersion);

        //add the new pool
        poolInfo.push(
            PoolInfo({
                lptoken: _lptoken,
                token: token,
                gauge: _gauge,
                kpRewards: stakerRewards,
                stash: stash,
                shutdown: false
            })
        );
        gaugeMap[_gauge] = true;
        //give stashes access to rewardfactory and voteproxy
        //   voteproxy so it can grab the incentive tokens off the contract after claiming rewards
        //   reward factory so that stashes can make new extra reward contracts if a new incentive is added to the gauge
        if(stash != address(0)){
            poolInfo[pid].stash = stash;
            IStaker(staker).setStashAccess(stash,true);
            IRewardFactory(rewardFactory).setAccess(stash,true);
        }
        return true;
    }

    //shutdown pool
    function shutdownPool(uint256 _pid) external returns(bool){
        require(msg.sender==poolManager, "!auth");
        PoolInfo storage pool = poolInfo[_pid];

        //withdraw from gauge
        try IStaker(staker).withdrawAll(pool.lptoken,pool.gauge){
        }catch{}

        pool.shutdown = true;
        gaugeMap[pool.gauge] = false;
        return true;
    }

    //shutdown this contract.
    //  unstake and pull all lp tokens to this address
    //  only allow withdrawals
    function shutdownSystem() external{
        require(msg.sender == owner, "!auth");
        isShutdown = true;

        for(uint i=0; i < poolInfo.length; i++){
            PoolInfo storage pool = poolInfo[i];
            if (pool.shutdown) continue;

            address token = pool.lptoken;
            address gauge = pool.gauge;

            //withdraw from gauge
            try IStaker(staker).withdrawAll(token,gauge){
                pool.shutdown = true;
            }catch{}
        }
    }


    //deposit lp tokens and stake
    function deposit(uint256 _pid, uint256 _amount) public returns(bool){
        require(!isShutdown,"shutdown");
        PoolInfo storage pool = poolInfo[_pid];
        require(pool.shutdown == false, "pool is closed");

        //send to proxy to stake
        address lptoken = pool.lptoken;
        IERC20(lptoken).safeTransferFrom(msg.sender, staker, _amount);

        //stake
        address gauge = pool.gauge;
        require(gauge != address(0),"!gauge setting");
        IStaker(staker).deposit(lptoken,gauge);

        //some gauges claim rewards when depositing, stash them in a seperate contract until next claim
        address stash = pool.stash;
        if(stash != address(0)){
            IStash(stash).stashRewards();
        }

        address token = pool.token;
        ITokenMinter(token).mint(msg.sender,_amount);
        
        emit Deposited(msg.sender, _pid, _amount);
        return true;
    }

    //deposit all lp tokens and stake
    function depositAll(uint256 _pid) external returns(bool){
        address lptoken = poolInfo[_pid].lptoken;
        uint256 balance = IERC20(lptoken).balanceOf(msg.sender);
        deposit(_pid,balance);
        return true;
    }

    //withdraw lp tokens
    function _withdraw(uint256 _pid, uint256 _amount, address _from, address _to) internal {
        PoolInfo storage pool = poolInfo[_pid];
        address lptoken = pool.lptoken;
        address gauge = pool.gauge;

        //remove lp balance
        address token = pool.token;
        ITokenMinter(token).burn(_from,_amount);

        //pull from gauge if not shutdown
        // if shutdown tokens will be in this contract
        if (!pool.shutdown) {
            IStaker(staker).withdraw(lptoken,gauge, _amount);
        }

        //some gauges claim rewards when withdrawing, stash them in a seperate contract until next claim
        //do not call if shutdown since stashes wont have access
        address stash = pool.stash;
        if(stash != address(0) && !isShutdown && !pool.shutdown){
            IStash(stash).stashRewards();
        }
        
        //return lp tokens
        IERC20(lptoken).safeTransfer(_to, _amount);
        emit Withdrawn(_to, _pid, _amount);
    }

    //withdraw lp tokens
    function withdraw(uint256 _pid, uint256 _amount) public returns(bool){
        _withdraw(_pid,_amount,msg.sender,msg.sender);
        return true;
    }

    //withdraw all lp tokens
    function withdrawAll(uint256 _pid) public returns(bool){
        address token = poolInfo[_pid].token;
        uint256 userBal = IERC20(token).balanceOf(msg.sender);
        withdraw(_pid, userBal);
        return true;
    }

    //allow reward contracts to send here and withdraw to user
    // function withdrawTo(uint256 _pid, uint256 _amount, address _to) external returns(bool){
    //     address rewardContract = poolInfo[_pid].eklRewards;
    //     require(msg.sender == rewardContract,"!auth");

    //     _withdraw(_pid,_amount,msg.sender,_to);
    //     return true;
    // }

    //delegate address votes on dao
    function vote(uint256 _voteId, address _votingAddress, bool _support) external returns(bool){
        require(msg.sender == voteDelegate, "!auth");
        require(_votingAddress == voteOwnership || _votingAddress == voteParameter, "!voteAddr");
        
        IStaker(staker).vote(_voteId,_votingAddress,_support);
        return true;
    }

    function voteGaugeWeight(address[] calldata _gauge, uint256[] calldata _weight ) external returns(bool){
        require(msg.sender == voteDelegate, "!auth");

        for(uint256 i = 0; i < _gauge.length; i++){
            IStaker(staker).voteGaugeWeight(_gauge[i],_weight[i]);
        }
        return true;
    }

    function claimRewards(uint256 _pid, address _gauge) external returns(bool){
        address stash = poolInfo[_pid].stash;
        require(msg.sender == stash,"!auth");

        IStaker(staker).claimRewards(_gauge);
        return true;
    }

    function setGaugeRedirect(uint256 _pid) external returns(bool){
        address stash = poolInfo[_pid].stash;
        require(msg.sender == stash,"!auth");
        address gauge = poolInfo[_pid].gauge;
        bytes memory data = abi.encodeWithSelector(bytes4(keccak256("set_rewards_receiver(address)")), stash);
        IStaker(staker).execute(gauge,uint256(0),data);
        return true;
    }

    //claim ekl and extra rewards and disperse to reward contracts
    function _earmarkRewards(uint256 _pid) internal {
        PoolInfo storage pool = poolInfo[_pid];
        require(pool.shutdown == false, "pool is closed");

        address gauge = pool.gauge;

        //claim ekl
        IStaker(staker).claimEKL(gauge);

        //check if there are extra rewards
        address stash = pool.stash;
        if(stash != address(0)){
            //claim extra rewards
            IStash(stash).claimRewards();
            //process extra rewards
            IStash(stash).processStash();
        }

        //ekl balance
        uint256 eklBal = IERC20(ekl).balanceOf(address(this));

        if (eklBal > 0) {
            uint256 _lockIncentive = eklBal.mul(lockIncentive).div(FEE_DENOMINATOR);
            uint256 _stakerIncentive = eklBal.mul(stakerIncentive).div(FEE_DENOMINATOR);
            uint256 _callIncentive = eklBal.mul(earmarkIncentive).div(FEE_DENOMINATOR);
            
            //send treasury
            if(treasury != address(0) && treasury != address(this) && platformFee > 0){
                //only subtract after address condition check
                uint256 _platform = eklBal.mul(platformFee).div(FEE_DENOMINATOR);
                IERC20(ekl).safeTransfer(treasury, _platform);
            }
            //send incentives for calling
            IERC20(ekl).safeTransfer(msg.sender, _callIncentive);          

            //send lockers' share of ekl to reward contract
            IERC20(ekl).safeTransfer(lockRewards, _lockIncentive);
            IRewards(lockRewards).queueNewRewards(_lockIncentive);

            //send stakers's share of ekl to reward contract
            IERC20(ekl).safeTransfer(stakerRewards, _stakerIncentive);
            IRewards(stakerRewards).queueNewRewards(_stakerIncentive);
        }
    }

    function earmarkRewards(uint256 _pid) external returns(bool){
        require(!isShutdown,"shutdown");
        _earmarkRewards(_pid);
        return true;
    }

    //claim fees from curve distro contract, put in lockers' reward contract
    function earmarkFees() external returns(bool){
        //claim fee rewards
        IStaker(staker).claimFees(feeDistro, feeToken);
        //send fee rewards to reward contract
        uint256 _balance = IERC20(feeToken).balanceOf(address(this));
        uint256 _kplockfee = _balance.mul(distributionrate).div(FEE_DENOMINATOR);
        _balance = _balance.sub(_kplockfee); 
        IERC20(feeToken).safeTransfer(lockFees, _balance);
        IRewards(lockFees).queueNewRewards(_balance); //Have to Change
        IERC20(feeToken).safeTransfer(treasury, _kplockfee);
        return true;

    }

}