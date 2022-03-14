import React from "react";
import styled from "styled-components";

const Item = styled.div`
  color : white;
`

function NavbarItem({ menu }) {
  return (
    <Item>
      <p>{menu.name}</p>
    </Item>
  );
}

export default NavbarItem;