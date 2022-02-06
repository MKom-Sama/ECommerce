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
    };
  }
  setCategory = (cat) => this.setState({ category: cat });
  setCurrency = (cur) => this.setState({ currency: cur });
  // cart functions
  addNewItem = ({ pid, name, prices, size }) => {
    console.log('oni chan')
    this.setState((state) => {
      // check for duplicates & removes it
      console.log('before Filter :',state.cart)
      let newCart = [...state.cart].filter(
        (item) => ((pid != item.pid) || (pid == item.pid && size != item.size))
      );

      // resets the quantity on duplicate entries
      let newItem = {
        pid,
        name,
        prices,
        quantity: 1,
        size,
      };
      console.log([...newCart, newItem])
      return { cart: [...newCart, newItem] };
    });
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
