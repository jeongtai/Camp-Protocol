- Bond.js
import Bondingtool from "../Components/Bondingtool";

const Bond = () =>{

  useEffect(()=>{

    const lpNameArray = LP풀의목록을 불러오는 부분

  },[])

  BondInfos = {

    sdfsdfsfd
  }


    return (
      <div>
        {/* <h1>Bond!!</h1>
        <Bondingtool/> */}

      <Overview>
        ...
      </Overview>

      <LPToken>
        <p>LP Token</p>
        <p> Name</p>
        <p> Market price</p>

          {lpNameArray.map((LPName, index) => (
              <LPInfoDiv key={LPName} props={name}  />
          ))}

      </LPToken>
      </div>  
    )
}

export default Bond;