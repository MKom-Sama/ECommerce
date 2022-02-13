import React, { Component } from "react";
import styled, { css } from "styled-components";

import { getCurrencySymbol } from "../utils";
export default class CO_ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledWrapper>
        <CartList>
          {this.props.cart.map((item) => (
            <CartItem key={item.id}>
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
                  {
                    item.prices.filter(
                      (price) => price.currency.label == this.props.currency
                    )[0].amount
                  }
                </Text>
                <Sizes>
                  <Box
                    name="xsm"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.id, "xsm")}
                  >
                    XS
                  </Box>
                  <Box
                    name="sm"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.id, "sm")}
                  >
                    S
                  </Box>
                  <Box
                    name="md"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.id, "md")}
                  >
                    M
                  </Box>
                  <Box
                    name="lrg"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.id, "lrg")}
                  >
                    L
                  </Box>
                </Sizes>
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
  background: #fafafa;
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
