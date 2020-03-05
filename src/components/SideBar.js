import React from "react";
import {push as Menu} from "react-burger-menu";

export default props => {
    return (
      <Menu>
        <a className="menu-item" href="/">
          Home
        </a>
  
        <a className="menu-item" href="/burgers">
          Pesquisa
        </a>
  
        <a className="menu-item" href="/pizzas">
          Listagem
        </a>
  
        <a className="menu-item" href="/desserts">
          Outras Cenas
        </a>

        <a className="menu-item" href="/desserts">
          Logout
        </a>
      </Menu>
    );
  };