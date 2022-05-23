
import styled, { keyframes } from "styled-components";
const Section = styled.div`
    left : auto;
    right : auto;
`

const Setting = styled.div`
    position: absolute;
    margin-left : 14%;
    padding: 20px;

    width: 200px;
    height: 150px;

    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};
    z-index: 2;
    box-shadow: 0px 4px 20px 0px #00000033;

    font-size: 14px;

    transform-origin: 100% 0;
    animation: ${keyframes`
                0% { transform:scale(0) }
                100% { transform:scale(1) }
                `} 0.2s linear;

`;

const InputSlippage = styled.input.attrs({ required: true })`
    margin: 14px 0px;
    border-radius: 8px;
    width: 80%;
    height: 40px;
    border: 1px solid ${(props) => props.theme.btnBlue};
    font-size: 18px;
    font-family: "Lexend", sans-serif;
    opacity: 1;
`;

const SlippageButton = styled.button`
    padding: 4px 10px;
    margin: 4px;
    border-radius: 5px;
    background-color: ${(props) =>
            props.isMatch ? props.theme.btnBlue : props.theme.btnGray};
    color: ${(props) => (props.isMatch ? "white" : "black")};

`;


function SlippageSetting(props) {
    return (
        <Section>
            <Setting>
                <p>Slippage Tolerance</p>
                <InputSlippage
                    max="100"
                    type="number"
                    onChange={props.Slipamt}
                    value={props.slippage <= 100 ? props.slippage : 100}
                />
                <span>%</span>
                <div>
                    <SlippageButton
                        onClick={() => props.setSlippage(0.1)}
                        isMatch={0.1 === props.slippage}
                    >
                        0.1
                    </SlippageButton>

                    <SlippageButton
                        onClick={() => props.setSlippage(0.5)}
                        isMatch={0.5 === props.slippage}
                    >
                        0.5
                    </SlippageButton>

                    <SlippageButton
                        onClick={() => props.setSlippage(1.0)}
                        isMatch={1.0 === props.slippage}
                    >
                        1.0
                    </SlippageButton>
                </div>
            </Setting>
        </Section>
    )
}

export default SlippageSetting;
