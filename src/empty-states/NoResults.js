import React, { Component } from "react";

const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
          alt="Empty Tree"
        />
        <h2>Pedimos desculpa :) ... mas a sua pesquisa não tem resultados!</h2>
        <p>tente outra palavra.</p>
      </div>
    </div>
  );
};

export default NoResults;
