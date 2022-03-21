import Caver from "caver-js";
import { useState } from "react";
import { useSelector } from "react-redux";

const caver = new Caver(window.klaytn)

const Calculator = () =>{
  let state = useSelector((state) => state)
  state.OracleContract.methods.canUpdate().call((e, v) => console.log(v))
  state.OracleContract.methods.consult("0x886C3A92f7439060F43ed0b54ba08850ABd62213", 1).call((e, v) => console.log(v))

    return (
      <div>
        <h1>Calculator!!</h1>
      </div>
    )
}

export default Calculator;