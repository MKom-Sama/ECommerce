import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { getCurrencySymbol } from "../utils";
export default class CO_ItemList extends Component {

  render() {
    return (
      <StyledWrapper>
        <CartList>
          {this.props.cart.map((item, idx) => (
            <CartItem key={idx}>
              <Left>
                <Text className="bold">{item.name}</Text>
                <Text className="bold">
                  {getCurrencySymbol(this.props.currency)}
                  {parseFloat(
                    item.prices.filter(
                      (price) => price.currency.label === this.props.currency
                    )[0].amount
                  ).toFixed(2)}
                </Text>
                {/* For Type text Attributes */}
                {item.attributes.map(
                  (attrSet, idx) =>
                    attrSet.type === "text" && (
                      <span key={idx}>
                        <strong className="bold robo">{attrSet.name}:</strong>
                        <Sizes>
                          {attrSet.items.map((attrItem, idx) => (
                            <Size
                              key={idx}
                              btnSelects={attrItem.value}
                              onClick={() =>
                                this.props.modifyAttr(
                                  item.id,
                                  attrSet.name,
                                  attrItem.value
                                )
                              }
                              selectedAttr={item.selectedAttr[attrSet.name]}
                            >
                              {attrItem.value}
                            </Size>
                          ))}
                        </Sizes>
                      </span>
                    )
                )}
                {/* For Type swatch Attributes */}
                {item.attributes.map(
                  (attrSet, idx) =>
                    attrSet.type === "swatch" && (
                      <span key={idx}>
                        <strong className="robo bold">{attrSet.name}:</strong>
                        <Sizes>
                          {attrSet.items.map((attrItem, idx) => (
                            <SwatchBox
                              key={idx}
                              btnSelects={attrItem.displayValue}
                              swatchColor={attrItem.value}
                              onClick={() =>
                                this.props.modifyAttr(
                                  item.id,
                                  attrSet.name,
                                  attrItem.displayValue
                                )
                              }
                              selectedAttr={item.selectedAttr[attrSet.name]}
                            />
                          ))}
                        </Sizes>
                      </span>
                    )
                )}
              </Left>
              <BoxGroup>
                <Box
                  name="plus"
                  onClick={() => this.props.modifyItemCount(item.id, 1)}
                >
                  +
                </Box>
                <span>{item.quantity}</span>
                <Box
                  name="minus"
                  onClick={() => this.props.modifyItemCount(item.id, -1)}
                >
                  -
                </Box>
              </BoxGroup>
              <ProductImage src={item.gallery[0]} />
            </CartItem>
          ))}
        </CartList>
      </StyledWrapper>
    );
  }
}
/* ESLINT */
CO_ItemList.propTypes = {
  cart: PropTypes.array,
  currency: PropTypes.string,
  modifyItemCount: PropTypes.func,
  modifyAttr: PropTypes.func,
}

/* STYLES */
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  overflow: scroll;
  max-height: 400px;
  min-height: 400px;
`;
const CartList = styled.ul`
  list-style: none;
  padding: 0;
`;
const CartItem = styled.li`
  display: flex;
  flex-direction: row;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 5px;
`;
const Sizes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;
const Text = styled.span`
  font-style: normal;
  font-size: 16px;
  color: #1d1f22;
`;
const Left = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: space-between;
`;
const BoxGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;
const Box = styled.button`
  all: unset;
  width: 24px;
  height: 24px;
  border: 2px solid black;
  text-align: center;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  align-self: center;
  ${(props) =>
    props.name === props.selectedSize
      ? css`
          cursor: default;
          background: #d7dee3;
          color: #000000;
          border: 2px solid #d7dee3;
        `
      : css`
          cursor: pointer;
        `}
  &:hover {
    background-color: #d7dee3;
  }
`;
const Size = styled.div`
  all: unset;
  width: 24px;
  height: 24px;
  border: 2px solid black;
  text-align: center;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  background-color: ${(props) =>
    props.btnSelects === props.selectedAttr ? "#000000" : "#ffffff"};
  color: ${(props) =>
    props.btnSelects === props.selectedAttr ? "#ffffff" : "#000000"};
  &:hover {
    background-color: #30404d;
    color: #ffffff;
  }
`;
const ProductImage = styled.img`
  flex: 2;
  max-width: 105px;
  max-height: 137px;
`;
const SwatchBox = styled.div`
  all: unset;
  width: 24px;
  height: 24px;
  border: 2px solid black;
  text-align: center;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  background-color: ${(props) =>
    props.btnSelects === props.selectedAttr
      ? `${props.swatchColor}`
      : "#ffffff"};
  border-color: ${(props) => props.swatchColor};
`;
