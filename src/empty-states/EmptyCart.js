import React, { Component } from "react";

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src="https://beta.allprint.pt/wp-content/uploads/images/carrinho_vazio.svg"
        alt="empty-cart"
        width="250" 
      />
      <h2>O carrinho está vazio!</h2>
    </div>
  );
};

export default EmptyCart;
