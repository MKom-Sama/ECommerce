import React, { Component } from "react";
import styled from "styled-components";

import { getCurrencySymbol, sanitizeHTML } from "../utils";

export default class PDPStyledWrapper extends Component {

  componentDidMount() {
    console.log(this.props.product);
  }

  render() {
    return (
      <StyledWrapper>
        <h1>{this.props.product.name}</h1>

        {/* For Type text Attributes */}
        {this.props.product.attributes.map(
          (attrSet, idx) =>
            attrSet.type === "text" && (
              <span key={idx}>
                <strong className="robo bold">
                  {attrSet.name.toUpperCase()}:
                </strong>
                <Sizes>
                  {attrSet.items.map((item, idx) => (
                    <Size
                      key={idx}
                      btnSelects={item.value}
                      onClick={() =>
                        this.props.selectAttr(attrSet.name, item.value)
                      }
                      selectedAttr={this.props.selectedAttr[attrSet.name]}
                    >
                      {item.value}
                    </Size>
                  ))}
                </Sizes>
              </span>
            )
        )}
        {/* For Type swatch Attributes */}
        {this.props.product.attributes.map(
          (attrSet, idx) =>
            attrSet.type === "swatch" && (
              <span key={idx}>
                <strong className="robo bold">
                  {attrSet.name.toUpperCase()}:
                </strong>
                <Sizes>
                  {attrSet.items.map((item, idx) => (
                    <SwatchBox
                      key={idx}
                      btnSelects={item.displayValue}
                      swatchColor={item.value}
                      onClick={() =>
                        this.props.selectAttr(attrSet.name, item.displayValue)
                      }
                      selectedAttr={this.props.selectedAttr[attrSet.name]}
                    >
                    </SwatchBox>
                  ))}
                </Sizes>
              </span>
            )
        )}
        <br />
        <strong className="bold robo">PRICE:</strong>
        <br />
        <ProductPrice className="bold">
          {getCurrencySymbol(this.props.currency)}
          {
            this.props.product.prices.filter(
              (price) => price.currency.label === this.props.currency
            )[0].amount
          }
        </ProductPrice>
        <br />
        <br />
        <br />
        <AddToCartButton
          className="half-to-full-width bold"
          onClick={() =>
            this.props.addNewItem(
              this.props.product,
              1,
              this.props.product.inStock,
              this.props.selectedAttr
            )
          }
        >
          ADD TO CART
        </AddToCartButton>
        <ProductDescription
          dangerouslySetInnerHTML={sanitizeHTML(this.props.product.description)}
          className="half-to-full-width"
        />
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
  font-family: "Raleaway";
  font-weight: 100;
  font-size: 1.4em;
  border: 3px solid black;
  border-radius: 5px;
  background-color: ${(props) =>
    props.btnSelects === props.selectedAttr ? "#000000" : "#ffffff"};
  color: ${(props) =>
    props.btnSelects === props.selectedAttr ? "#ffffff" : "#000000"};
  &:hover {
    background-color: #30404d;
    color: #ffffff;
  }
`;
const SwatchBox = styled.div`
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-family: "Raleaway";
  font-weight: 100;
  font-size: 1.4em;
  border: 3px solid;
  border-radius: 5px;
  background-color: ${(props) =>
    props.btnSelects === props.selectedAttr
      ? `${props.swatchColor}`
    : "#ffffff"};
  border-color:${props=>props.swatchColor}
`;
const ProductPrice = styled.strong`
  font-size: 2em;
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
  display: -webkit-box;
  white-space: nowrap;
  overflow: scroll;
  padding: 1%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
