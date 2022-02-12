import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Topbar from "./components/Topbar";
import Cart from "./pages/Cart";
import styled from "styled-components";
import { getAllCategories, getAllCurrencies } from "./graphQL";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],

      category: "women", // all || tech || clothes ( selected cat)
      currency: "USD", // USD || GBP || JPY || AUD || RUB (selected curr)
      cart: [], // { pid , name , prices , quantity , size }

      // Overlay Control
      visCurrOverlay: false,
      visCartOverlay: false,
    };
  }

  componentDidMount() {
    // Fetching from GQL API
    getAllCategories().then((res) =>
      this.setState({ categories: res, category: res[0] })
    );
    getAllCurrencies().then((res) =>
      this.setState({ currencies: res, currency: res[0] })
    );
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
  closeOverlay = () => {
    this.setState({ visCartOverlay: false, visCurrOverlay: false });
  };

  // Cart Functions
  addNewItem = ({ pid, name, prices, size, gallery }) => {
    this.setState((state) => {
      // check for duplicates & removes it
      let newCart = [...state.cart].filter((item) => pid != item.pid);

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
            // From GQL
            categories={this.state.categories}
            currencies={this.state.currencies}
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
            closeOverlay={this.closeOverlay}
          />
          <OverlayBackdrop visible={this.state.visCartOverlay} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProductList
                  category={this.state.category}
                  currency={this.state.currency}
                  addNewItem={this.addNewItem}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  currency={this.state.currency}
                  addNewItem={this.addNewItem}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={this.state.cart}
                  currency={this.state.currency}
                  modifyItemCount={this.modifyItemCount}
                  modifyItemSize={this.modifyItemSize}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
const OverlayBackdrop = styled.div`
  background: #39374838;
  position: fixed;
  top: 10.69%;
  right: 0%;
  left: 0%;
  bottom: 0%;
  z-index: 1;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

export default App;
