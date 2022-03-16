import react, {useState, useEffect} from "react";
import Caver from 'caver-js'
import ContJson from '../abis/contract-example.json'
import styled from "styled-components";
import { useSelector } from "react-redux";
  
const Container = styled.div`
    margin : 0 auto;
    width : 75%;
    max-width : 900px;
    justify-content: center;
    border: 1px;
    height : 800px;
`

const PageHeader = styled.div`
    font-size: 24px;
    font-weight : 600;

    p:first-child {
        margin-top: 62px;
    }

    p:last-child {
        margin-top: 28px;
    }
    
`
const Overview = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    margin-top: 35px;
    padding : 24px 28px;

    Stroke: Solid #EDEDED 1px;
    background-color: white;
    border-radius: 15px;
    
    height : 240px;
    border : 2px solid ${props=>props.theme.borderColor};

    span {
        font-weight : 400;
        font-size : 20px;
        width : 100%;
    }
`;

const OverviewItem = styled.div`
    flex: 1 1 25%;
    margin : 10px 0px;
    width : 20%;
    min-width: 120px;
    
    p:first-child {
        font-size : 14px;
        color : ${props=>props.theme.textGray};
    }
    p:last-child {
        margin-top: 10px;
        font-size : 18px;
    }
`

const TVL = styled.div`
    margin : 16px 0px;
    height : 200px;
    background-color: white;
    border-radius: 15px;
    border : 2px solid ${props=>props.theme.borderColor};
    width : 60%;
    padding : 20px;
`;

function Home() {
    let state = useSelector((state) => state)
    const [tcr, setTCR] = useState()
    const [ecr, setECR] = useState()
    const caver = new Caver(window.klaytn)
    const Infos = [
        {name : 'Total Market Cap', amt : '$ 415,252.5102'},
        {name : 'CAMP Price', amt : '$ 0.4602'},
        {name : 'TVL', amt : '$ 19,240.4912'},
        {name : 'Treasury Balance', amt : '$ 7,608.0027'},
        {name : 'Target Collateral Ratio', amt : tcr},
        {name : 'Effective Collateral Ratio', amt : ecr},
        {name : 'Owned Liquidity', amt : '$ 12,667.3552'},
        {name : 'Rented Liquidity', amt : '$ 16,891.8558'},
    ]
    
    const getKaikas = async () => {
        console.log('getKaikas')
        if (window.klaytn.selectedAddress !==undefined){
            await window.klaytn.enable().then((val)=> console.log("i found address : ",val))
                console.log(`wallet login success! ${window.klaytn.selectedAddress}`)
        }
        else {
            await window.klaytn.enable().then((val) => console.log("selectedAddress is undefined, but i found address : ",val))
            console.log(window.klaytn.selectedAddress
                        , window.klaytn.networkVersion
                        , window.klaytn.isKaikas)
        }
    }

    useEffect(() => {
        window.klaytn.enable()
        console.log(state.BankContract.methods.info().call((e, v) => setTCR(caver.utils.fromPeb(v[0], 'KLAY'))))
        state.BankContract.methods.info().call((e, v) => setECR(caver.utils.fromPeb(v[1], 'Mpeb')))
    },[])

    return (
        <Container>
            <PageHeader>
                <p>Dashboard</p>
                <p>protocol</p>
            </PageHeader>
            <Overview>
                <span>Overview</span>
                
                {Infos.map((info, index) => (
                <OverviewItem>
                    <p key={info.name}>{info.name}</p>
                    <p key={info.amt}>{info.amt}</p>
                </OverviewItem>
                ))}
                
            </Overview>
            <TVL>
                <p>TVL</p>
            </TVL>


        </Container>
    )
}
export default react.memo(Home);