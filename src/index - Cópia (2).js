import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import QuickView from "./components/QuickView";
import request from "superagent";
import debounce from "lodash.debounce";
import "./scss/style.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.testVarible= "this is a test";
    
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

      error: false,
      hasMore: true,
      isLoading: false,
      scrollcount:1
    };

    // this.addScrollCount=this.addScrollCount.bind(this);

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadProdutos,
        state: { error, isLoading, hasMore }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadProdutos();
      }
    }, 100);


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
  }

  /* // Fetch inicial de produtos da API externa
  getProducts(pag) {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDBjZTZjZmE4MWFlNjllMGYwZmQ1OWQ3NDY2NjEzZjAxNGEyYWMzY2Y3M2Q4NTE5NzZkNDU1NDNkM2Q1MWNhOGJmNDM1YmNhMTYyYTgxZWYiLCJpYXQiOjE1ODIzODMwMjksIm5iZiI6MTU4MjM4MzAyOSwiZXhwIjoxNjE0MDA1NDI4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZwxmGjvZ0SqW0UDeqAnKb9gmh7QZrnC2DBczk0O4boFmLlzI-2uGAOS3iiBBvAKkXyk7zE-Ys0plTsPzR8KR4yGmZiVxzdmwBXJ8wMaS9ceb6rTXIEGl3awWrc9rxJcVXzWUVAAIYk3_Imi1OzNrusypbKvGoT4EuURYCBt_8P_Yt-WcHdNup3eQu3ydrpS1AJE0itXfimvGSFzJRhTCxYL9Eg5aKBbQGkbTaDxM1X2odyAREi8b63t-KXpAxNRMBumF1atQ71pf6z7tQYj25Lr3mVoKMDK-3K5CusS5W5kCiryC5shlITcMEU-lMXycwvqBNr64kegie9EIhKhHtIUyqG5T8JfUZhi5MmT-aptwQfSIoTE0Ie53V4dBQgpyDQuIcu-RsM9eYW0ornSCW9ixMxlSSQDJ2ImC-R4Q079b9g96DEv5A2Cg4-o8OuJW7emZbCosSYqU2HNxF2yv5gmU3tq4795gOLMnE0IK2NaypgOd4zvilNX9TMjCzOX7jcdJ25j1YI0GNyv6fgUwsPJQrnKaTC6BPN_tIHo61FY2busjSMQlMOBJQDQuGFcfbHnznsNF6KOQr9tdMYipqcLU_eqbO6smnaE9MkgNBpxjy4WZosUI1MPrfsllVFjxzbKdCAL2hrEfW58GYGha5wYuzG9x9uyGsP7lbZL9GiU'; //token from local.storage 
    const url= "http://middleware.allprint.pt/api/produtos/"+pag;

    console.log(url);
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
              products: response.data
             });
            
        })
        .catch(error => {
            console.log('error');
        })
    } */


    componentWillMount() {
      this.loadProdutos();
      console.log(this.testVarible);
      this.scrollcount+1;
    }
    

    loadProdutos = () => {
      this.setState({ isLoading: true }, () => {

        console.log(this.state.scrollcount);
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDBjZTZjZmE4MWFlNjllMGYwZmQ1OWQ3NDY2NjEzZjAxNGEyYWMzY2Y3M2Q4NTE5NzZkNDU1NDNkM2Q1MWNhOGJmNDM1YmNhMTYyYTgxZWYiLCJpYXQiOjE1ODIzODMwMjksIm5iZiI6MTU4MjM4MzAyOSwiZXhwIjoxNjE0MDA1NDI4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZwxmGjvZ0SqW0UDeqAnKb9gmh7QZrnC2DBczk0O4boFmLlzI-2uGAOS3iiBBvAKkXyk7zE-Ys0plTsPzR8KR4yGmZiVxzdmwBXJ8wMaS9ceb6rTXIEGl3awWrc9rxJcVXzWUVAAIYk3_Imi1OzNrusypbKvGoT4EuURYCBt_8P_Yt-WcHdNup3eQu3ydrpS1AJE0itXfimvGSFzJRhTCxYL9Eg5aKBbQGkbTaDxM1X2odyAREi8b63t-KXpAxNRMBumF1atQ71pf6z7tQYj25Lr3mVoKMDK-3K5CusS5W5kCiryC5shlITcMEU-lMXycwvqBNr64kegie9EIhKhHtIUyqG5T8JfUZhi5MmT-aptwQfSIoTE0Ie53V4dBQgpyDQuIcu-RsM9eYW0ornSCW9ixMxlSSQDJ2ImC-R4Q079b9g96DEv5A2Cg4-o8OuJW7emZbCosSYqU2HNxF2yv5gmU3tq4795gOLMnE0IK2NaypgOd4zvilNX9TMjCzOX7jcdJ25j1YI0GNyv6fgUwsPJQrnKaTC6BPN_tIHo61FY2busjSMQlMOBJQDQuGFcfbHnznsNF6KOQr9tdMYipqcLU_eqbO6smnaE9MkgNBpxjy4WZosUI1MPrfsllVFjxzbKdCAL2hrEfW58GYGha5wYuzG9x9uyGsP7lbZL9GiU'; //token from local.storage 
        const url= "http://middleware.allprint.pt/api/produtos/"+this.state.scrollcount;//+pag;
        console.log(url);
        //console.log(token);
    
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
                hasMore: this.state.products.length < 100,
                isLoading: false,
               // users: [...this.state.users, ...nextUsers]
              products: response.data,  
             });
        })
        .catch(error => {
          this.setState({
            error: err.message,
            isLoading: false
          });
            console.log('error');
        })      
      });
      console.log(this.state.products);
    };



    // Fetch inicial de produtos da API externa
/*     getProducts(pag) {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZTE3NTNiNjkyNGMyMDg4ODg5MDhiZjI5MmU2NjdhMTQ3MWE4NWNhMzYwMzlhNjE0ODdmZGZhOTdmOTljMWM0OTgxMTk5YzA5NjE1ZDdmNWEiLCJpYXQiOjE1ODIxMDQ5NjAsIm5iZiI6MTU4MjEwNDk2MCwiZXhwIjoxNjEzNzI3MzYwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.T1WsWjicjGm1KxokELvAY-Vtis6pMFeBmUv_M1Jc1-1PhBLUmZgoEA4-wNuQwqUvpP2DzmmDi7ozcBVBbS9JeqwgcOGBKJVISMhYerBxpMVXN_ZiBbbeVCjN2oPrJARyB0qO0QC2nYEq7migsdDgEV_nEcdja-prIEfuhAnlmmyLnlzJw_fk-rJCk1Jna8V97LWodFiha7jCqqbrfBKdEDFWfHgDoLIP7C_plehceYbkisWKkh5MwtaD2JH1LGjS9WiE_1om24thaz2EgrCKdvDi-Ezr3tasYLeJeCcTWeTUaAdO3clGVrcI9BZ9BKh3JzX8CpXjQcjZpRVWBLYOXZ-SEUeTGNaQ94nxcjqDJJDvij8siwtnVmyn35GBiiF6AlZyJy2EvnQRUw0JxdljCoeew_hzHnTx1GPMapD10LpOVKxG0nipxizKicoYwhSz0GvTv0Hj2yWG_YOHZ13qdFH81k-fJElNNcwDtdaCf8DeXehrK0yf9G6EoVpuIDXS3hKT3WzrfMo1aOfDizeWoVaXX4he7ExBKX128H_hBJogkX39vLUC9a-3Sq9zZ6TxKhoRSmzMIITPu9_d3nv7I-lYpH1rMymBoFJPsEiePORghL6RwP2z4uboQJAXIPGngl311XVLFqE3gUkEJxxAMZ4IAEr24ooyTyEBoiMTMAQ'; //token from local.storage 
      const url= "http://middleware.allprint.pt/api/produtos/"+pag;
  
  
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
                products: response.data
               });
              
          })
          .catch(error => {
              console.log('error');
          })
      }

       


  componentWillMount() {
    this.getProducts(1);
  }
*/

addScrollCount() {
  this.setState({scrollcount: this.state.scrollcount + 1})
  console.log(this.state.scrollcount);
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
    console.log(this.state.category);
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
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
        console.log(this.state.quantity);
        console.log(this.state.cart);
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
      totalAmount: total
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

    const { error, hasMore, isLoading, products } = this.state;

    return (
      <div className="container">
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

        
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>


        {products.map(prod => (
          <Fragment key={prod.productID}>
           
            <Products
              productsList={this.state.products}
              searchTerm={this.state.term}
              addToCart={this.handleAddToCart}
              productQuantity={this.state.quantity}
              updateQuantity={this.updateQuantity}
              openModal={this.openModal}
            />
          </Fragment>
        ))}


{/* 

        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        /> */}
         {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>You did it! You reached the end!</div>}
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
