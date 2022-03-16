import {useState, useEffect} from "react";
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
    Stroke: Solid #EDEDED 1px;
    background-color: white;
    border-radius: 15px;
    margin-top: 35px;
    padding : 24px 28px;
    height : 240px;
    border : 2px solid ${props=>props.theme.borderColor};
    span {
        padding: 28 px;
        font-weight : 400;
        font-size : 20px;
    }
`;

const TVL = styled.div`
    margin : 20px 0px;
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
        state.BankContract.methods.info().call((e, v) => setTCR(caver.utils.fromPeb(v[0], 'KLAY')))
        state.BankContract.methods.info().call((e, v) => setECR(caver.utils.fromPeb(v[1], 'Mpeb')))
    })
    return (
        <Container>
            <PageHeader>
                <p>Dashboard</p>
                <p>protocol</p>
            </PageHeader>
            <Overview>
                <span>Overview</span>
                <h3>tcr : {tcr}</h3>
                <h3>ecr : {ecr}</h3>
            </Overview>
            <TVL>
                <p>TVL</p>
            </TVL>


        </Container>
    )
}
export default Home;