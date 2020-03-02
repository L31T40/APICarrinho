import React, { Component } from "react";
import Product from "./Product";

import { css } from "@emotion/core";
import { HashLoader} from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;`;

class LoadingProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

//   render() {
//     return (
//       <div className="sweet-loading">
//         <HashLoader
//           css={override}
//           size={150}
//           //size={"150px"} this also works
//           color={"#123abc"}
//           loading={this.state.loading}
//         />
//       </div>
//     );
//   }
// }
  
  render() {
    return (
      <div className="products loading">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    );
  }
}

export default LoadingProducts;
