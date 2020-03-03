import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import QuickView from "./components/QuickView";
import "./scss/style.scss";
import request from "superagent";
import debounce from "lodash.debounce";

//import "./components/sidebar.css";
import SideBar from "./components/SideBar";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
     
      message: "",
      pag:0,
      error: false,
      hasMore: true,
      isLoading: false,
    };
    

    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    var handleToUpdate	= this.handleToUpdate.bind(this);
    var arg1 = '';
        // Binds our scroll event handler
        window.onscroll = debounce(() => {
          const {
            loadProducts,
            state: { error, isLoading, hasMore }
          } = this;
    
          // Bails early if:
          // * there's an error
          // * it's already loading
          // * there's nothing left to load
/*           console.log('error -> '+error);
          console.log('isLoading -> '+isLoading);
          console.log('hasMore -> '+hasMore); */
          if (error || isLoading || !hasMore) return;
    
          // Checks that the page has scrolled to the bottom
          //if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
          
            //console.log('loadProducts()');
            loadProducts();
          
        }, 1000);

  }


  loadProducts = () => {
    this.setState({ isLoading: true }, () => {

      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZTE3NTNiNjkyNGMyMDg4ODg5MDhiZjI5MmU2NjdhMTQ3MWE4NWNhMzYwMzlhNjE0ODdmZGZhOTdmOTljMWM0OTgxMTk5YzA5NjE1ZDdmNWEiLCJpYXQiOjE1ODIxMDQ5NjAsIm5iZiI6MTU4MjEwNDk2MCwiZXhwIjoxNjEzNzI3MzYwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.T1WsWjicjGm1KxokELvAY-Vtis6pMFeBmUv_M1Jc1-1PhBLUmZgoEA4-wNuQwqUvpP2DzmmDi7ozcBVBbS9JeqwgcOGBKJVISMhYerBxpMVXN_ZiBbbeVCjN2oPrJARyB0qO0QC2nYEq7migsdDgEV_nEcdja-prIEfuhAnlmmyLnlzJw_fk-rJCk1Jna8V97LWodFiha7jCqqbrfBKdEDFWfHgDoLIP7C_plehceYbkisWKkh5MwtaD2JH1LGjS9WiE_1om24thaz2EgrCKdvDi-Ezr3tasYLeJeCcTWeTUaAdO3clGVrcI9BZ9BKh3JzX8CpXjQcjZpRVWBLYOXZ-SEUeTGNaQ94nxcjqDJJDvij8siwtnVmyn35GBiiF6AlZyJy2EvnQRUw0JxdljCoeew_hzHnTx1GPMapD10LpOVKxG0nipxizKicoYwhSz0GvTv0Hj2yWG_YOHZ13qdFH81k-fJElNNcwDtdaCf8DeXehrK0yf9G6EoVpuIDXS3hKT3WzrfMo1aOfDizeWoVaXX4he7ExBKX128H_hBJogkX39vLUC9a-3Sq9zZ6TxKhoRSmzMIITPu9_d3nv7I-lYpH1rMymBoFJPsEiePORghL6RwP2z4uboQJAXIPGngl311XVLFqE3gUkEJxxAMZ4IAEr24ooyTyEBoiMTMAQ'; //token from local.storage 
      const url= "http://middleware.allprint.pt/api/produtos/"+this.state.pag;
      console.log('URL ->'+url);
      axios({
        "url": url,
        "method": "POST",
        "headers": {
            'Authorization': 'Bearer '+ token ,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept':'application/json'
        }
    })
    .then(response => { 
          this.setState({
            hasMore: this.state.products.length < 1000,
            isLoading: false,
            products: [...this.state.products, ...response.data]
         });
         //console.log('nextProducts ->'+response.data);
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });

    this.setState({ pag: this.state.pag + 1 })
    console.log('Pagina ->'+this.state.pag);
  }
  
  handleToUpdate(someArg){
    //alert('We pass argument from Child to Parent: ' + someArg);
      this.setState({arg1:someArg});
      this.setState({message: someArg});
      console.log('handleToUpdate - this.state.message ->'+this.state.message);
      console.log('handleToUpdate - this.state.pag ->'+this.state.pag);
}


     
  componentWillMount() {
    
      this.loadProducts();

    
  }




  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log("this.state.category -> "+this.state.category);
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      // console.log("e a mensagem é > "+this.state.message);
      // console.log("e a mensagem é > ");
      // console.log("this.checkProduct(productID) -> "+this.checkProduct(productID));
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log('Quantidade -> '+this.state.quantity);
        console.log('Carrinho -> '+this.state.cart);
      }.bind(this),
      1000
    );

    
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total.toFixed(2)
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("Quantidade adicionada...");
    this.setState({
      quantity: qty
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  render() {
    const { error, hasMore, isLoading, users } = this.state;
    var	handleToUpdate	=	this.handleToUpdate;
    return (
      <div className="container">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <Header       
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
        />
        <Products
          handleToUpdate = {handleToUpdate.bind(this)}

          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />
        <Footer />
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));