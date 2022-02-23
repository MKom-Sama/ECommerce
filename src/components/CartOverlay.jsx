import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// Icons
import cartIcon from "../assets/svg/cart.svg";
import CO_ItemList from "./CO_ItemList";

import { getCurrencySymbol } from "../utils";
import { Link } from "react-router-dom";

export default class CartOverlay extends Component {
  constructor(props) {
    super(props);
  }

  myRef = React.createRef();
  handleClickOutCartOverlay = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.props.closeOverlay();
    }
  };

  componentDidUpdate() {
    if (this.props.visCartOverlay) {
      document.addEventListener("click", this.handleClickOutCartOverlay, true);
    } else {
      document.removeEventListener(
        "click",
        this.handleClickOutCartOverlay,
        true
      );
    }
  }
  render() {
    return (
      <span ref={this.myRef}>
        <StyledIcon
          src={cartIcon}
          className="non-drag"
          alt="cart-icon"
          onClick={() => this.props.togCartOverlay()}
        />
        <DropDownContent
          visible={this.props.visCartOverlay}
          className="fade-on-display"
          ref={this.myRef}
        >
          <Text>My Bag,</Text> {this.props.getItemCount()} items
          <br />
          <CO_ItemList
            cart={this.props.cart}
            currency={this.props.currency}
            modifyItemCount={this.props.modifyItemCount}
            modifyAttr={this.props.modifyAttr}
          />
          <TotalPrice>
            <strong className="robo">Total</strong>
            <strong className="bold">
              {getCurrencySymbol(this.props.currency)}
              {this.props.getCartTotalPrice()}
            </strong>
          </TotalPrice>
          <ButtonGroup>
            <ViewBag>
              <Link
                to="/cart"
                className="non-decor"
                onClick={() => this.props.closeOverlay()}
              >
                VIEW BAG
              </Link>
            </ViewBag>
            <CheckoutButton>CHECKOUT</CheckoutButton>
          </ButtonGroup>
        </DropDownContent>
      </span>
    );
  }
}
/* ESLINT */
CartOverlay.propTypes = {
  // Currency
  currency: PropTypes.string,
  // Cart
  cart: PropTypes.array,
  modifyItemCount: PropTypes.func,
  getItemCount: PropTypes.func,
  getCartTotalPrice: PropTypes.func,
  modifyAttr: PropTypes.func,
  // Overlay Control
  visCartOverlay: PropTypes.bool,
  togCartOverlay: PropTypes.func,
  closeOverlay: PropTypes.func,
};

/* STYLES */
const StyledIcon = styled.img`
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
  z-index: 2;
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
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10;
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

const ButtonGroup = styled.div`
  display: flex;
  position: absolute;
  left: 4%;
  bottom: 3.7%;
`;
const ViewBag = styled(StyledButton)`
  border: 1px solid #1d1f22;
  font-weight: 600px;
`;
const CheckoutButton = styled(StyledButton)`
  background: #5ece7b;
  color: #ffffff;
`;
