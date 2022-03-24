import CAMP from "../assets/CAMP-color.svg";
import SCAMP from "../assets/SCAMP-color.svg";
import USDC from "../assets/LegacyStable-color.svg";

const arrTokenLogo = {
    'CAMP' : CAMP,
    'SCAMP' : SCAMP,
    'USDC' : USDC
}

function TokenLogo({name}){
    const src = arrTokenLogo[name]
    return <img width="23px" src={src}/>;
}

export default TokenLogo;