import React from "react";

function NavbarItem({ menu }) {
  return (
    <div className="sidebar-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default NavbarItem;