import CAMP from "./CAMP-color.svg";
import SCAMP from "./SCAMP-color.svg";
import USDC from "./LegacyStable-color.svg";
import USDT from "./LegacyStable-color.svg";
import styled from "styled-components";
import KLAY from "./KLAY.svg"

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
    'CAMP': CAMP,
    'SCAMP': SCAMP,
    'USDC': USDC,
    'USDT': USDC,
    'KLAY': KLAY,
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