import Bondingtool from "../Components/Bondingtool";
import styled from "styled-components";
import LPInfoDiv from "../Components/LPinfos";
import LoadingSVG from "../assets/LoadingSVG";

const Bond = () =>{

const Overview = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 24px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        margin: 0 20px;
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        margin-bottom: 20px;
    }
`;

const OverviewItem = styled.div`
    flex: 1 1 20%;

    margin: 15px 10px;
    padding: 0px 10px;

    width: 23%;
    min-width: 120px;
    p:first-child {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
    p:last-child {
        margin-top: 10px;
        font-size: 18px;
    }
`;

const Bondinfos = [
  {name : "Total market Cap", amt : 100000000000},
  {name : "CAMP Price", amt : 10000000},
  {name : "TVL", amt : 10000000},
  {name : "Treasury Balance", amt : 100000},
]

    return (
      <div>
        <Overview>
          <span>Overview</span>

          {Bondinfos.map((info, index) => (
            <OverviewItem key = {info.name}>
              <p>{info.name}</p>
              <p>
                {info.amt ==="undefiend"
                ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                : info.amt}
              </p>
            </OverviewItem>
          ))}
        </Overview>
{/* 
      <LPToken>
        <p>LP Token</p>
        <p> Name</p>
        <p> Market price</p>

           {lpNameArray.map((LPName, index) => (
              <LPInfoDiv key={LPName} props={name}  />
          ))}

      </LPToken> */}
      </div>
        
    )
}

export default Bond;