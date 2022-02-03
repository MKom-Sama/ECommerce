import react, { Component } from "react";

import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import Topbar from "./components/Topbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "women", // women || men || kids
      currency: "USD", // USD || EUR || JPY
    };
  }
  setCategory = (cat) => this.setState({ category: cat });
  setCurrency = (cur) => this.setState({ currency: cur });
  render() {
    return (
      <div>
        <Topbar
          setCategory={this.setCategory}
          category={this.state.category}
          setCurrency={this.setCurrency}
          currency={this.state.currency}
        />
        {/* <ProductList category={this.state.category} /> */}
        <ProductPage />
      </div>
    );
  }
}

export default App;
