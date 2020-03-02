import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      message: "Algures no meio 1"
  };
  this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
        this.setState({
            message: 'Cheguei ao fundo',           
        });
        console.log('FUNDO -> '+this.state.message)
    } else {
        this.setState({
            message: 'Algures no meio'
        });
        console.log('ALGURES -> '+this.state.message)
    }
}

componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
}

componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
}


render() {
  
  let productsData;
  let term = this.props.searchTerm;
  let x;

  function searchingFor(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }
  productsData = this.props.productsList
    .filter(searchingFor(term))
    .map(product => {
      return (
        <Product
          key={product.id}
          price={product.price}
          name={product.name}
          image={product.image}
          id={product.id}
          addToCart={this.props.addToCart}
          productQuantity={this.props.productQuantity}
          updateQuantity={this.props.updateQuantity}
          openModal={this.props.openModal}/>
      );
    });

  // Estado de vazio e de carregamento
  let view;
  if (productsData.length <= 0 && !term) {
    view = <LoadingProducts/>;
  } else if (productsData.length <= 0 && term) {
    view = <NoResults />;
  } else {
    view = (
      <CSSTransitionGroup
        transitionName="fadeIn"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component="div"
        className="products">
        {productsData}
      </CSSTransitionGroup>
      
    );
  }
  
    return ( <div className="products-wrapper" > {view} <LoadingProducts/> </div>);
    //<div className="products-wrapper" onScroll={() => handleToUpdate(this.state.message)}>{view}</div> );
    //<div className="products-wrapper" onScroll={this.sendMensagem}>{view}</div>);
  }
}

export default Products;
