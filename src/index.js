import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {createStore } from 'redux';
import Caver from 'caver-js'
import Bankjs from "./abis/Bank.json"

window.global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;

const caver = new Caver(window.klaytn)
const BankContract = new caver.klay.Contract(Bankjs.abi, "0x470aC5e9E098731F0911003218505151e47a6aDD")

const initialstate = {BankContract}

function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Minting":
        BankContract.methods.mint(
          caver.utils.toPeb(action.USDCamount*1000, 'mKLAY'),
          caver.utils.toPeb(action.CAMPamount*1000, 'mKLAY'),
          caver.utils.toPeb(action.SCAMPamount*1000*0.9, 'mKLAY')
        ).send({
          from: window.klaytn.selectedAddress,
          gas : '3000000'
        })
      return state
    default :
      return state;
  }
}

let store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);