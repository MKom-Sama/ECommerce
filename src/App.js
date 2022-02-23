import React,{ Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Topbar from "./components/Topbar";
import Cart from "./pages/Cart";
import styled from "styled-components";
import { getAllCategories, getAllCurrencies } from "./graphQL";
import { objectEquals, shortUID } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],

      category: "all", // all || tech || clothes ( selected cat)
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
  addNewItem = (product, quantity, inStock, selectedAttr = false) => {
    this.setState((state) => {
      if (inStock === false) {
        return console.log("Product Out Of Stock Sorry");
      }

      let defaultAttr = {};
      if (selectedAttr === false) {
        // default value
        product.attributes.forEach((attr) => {
          defaultAttr[attr.name] = attr.items[0].value;
        });
      } else {
        defaultAttr = selectedAttr;
      }

      let item = {
        id: shortUID(),
        name: product.name,
        prices: product.prices,
        quantity,
        gallery: product.gallery,
        selectedAttr: defaultAttr,
        attributes: product.attributes,
      };
      console.log("Added Item : ", item);
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
        if (
          elem.name === item.name &&
          objectEquals(elem.selectedAttr, item.selectedAttr)
        ) {
          //TODO Should Change this to attributes.values
          newQuantity = elem.quantity + item.quantity;
          isNew = false;
        }
        newCart.push({
          id: elem.id,
          name: elem.name,
          prices: elem.prices,
          quantity: newQuantity,
          gallery: elem.gallery,
          selectedAttr: elem.selectedAttr,
          attributes: elem.attributes,
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
            selectedAttr: item.selectedAttr,
            attributes:item.attributes
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
          (price) => price.currency.label === this.state.currency
        )[0].amount;
    });
    return parseFloat(sum).toFixed(2);
  };
  modifyAttr = (id, attrName, attrValue) =>
    this.setState((state) => {
      let newCart = [];
      // Find & Modify Item
      state.cart.forEach((item) => {
        let quantity = item.quantity; // passing by value
        if (item.id === id) {
          item.selectedAttr[attrName] = attrValue;
        }
        // Check if item with same name & selectedAttr already exists
        let idx = newCart.findIndex(
          (c_item) =>
            c_item.name === item.name &&
            objectEquals(c_item.selectedAttr, item.selectedAttr)
        );

        if (idx !== -1) {
          newCart[idx].quantity += quantity;
        } else {
          newCart.push({
            id: item.id,
            name: item.name,
            prices: item.prices,
            quantity: quantity,
            gallery: item.gallery,
            selectedAttr: item.selectedAttr,
            attributes: item.attributes,
          });
        }
      });
      return { cart: newCart };
    });
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
            getItemCount={this.getItemCount}
            getCartTotalPrice={this.getCartTotalPrice}
            modifyAttr={this.modifyAttr}
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
                  modifyAttr={this.modifyAttr}
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
