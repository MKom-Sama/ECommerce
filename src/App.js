import react, { Component } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Topbar from "./components/Topbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "women", // women || men || kids
      currency: "USD", // USD || GBP || JPY
      cart: [], // { pid , name , prices , quantity , size }

      // Overlay Control
      visCurrOverlay: false,
      visCartOverlay: false,
    };
  }
  setCategory = (cat) => this.setState({ category: cat });
  setCurrency = (cur) => this.setState({ currency: cur });

  // Overlay Controls
  togCurrOverlay = () => {
    this.setState((state) => {
      return { visCurrOverlay: !state.visCurrOverlay, visCartOverlay: false };
    });
  };
  togCartOverlay = () => {
    this.setState((state) => {
      return { visCartOverlay: !state.visCartOverlay, visCurrOverlay: false };
    });
  };

  // Cart Functions
  addNewItem = ({ pid, name, prices, size, gallery }) => {
    this.setState((state) => {
      // check for duplicates & removes it
      let newCart = [...state.cart].filter(
        (item) => pid != item.pid || (pid == item.pid && size != item.size)
      );

      // resets the quantity on duplicate entries
      let newItem = {
        pid,
        name,
        prices,
        quantity: 1,
        size,
        gallery,
      };

      return { cart: [...newCart, newItem] };
    });
  };
  modifyItemCount = (pid, val) => {
    this.setState((state) => {
      let newCart = [];
      state.cart.forEach((item) => {
        if (item.pid === pid) {
          item.quantity += 0.5 * val; // idk why 0.5 too but it works
        }

        if (item.quantity >= 1) {
          newCart.push(item);
        }
      });
      return { cart: newCart };
    });
  };
  modifyItemSize = (pid, newSize) => {
    this.setState((state) => {
      let newCart = [];
      state.cart.forEach((item) => {
        if (item.pid === pid) {
          item.size = newSize;
        }
        newCart.push(item);
      });

      return { cart: newCart };
    });
  };
  getItemCount = () => {
    let count = 0;
    this.state.cart.forEach((item) => (count += item.quantity));
    return count;
  };
  getCartTotalPrice = () => {
    let sum = 0;
    this.state.cart.forEach((item) => {
      sum +=
        item.quantity *
        item.prices.filter(
          (price) => price.currency.label == this.state.currency
        )[0].amount;
    });
    return sum;
  };
  componentDidUpdate() {
    console.log("cart : ", this.state.cart);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Topbar
            setCategory={this.setCategory}
            category={this.state.category}
            setCurrency={this.setCurrency}
            currency={this.state.currency}
            // Cart
            cart={this.state.cart}
            modifyItemCount={this.modifyItemCount}
            modifyItemSize={this.modifyItemSize}
            getItemCount={this.getItemCount}
            getCartTotalPrice={this.getCartTotalPrice}
            // Overlay Control
            visCurrOverlay={this.state.visCurrOverlay}
            visCartOverlay={this.state.visCartOverlay}
            togCurrOverlay={this.togCurrOverlay}
            togCartOverlay={this.togCartOverlay}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProductList
                  category={this.state.category}
                  currency={this.state.currency}
                  addNewItem={this.addNewItem}
                  showOverlay={this.state.visCartOverlay}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetails currency={this.state.currency} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
