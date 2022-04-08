import { useState, useEffect } from "react";

import InputForm from "./InputForm";
import Button from "../assets/Button";

import LoadingSVG from "../assets/LoadingSVG.js";

const caver = new Caver(window.klaytn)

function Collecttool() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading ? (
                <p align-items="center">
                    <LoadingSVG
                        type="circle"
                        color="#000"
                        width="80px"
                        height="80px"
                        strokeWidth="1"
                    />
                </p>
            )
                :
                <>
                    <InputForm
                        token="SCAMP"
                        balance={SCAMPBalance}
                        onChange={SCAMPamt}
                        value={scampInputAmount}
                        setValueFn={setScampInputAmount}
                        type="number"
                        isVisible={true}
                        haveMax={true}
                        haveBal={true}
                    />
                </>


            }
        </>
    )
}
