import React, { Component } from "react";

const Footer = props => {
  return (
    <footer>
      <p className="footer-links">
        <a
          href="http://beta.allprint.pt"
          target="_blank"
        >
          
        </a>
        <a href="mailto:geral@allprint.pt" target="_blank">
          Precisa de Ajuda?
        </a>
        <span> / </span>
        <a href="https://facebook.com/all2print" target="_blank">
          Facebook
        </a>
        <span> / </span>
        <a href="http://beta.allprint.pt" target="_blank">
          Allprint
        </a>
      </p>
      <p>
        &copy; 2019 <strong>Allprint</strong> - Recordações Turísticas
      </p>
    </footer>
  );
};

export default Footer;
