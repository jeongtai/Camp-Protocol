import CAMP from "./TokenLogo/KPG.svg";
import SCAMP from "./TokenLogo/KUSD.svg";
import oUSDT from "./TokenLogo/USDT.svg";
import KLAY from "./TokenLogo/KLAY.svg"
import EKL from "./TokenLogo/EKL.svg";
import KPG from "./TokenLogo/KPG.svg";
import kpEKL from "./TokenLogo/kpEKL.png";
import ThreeMoon from "./TokenLogo/3Moon.png";

import styled from "styled-components";


const LpLogo = styled.div`
  width : 40px;
  display: flex;
  flex-direction: row;
  padding : 0 0 0 10px;

  & .firstTokenLogo{
    position: relative;
    left: -7px;
  }
  & .secondTokenLogo{
    position: relative;
    left: -15px;
  }
`
const arrTokenLogo = {
  'KPG': KPG,
  'CAMP': CAMP,
  'SCAMP': SCAMP,
  'oUSDT': oUSDT,
  'KLAY': KLAY,
  'EKL': EKL,
  'kpEKL': kpEKL,
  '3Moon LP': ThreeMoon,
}

function TokenLogo({ name }) {
  const src = arrTokenLogo[name]
  let isLP;
  let lpTokenA;
  let lpTokenB;
  if (name) {
    isLP = (name.split("-").length > 1)
    lpTokenA = arrTokenLogo[name.split("-")[0]]
    lpTokenB = arrTokenLogo[name.split("-")[1]]
  }

  return (
    <>
      {isLP ?
        <LpLogo>
          <span className="firstTokenLogo"><img width="23px" src={lpTokenA} /></span>
          <span className="secondTokenLogo"><img width="23px" src={lpTokenB} /></span>
        </LpLogo>
        // 이름에 " LP" 존재하면 46px. 아니면 23px
        : <div>{name.split(" LP").length > 1 ? <img width="46px" src={src} /> : <img width="23px" src={src} />}</div>
      }
    </>
  )

}

export default TokenLogo;