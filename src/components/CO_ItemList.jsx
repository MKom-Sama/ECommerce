import React, { Component } from "react";
import styled, { css } from "styled-components";

import { getCurrencySymbol } from "../utils";
export default class uCO_ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledWrapper>
        <CartList>
          {this.props.cart.map((item, idx) => (
            <CartItem key={idx}>
              <div
                style={{
                  display: "flex",
                  flex: 3,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: 500 }}>{item.name}</Text>
                <Text style={{ fontWeight: 900 }}>
                  {getCurrencySymbol(this.props.currency)}
                  {parseFloat(
                    item.prices.filter(
                      (price) => price.currency.label == this.props.currency
                    )[0].amount
                  ).toFixed(2)}
                </Text>
                {item.attributes.map(
                  (attrSet, idx) =>
                    attrSet.type === "text" && (
                      <span key={idx}>
                        <strong style={{ fontFamily: "Roboto Condensed" }}>
                          {attrSet.name}:
                        </strong>
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
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Box
                  name="plus"
                  style={{ alignSelf: "center" }}
                  onClick={() => this.props.modifyItemCount(item.id, 1)}
                >
                  +
                </Box>
                <span>{item.quantity}</span>
                <Box
                  name="minus"
                  style={{ alignSelf: "center" }}
                  onClick={() => this.props.modifyItemCount(item.id, -1)}
                >
                  -
                </Box>
              </div>
              <img
                style={{ flex: 2, maxWidth: "105px", maxHeight: "137px" }}
                src={item.gallery[0]}
              />
            </CartItem>
          ))}
        </CartList>
      </StyledWrapper>
    );
  }
}

// Styles
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
