import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BondManager() {
  let state = useSelector((state) => state)
  const [ekl3moonbal, set3Moonbal] = useState()
  const [ekl3moonprice, set3Moonprice] = useState()

  let undepositval = ekl3moonbal * ekl3moonprice


  async function getInfo() {

    try {
      await state.EKL3MoonLPContract.methods
        .balanceOf(state.BondTreasuryContract._address)
        .call((e, v) => set3Moonbal(v / 1e18));
    } catch { set3Moonbal(undefined) }

    try {
      await state.EKL3MoonBondContract.methods
        .assetPrice()
        .call((e, v) => set3Moonprice(v / 1e6));
    } catch { set3Moonprice(undefined) }  
  
  }

  function onClick() {
    state.BondTreasuryContract.methods.depositAll(0)
    .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
    })
}


  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log(accounts, "account change listen in bond");
      });
    }
  }, []);

    return (
    <div>
      <p>{undepositval}</p>
      <btn onClick={onClick}>Deposit</btn>
    </div>
    )
}
export default BondManager;