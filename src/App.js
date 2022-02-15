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
      cart: [], // { id , name , prices , quantity , size , gallery }

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
  addNewItem = (product, size, quantity, inStock) => {
    this.setState((state) => {
      if (inStock === false) {
        return console.log("Product Out Of Stock Sorry");
      }

      let item = {
        id: `${product.id}+_${size}`,
        name: product.name,
        prices: product.prices,
        quantity,
        size,
        gallery: product.gallery,
      };
      // Cart Empty
      if (state.cart.length === 0) {
        return { cart: [item] };
      }
      // Item Same ID in Cart
      // Item Same ID not in Cart
      let newCart = [];
      let isNew = true;
      state.cart.forEach((elem) => {
        let newQuantity = elem.quantity;
        if (elem.id === item.id) {
          newQuantity = elem.quantity + item.quantity;
          isNew = false;
        }
        newCart.push({
          id: elem.id,
          name: elem.name,
          prices: elem.prices,
          quantity: newQuantity,
          size: elem.size,
          gallery: elem.gallery,
        });
      });

      if (isNew) {
        return { cart: [...newCart, item] };
      }
      return { cart: [...newCart] };
    });
  };
  modifyItemCount = (id, val) => {
    this.setState((state) => {
      let newCart = [];
      state.cart.forEach((item) => {
        let newQuantity = item.quantity;
        if (item.id === id) {
          newQuantity += val;
        }
        if (newQuantity >= 1) {
          newCart.push({
            id: item.id,
            name: item.name,
            prices: item.prices,
            quantity: newQuantity,
            size: item.size,
            gallery: item.gallery,
          });
        }
      });
      return { cart: newCart };
    });
  };
  modifyItemSize = (id, newSize) => {
    this.setState((state) => {
      let newCart = [];
      // Find and Modify Item
      state.cart.forEach((item) => {
        let tempQuantity = item.quantity;
        if (item.id === id) {
          item.size = newSize;
          item.id = item.id.split("+_")[0] + "+_" + newSize;
        }
        // Check if item with same id already exists
        let idx = newCart.findIndex((c_item) => c_item.id == item.id);
        console.log(idx);
        if (idx !== -1) {
          newCart[idx].quantity += tempQuantity;
        } else {
          newCart.push({
            id: item.id,
            name: item.name,
            prices: item.prices,
            quantity: tempQuantity,
            size: item.size,
            gallery: item.gallery,
          });
        }
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
    return parseFloat(sum).toFixed(2);
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
