import Caver from "caver-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const caver = new Caver(window.klaytn)

const Calculator = () =>{
  let state = useSelector((state) => state)
  const [canUpdate, setCanpUpdate] = useState()


  async function getInfo() {
    await state.OracleContract.methods.canUpdate().call((e, v) => setCanpUpdate(v))
    if (canUpdate == true) {
      state.OracleContract.methods.update().send({
        from : window.klaytn.selectedAddress,
        gas : 3000000
      }).on('receipt', function receipt() {
        state.OracleContract.methods.consult("0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3", 1000000).call((e, v) => console.log(v/1000000))
      })
    } else if (canUpdate == false) {
      state.OracleContract.methods.consult("0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3", 1000000).call((e, v) => console.log(v/1000000))
    } else {
      console.log("Error!")
    }
  }

  useEffect(() => {
    getInfo()
  }, [])
    return (
      <div>
        <h1>Calculator!!</h1>
      </div>
    )
}

export default Calculator;