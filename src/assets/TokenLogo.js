import CAMP from "./TokenLogo/KPG.svg";
import SCAMP from "./TokenLogo/KUSD.svg";
import USDT from "./TokenLogo/USDT.svg";
import KLAY from "./TokenLogo/KLAY.svg"
import EKL from  "./TokenLogo/EKL.svg";
import KPG from "./TokenLogo/KPG.svg";
import kpEKL from  "./TokenLogo/kpEKL.png";
import styled from "styled-components";


const LpLogo = styled.div`
  width : 40px;
  display: flex;
  flex-direction: row;
  padding : 0 0 0 10px;

  & .secondTokenLogo{
    position: relative;
    left: -15px;
  }
`
const arrTokenLogo = {
    'KPG' : KPG,
    'CAMP': CAMP,
    'SCAMP': SCAMP,
    'USDT': USDT,
    'KLAY': KLAY,
    'EKL': EKL,
    'kpEKL' : kpEKL,
}

function TokenLogo({ name }) {
    const src = arrTokenLogo[name]
    let isLP;
    let lpTokenA;
    let lpTokenB;
    if (name){
        isLP = (name.split("-").length > 1)
        lpTokenA = arrTokenLogo[name.split("-")[0]]
        lpTokenB = arrTokenLogo[name.split("-")[1]]
    }   

    return (
    <>
    {isLP ?
            <LpLogo>
                <span><img width="23px" src={lpTokenA} /></span>
                <span className="secondTokenLogo"><img width="23px" src={lpTokenB} /></span>
              </LpLogo>
        : <div><img width="23px" src={src} /></div>
    }
    </>
    )

}

export default TokenLogo;