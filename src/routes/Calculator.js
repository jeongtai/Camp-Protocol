import Caver from "caver-js";
import { useState } from "react";
import { useSelector } from "react-redux";

const caver = new Caver(window.klaytn)

const Calculator = () =>{
  let state = useSelector((state) => state)


    return (
        <h1>Calculator!!</h1>
    )
}

export default Calculator;