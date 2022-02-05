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
  ],
};

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: "sm", // xsm | sm | md |lrg
      product: loadingProduct,
    };
  }
  componentDidMount() {
    getProductByID(window.location.pathname.split("/")[2]).then((result) =>
      this.setState({ product: result })
    );
  }
  selectSize = (sz) => this.setState({ selectedSize: sz });
  getImgInGallery = (idx) =>
    this.state.product.gallery[idx]
      ? this.state.product.gallery[idx]
      : this.state.product.gallery[0];
  render() {
    return (
      <StyledWrapper>
        <MiniGallery className="hide-grid-on-small">
          <MiniImage src={this.getImgInGallery(1)} />
          <MiniImage src={this.getImgInGallery(2)} />
          <MiniImage src={this.getImgInGallery(3)} />
        </MiniGallery>
        <StyledDiv className="responsive-flex">
          <MainImage style={{ flex: 1 }} src={this.state.product.gallery[0]} />
          <PDPController
            selectSize={this.selectSize}
            selectedSize={this.state.selectedSize}
            product={this.state.product}
            currency={this.props.currency}
          />
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
  height: 500px;
  margin: 1%;
`;

const MiniImage = styled.img`
  max-width: 90%;
  max-height: 70%;
  object-fit: cover;
`;
const MainImage = styled.img`
  min-width: 50%;
  min-height: 60%;
  margin: 5px;
  object-fit: cover;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
