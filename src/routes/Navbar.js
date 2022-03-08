
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import NavbarItem from "./NavbarItem";
import logo from "../assets/logo.png";

const Nav = styled.div`
  display: flex;
  border-right: 3px solid #888888;
  flex-direction: column;
  align-items: center;
  width: 20%;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  overflow-x: hidden; /* Disable horizontal scroll */
  z-index: 1; /* Stay on top */
  height: 100%; /* Full-height: remove this if you want "auto" height */
  top: 0; /* Stay at the top */
  left: 0;
`
const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  justify-content: top;
`

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`

function Navbar() {
  const menus = [
    { name: "Home", path: "/" },
    { name: "Stake", path: "/Stake" },
    { name: "Bond", path: "/Bond" },
    { name : "Bank", path: "/Bank"} 
  ];

  return (
      <Nav>
        <Logo src={logo}/>
        <Menu>
            {menus.map((menu, index) => {
                return (
                <NavLink
                    
                    style = {{color: "gray", textDecoration: "none"}}    
                    activestyle = {{color: "black"}}
                    to={menu.path}
                    key={index}
                >
                    <NavbarItem
                        menu={menu}
                    />
                </NavLink>
                )
            })}
        </Menu>
    </Nav>
  )
}

export default Navbar;