import React, { Component } from "react";
import styled from "styled-components";

export default class CO_ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledWrapper>
        <CartList>
          {this.props.cart.map((item) => (
            <CartItem key={item.pid}>
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
                  ${item.prices[0].amount}
                </Text>
                <Sizes>
                  <Box>XS</Box>
                  <Box>S</Box>
                  <Box>M</Box>
                  <Box>L</Box>
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
                <Box style={{ alignSelf: "center" }}>+</Box>
                <span>{item.quantity}</span>
                <Box style={{ alignSelf: "center" }}>-</Box>
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
const CartItem = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 8px;
  margin-bottom: 5px;
  background: #f7f7f7;
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
  cursor:pointer;
  &:hover {
    background-color: #e1e8ed;
  }
`;
