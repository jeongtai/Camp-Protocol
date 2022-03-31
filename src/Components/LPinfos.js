// function LPInfoDiv(name){
//   const poolInfo = [{
//     name : "", 
//   }]

import { useState, useEffect } from "react";

//   useEffect(()=>{
//     poolInfo.name= props
//     poolInfo.bal= state.lp풀정보컨트랙.methods.lpBalanceOf()
//     poolInfo.discount= state.lp풀정보컨트랙.methods.discountOf()
//     ...
//     isPossible= false
//   },[])


//   return (
//     <div>
//     <p>
//       name
//     </p>
//     <a href="LP풀 얻는 URL"></a>
//     정
//     보
//     들

//     <button>{isBond ? Bond : Bonded}</button>
//     </div>
//   )
// }

// export default LPInfoDiv;

function LPInfos({ props }) {
  const [bondprice, setBondPrice] = useState()
  useEffect(async () => {
    try {
      await props.contract.methods.bondPrice()
        .call((e, v) => setBondPrice(v))
    } catch (e) { setBondPrice(undefined) }
  }, [])


  const route =()=>{
    console.log("route");
  }
  
  return (    
    <div>
      <span>{console.log(props)}
        {bondprice}
        {props.name}</span>
      <button onClick={()=>route()}>bond</button>
    </div>
  )

}

export default LPInfos;