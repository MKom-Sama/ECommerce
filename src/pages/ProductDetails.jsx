import React, { Component } from "react";

import styled from "styled-components";

// Components
import PDPController from "../components/PDPController";

// Utils
import { getProductByID } from "../graphQL";

// initial state
let loadingProduct = {
  name: "loading...",
  gallery: ["https://t.ly/aHT0"],
  prices: [
    { amount: 0.0, currency: { label: "USD" } },
    { amount: 0.0, currency: { label: "GBP" } },
    { amount: 0.0, currency: { label: "JPY" } },
    { amount: 0.0, currency: { label: "RUB" } },
    { amount: 0.0, currency: { label: "AUD" } },
  ],
  attributes: [],
};

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: loadingProduct,
      selectedAttr: {},

      // For Gallery
      mainImg: "",

      // Loading
      loading: true,
    };
  }
  componentDidMount() {
    getProductByID(window.location.pathname.split("/")[2]).then((result) => {
      let defaultAttr = {};
      result.attributes.forEach((attr) => {
        defaultAttr[attr.name] = attr.items[0].value;
      });
      this.setState({
        product: result,
        selectedAttr: defaultAttr,
        mainImg: result.gallery[0],
        loading: false,
      });
    });
  }

  selectAttr = (attrName, attrValue) =>
    this.setState((state) => {
      let newAttr = { ...state.selectedAttr };
      newAttr[attrName] = attrValue;
      return { selectedAttr: newAttr };
    });

  switchImg = (idx) => {
    this.setState((state) => {
      let newGallery = [...state.product.gallery];
      newGallery[idx] = state.mainImg;
      let updatedProd = { ...state.product };
      updatedProd.gallery = newGallery;

      return { mainImg: state.product.gallery[idx], product: updatedProd };
    });
  };
  render() {
    return (
      <StyledWrapper>
        <MiniGallery className="hide-grid-on-small">
          {this.state.product.gallery.map(
            (src, idx) =>
              idx >= 1 && (
                <MiniImage
                  key={idx}
                  src={src}
                  onClick={() => this.switchImg(idx)}
                />
              )
          )}
        </MiniGallery>
        <StyledDiv className="responsive-flex">
          <OutOfStock inStock={this.state.product.inStock}>
            Out Of Stock
          </OutOfStock>
          <MainImage src={this.state.mainImg} />
          {!this.state.loading && (
            <PDPController
              selectAttr={this.selectAttr}
              selectedAttr={this.state.selectedAttr}
              product={this.state.product}
              currency={this.props.currency}
              addNewItem={this.props.addNewItem}
            />
          )}
        </StyledDiv>
      </StyledWrapper>
    );
  }
}

// Styles
const StyledWrapper = styled.div`
  padding: 2% 7.013% 0% 8.125%;
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
`;

const MiniGallery = styled.div`
  ${"" /* display: grid;  is grid thro class */}
  grid-gap: 10px;
  grid-template-columns: 1fr;
  max-width: 10%;
  ${"" /* max-height:26%; */}
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 560px;
  margin: 1%;
`;

const MiniImage = styled.img`
  max-width: 150px;
  max-height: 90px;
  object-fit: contain;
`;
const MainImage = styled.img`
flex:1;
  min-width: 50%;
  min-height: 102%;
  margin: 5px;
  object-fit: contain;
`;
const OutOfStock = styled.div`
  position: absolute;
  align-self: center;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  top: 40%;
  left: 32%;
  color: #8d8f9a;
  display: ${(props) => (!props.inStock ? "default" : "none")};
`;
