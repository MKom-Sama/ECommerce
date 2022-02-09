import React, { Component } from "react";

import styled, { css } from "styled-components";

import { getCurrencySymbol } from "../utils";

export default class Cart_ItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledWrapper>
        <CartList>
          {this.props.cart.map((item) => (
            <CartItem key={item.pid}>
              <Left>
                <Text>{item.name}</Text>
                <h2 style={{ fontWeight: 900 }}>
                  {getCurrencySymbol(this.props.currency)}
                  {
                    item.prices.filter(
                      (price) => price.currency.label === this.props.currency
                    )[0].amount
                  }
                </h2>
                <Sizes>
                  <Box
                    name="xsm"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.pid, "xsm")}
                  >
                    XS
                  </Box>
                  <Box
                    name="sm"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.pid, "sm")}
                  >
                    S
                  </Box>
                  <Box
                    name="md"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.pid, "md")}
                  >
                    M
                  </Box>
                  <Box
                    name="lrg"
                    selectedSize={item.size}
                    onClick={() => this.props.modifyItemSize(item.pid, "lrg")}
                  >
                    L
                  </Box>
                </Sizes>
              </Left>
              <Right>
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
                    onClick={() => this.props.modifyItemCount(item.pid, 1)}
                  >
                    +
                  </Box>
                  <span>{item.quantity}</span>
                  <Box
                    name="minus"
                    style={{ alignSelf: "center" }}
                    onClick={() => this.props.modifyItemCount(item.pid, -1)}
                  >
                    -
                  </Box>
                </div>
                <img
                  style={{
                    flex: 4,
                    maxWidth: "141px",
                    maxHeight: "185px",
                    minWidth: "141px",
                    minHeight: "185px",
                    // resize: "cover",
                  }}
                  className="non-drag"
                  src={item.gallery[0]}
                />
              </Right>
            </CartItem>
          ))}
        </CartList>
      </StyledWrapper>
    );
  }
}
const StyledWrapper = styled.div`
  height: 100%;
  padding-right: 16.8%;
`;
const CartList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  padding: 12px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
`;
const Sizes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
`;
const Box = styled.button`
  all: unset;
  width: 63px;
  height: 45px;
  border: 1px solid black;
  margin: 5px;
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
const Text = styled.span`
  font-style: normal;
  font-size: 26px;
  color: #1d1f22;
`;
