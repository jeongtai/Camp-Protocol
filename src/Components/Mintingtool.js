import Button from "./Button"
import Input from "./INPUT"
import {useSelector} from 'react-redux'
import {useState} from 'react'
import Caver from "caver-js"

const caver = new Caver(window.klaytn)

function Mintingtool() {
  let state = useSelector((state) => state)
  let BankAddress = "0x470aC5e9E098731F0911003218505151e47a6aDD"

  const [usdcamount, setUSDCamount] = useState();
  const [campamount, setCampAmount] = useState();
  const [scampamount, setScampAmount] = useState();
  const [isapproved, setIsApproved] = useState(false);
  const [slippage, setSlippage] = useState();

  const USDCamt = (event) => {
    setUSDCamount(Math.round(event.target.value*100)/100)
    setCampAmount(Math.round(event.target.value*100/5)/100)
    setScampAmount(Math.round(event.target.value*5*100/4)/100)
  }
  const CAMPamt = (event) => {
      setUSDCamount(Math.round(event.target.value*4*100)/100)
      setCampAmount(Math.round(event.target.value*100)/100)
      setScampAmount(Math.round(event.target.value*5*100)/100)
  }
  const SCAMPamt = (event) => {
      setUSDCamount(Math.round(event.target.value*100*4/5)/100)
      setCampAmount(Math.round(event.target.value*100/5)/100)
      setScampAmount(Math.round(event.target.value*100)/100)
  }
  const Slipamt = (event) => {
    setSlippage(event.target.value)
  }
  
  function onClick() {
    state.BankContract.methods.mintFractionalSCAMP(
      caver.utils.toPeb(usdcamount*1000, 'mKLAY'),
      caver.utils.toPeb(campamount*1000, 'mKLAY'),
      caver.utils.toPeb(scampamount*1000*(100 - {slippage})/100, 'mKLAY')
    ).send({
      from: window.klaytn.selectedAddress,
      gas : '3000000'
    })
  }

  function onClick2() {
    state.CAMPContract.methods.approve(
      BankAddress,
      caver.utils.toPeb(campamount*1000, 'mKLAY')
    ).send({
      from : window.klaytn.selectedAddress,
      gas: '3000000'
    }).on('receipt', function() {
      state.USDCContract.methods.approve(
        BankAddress,
        caver.utils.toPeb(usdcamount*1000, 'mKLAY')
      ).send({
        from : window.klaytn.selectedAddress,
        gas: '3000000'
      }).on('receipt', function() {
        setIsApproved(true)
      })
    })
  }

  function Zapmint() {
    
  }
  return (
    <div>
      <div>
        <Input
          onChange={Slipamt}
          value ={slippage}
          type = 'text'
          text = "Slippage Tolerance" />
      </div>
      <div>
        <Input
           onChange={USDCamt}
           value ={usdcamount}
           type = 'text'
           text = "USDC amount to mint">
        </Input>

        <Input
          onChange={CAMPamt}
          value ={campamount}
          type = 'text'
          text = "CAMP amount to mint">
        </Input>
        <Input
          onChange={SCAMPamt}
          value ={scampamount}
          type = 'text'
          text = "SCAMP amount to mint">
        </Input>
        {isapproved ? <Button text = "Mint" onClick={onClick}></Button> : <Button text="Approve" onClick={onClick2}>Approve</Button>}
      </div>
    </div>
  )
}
export default Mintingtool;