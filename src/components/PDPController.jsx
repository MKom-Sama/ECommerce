import React, { Component } from "react";
import styled from "styled-components";

let dummyProduct = {
  name: "Apollo Running Short",
  img: "https://t.ly/aHT0",
  price: "25.55",
};

export default class PDPStyledWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledWrapper>
        <h1>{dummyProduct.name}</h1>

        <strong style={{ fontFamily: "Roboto Condensed" }}>SIZE:</strong>
        <Sizes>
          <Size
            btnSelects="xsm"
            onClick={() => this.props.selectSize("xsm")}
            selectedSize={this.props.selectedSize}
          >
            XS
          </Size>
          <Size
            btnSelects="sm"
            onClick={() => this.props.selectSize("sm")}
            selectedSize={this.props.selectedSize}
          >
            S
          </Size>
          <Size
            btnSelects="md"
            onClick={() => this.props.selectSize("md")}
            selectedSize={this.props.selectedSize}
          >
            M
          </Size>
          <Size
            btnSelects="lrg"
            onClick={() => this.props.selectSize("lrg")}
            selectedSize={this.props.selectedSize}
          >
            L
          </Size>
        </Sizes>
        <br />
        <strong style={{ fontFamily: "Roboto Condensed" }}>PRICE:</strong>
        <br />
        <strong style={{ fontSize: "2em" }}>${dummyProduct.price}</strong>
        <br />
        <br />
        <br />
        <AddToCartButton className="half-to-full-width">
          ADD TO CART
        </AddToCartButton>
        <ProductDescription className="half-to-full-width">
          Nulla deserunt est dolor cillum do. Sint sit aliquip proident aliquip.
          Non commodo tempor elit deserunt deserunt magna cupidatat esse. Id
          consequat fugiat nisi eu. Ex quis reprehenderit laboris culpa minim do
          ullamco. Officia pariatur ut tempor consequat eu quis non id.
        </ProductDescription>
      </StyledWrapper>
    );
  }
}
const StyledWrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-self: center;
  padding-left: 5%;
`;
const Sizes = styled.div`
  display: flex;
`;
const Size = styled.div`
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 1.8em;
  border: 3px solid black;
  border-radius:5px;
  background-color: ${(props) =>
    props.btnSelects === props.selectedSize ? "#000000" : "#ffffff"};
  color: ${(props) =>
    props.btnSelects === props.selectedSize ? "#ffffff" : "#000000"};
  &:hover {
    background-color: #30404d;
    color: #ffffff;
  }
`;
const AddToCartButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5ece7b;
  text-align: center;
  font-size: 16px;
  margin: 5px;
  padding: 16px 32px;
  color: #ffffff;
  &:hover {
    background-color: #66d477;
  }
`;

const ProductDescription = styled.p`
  padding: 1%;
`;
