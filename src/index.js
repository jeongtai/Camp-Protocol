import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import { combineReducers, createStore } from 'redux';

let initialstate = {CAMPamount : 0, SCAMPamount : 0, USDCamount : 0}

function reducer (state = initialstate, action) {
  switch(action.type) {
    case "MT/RD change":
      return {
        ...state,
        CAMPamount : action.CAMPamount,
        SCAMPamount : action.SCAMPamount,
        USDCamount : action.USDCamount
      }
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