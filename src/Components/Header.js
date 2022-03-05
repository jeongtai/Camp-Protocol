import styled from "styled-components"
import Logo from "./logo.svg"

const Nav = styled.nav`
    display: flex;
    justify-content:space-between;
    align-items: center;
`;


function Header(){
    return (
        <Nav>
            <h1>Hello</h1>
        </Nav>
    )
}

export default Header