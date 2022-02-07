import React, { Component } from "react";
import styled from "styled-components";

// Icons
import cartIcon from "../assets/svg/cart.svg";
import CO_ItemList from "./CO_ItemList";

import { getCurrencySymbol } from "../utils";

export default class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartOverlay: true,
    };
  }

  render() {
    return (
      <>
        <StyledIcon
          src={cartIcon}
          alt="cart-icon"
          onClick={() => {
            this.setState((state) => ({
              showCartOverlay: !state.showCartOverlay,
            }));
          }}
        />
        <DropDownContent
          visible={this.state.showCartOverlay}
          className="fade-on-display"
        >
          <Text>My Bag,</Text> {this.props.getItemCount()} items
          <br />
          <CO_ItemList
            cart={this.props.cart}
            currency={this.props.currency}
            modifyItemCount={this.props.modifyItemCount}
            modifyItemSize={this.props.modifyItemSize}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <strong style={{ fontFamily: "Roboto Condensed" }}>Total</strong>
            <strong style={{ fontWeight: "bold" }}>
              {getCurrencySymbol(this.props.currency)}
              {this.props.getCartTotalPrice()}
            </strong>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: "4%",
              bottom: "3.70%",
            }}
          >
            <ViewBag>VIEW BAG</ViewBag>
            <CheckoutButton>CHECKOUT</CheckoutButton>
          </div>
        </DropDownContent>
      </>
    );
  }
}
// Styles
const NonDraggableImg = styled.img`
  user-drag: none;
  -webkit-user-select: none; /* Safari, Chrome */
  -webkit-user-drag: none;
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
  user-select: none; /* CSS3 */
`;
const StyledIcon = styled(NonDraggableImg)`
  cursor: pointer;
`;

const DropDownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 6.04%;
  top: 9.125%;
  padding: 1%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 540px;
  min-height: 540px;
  max-width: 325px;
  min-width: 325px;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: #ffffff;
`;

const Text = styled.span`
  font-style: bold;
  font-size: 16px;
  color: #1d1f22;
  font-weight: 700px;
`;
const StyledButton = styled.button`
  all: unset;
  padding: 15px;
  flex: 1;
  max-width: 50%;
  min-width: 45%;
  text-align: center;
  margin: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;

const ViewBag = styled(StyledButton)`
  border: 1px solid #1d1f22;
  font-weight: 600px;
`;
const CheckoutButton = styled(StyledButton)`
  background: #5ece7b;
  color: #ffffff;
`;
