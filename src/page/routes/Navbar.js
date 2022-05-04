import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import LogoText from "./../../assets/KProtocol-TextLogo.svg";
import Dashboard from "./../../assets/NavbarIcon/Dashboard.svg";
import Bank from "./../../assets/NavbarIcon/Bank.svg";
import Convert from "./../../assets/NavbarIcon/Convert.svg";
import Bond from "./../../assets/NavbarIcon/Bond.svg";
import Stake from "./../../assets/NavbarIcon/Stake.svg";
import Calculator from "./../../assets/NavbarIcon/Calculator.svg";
import Fund from "./../../assets/NavbarIcon/Fund.svg";

const Nav = styled.div`
    width: ${(props) => props.theme.navWidth}px;
    height: 100%; /* Full-height: remove this if you want "auto" height */

    display: flex;    
    flex-direction: column;

    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    overflow-x: hidden; /* Disable horizontal scroll */
    z-index: 2; /* Stay on top */
    
    top: 0; /* Stay at the top */
    left: 0;

    background-color: ${(props) => props.theme.navColor};
    border-right: 1px solid ${props => props.theme.borderColor};
`;

const Logo = styled.div`
    margin-top: 20%;
    width:100%;
    text-align: center;
    .LogoText {
        width : 170px;
        margin : 0px 10px;
    }
`;

const Items = styled.div`
    font-size: 20px;
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;
    min-width: 195px;
    height: 60%;
    max-height: 500px;

    & .soonTitle{
        flex-direction: column;
    padding: 18px 10% 10px 20%;
        position: relative;
        top: -4px;
    }
`;

const Item = styled.div`
    flex-direction: column;
    padding: 18px 10% 10px 20%;
    
    height: 60px;

    span {
        position: relative;
        top: -4px;
    }
    font-weight: ${(props) => (props.isActive ? 600 : 500)};

    color: ${(props) =>
        props.isActive ? props.theme.activeColor : props.theme.unActiveColor};

    background-color: ${(props) =>
        props.isActive ? props.theme.selectedColor : null};

    &:hover {
        color: ${(props) => props.theme.hoverTextColor};
        background-color: ${(props) => props.isActive ? props.theme.selectedColor : props.theme.hoverColor};
        transform: scale(1.05);

        animation: ${keyframes`
            0% { transform:scale(1.0) }
            100% { transform:scale(1.05) }
            `} 0.2s linear;
    }

    img {
        width: 43px;
        padding-right: 20px;
    }
`;

function Navbar() {
    const [activeMenu, setActiveMenu] = useState(window.location.pathname);

    const menus = [
        { name: "Dashboard", path: "/", logo: Dashboard },
        { name: "Convert", path: "/Convert", logo: Convert },
        { name: "Bond", path: "/Bond", logo: Bond },
        { name: "Stake & Lock", path: "/Stake&Lock", logo: Stake },
    ];

    const soonMenus = [
        { name: "Bank", path: "/Bank", logo: Bank },
        { name: "Calculator", path: "/Calculator", logo: Calculator },
        { name: "Fund", path: "/Fund", logo: Fund },
    ];

    return (
        <Nav>
            <Logo>
                <img className="LogoText" src={LogoText} />
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
                                <img src={menu.logo} />
                                <span>{menu.name}</span>
                            </Item>
                        </Link>
                    );
                })}
            </Items>
            <Items>
                <p className="soonTitle">Soon </p>
                {soonMenus.map((menu, index) => {
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
                                <img src={menu.logo} />
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
