import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import LogoImg from "../assets/Logo.svg";
import LogoTxt from "../assets/Logo-text.svg";
import Dashboard from "../assets/Dashboard.svg";
import Bank from "../assets/Bank.svg";
import Bond from "../assets/Bond.svg";
import Stake from "../assets/Stake.svg";
import Calculator from "../assets/Calculator.svg";
import Fund from "../assets/Fund.svg";

const Nav = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    flex-direction: column;

    width: ${(props) => props.theme.navWidth};
    max-width: 360px;

    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    overflow-x: hidden; /* Disable horizontal scroll */
    z-index: 1; /* Stay on top */
    height: 100%; /* Full-height: remove this if you want "auto" height */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: ${(props) => props.theme.navColor};
`;

const Logo = styled.div`
    border-radius: 100%;
    margin-top: 10%;
    align-items: stretch;
`;

const Items = styled.div`
    font-family: "Lexend", sans-serif;
    font-size: 20px;
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width : 80%;
    min-width : 195px;
    height: 60%;
    max-height: 500px;
`;

const Item = styled.div`
    flex-direction: column;
    padding: 15px;

    height: 50px;
    border-radius: 15px;

    span {
        position: relative;
        top: -5px;
    }
    font-weight:${(props) =>
        props.isActive ? 600 : 500 };

    color: ${(props) =>
        props.isActive ? props.theme.activeColor : props.theme.unActiveColor};

    &:hover {
        color: ${(props) => props.theme.activeColor};
        background-color: ${(props) => props.theme.hoverGray};
        transform: scaleX( 1.05 );
        /* font-size: 21px;
        animation: ${keyframes`
            0% { font-size:20px }
            100% { font-size:21px }
            `} 0.2s linear;
        
        img{
            width:46px;
            animation: ${keyframes`
            0% { width: 43px; }
            100% { width:46px }
            `} 0.2s linear;
        } */
    }

    img {
        width:43px;
        padding-right: 20px;
    }
`;

function Navbar() {
    const [activeMenu, setActiveMenu] = useState(window.location.pathname);

    const menus = [
        { name: "Dashboard", path: "/", imgSrc: Dashboard },
        { name: "Bank", path: "/Bank", imgSrc: Bank },
        { name: "Bond", path: "/Bond", imgSrc: Bond },
        { name: "Stake", path: "/Stake", imgSrc: Stake },
        { name: "Calculator", path: "/Calculator", imgSrc: Calculator },
        { name: "Fund", path: "/Fund", imgSrc: Fund },
    ];

    return (
        <Nav>
            <Logo>
                <img src={LogoImg} />
                <img src={LogoTxt} />
            </Logo>

            <Items>
                {menus.map((menu, index) => {
                    return (
                        <Link
                            to={menu.path}
                            key={index}
                            onClick={() => setActiveMenu(menu.path)}
                        >
                            <Item
                                isActive={
                                    window.location.pathname === menu.path
                                }
                                key={index}
                            >
                                <img src={menu.imgSrc} />
                                <span>{menu.name}</span>
                            </Item>
                        </Link>
                    );
                })}
            </Items>
        </Nav>
    );
}

export default Navbar;
