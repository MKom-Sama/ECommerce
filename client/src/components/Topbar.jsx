import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import appLogo from "../assets/svg/a-logo.svg";

// Components
import CurrencyPicker from "./CurrencyPicker";
import CartOverlay from "./CartOverlay";

export default class Topbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledWrapper>
        <ButtonGroup>
          {this.props.categories.map((category) => (
            <Link key={category} to="/" className="non-decor">
              <StyledButton
                onClick={() => this.props.setCategory(category)}
                btnSelects={category}
                selectedCat={this.props.category}
              >
                {category.toUpperCase()}
              </StyledButton>
            </Link>
          ))}
        </ButtonGroup>

        {/* LOGO */}
        <img className="non-drag" src={appLogo} alt="logo" />

        <ButtonGroup>
          <CurrencyPicker
            currency={this.props.currency}
            setCurrency={this.props.setCurrency}
            currencies={this.props.currencies}
            // Control
            visCurrOverlay={this.props.visCurrOverlay}
            togCurrOverlay={this.props.togCurrOverlay}
            closeOverlay={this.props.closeOverlay}
          />
          <CartOverlay
            cart={this.props.cart}
            currency={this.props.currency}
            modifyItemCount={this.props.modifyItemCount}
            getItemCount={this.props.getItemCount}
            getCartTotalPrice={this.props.getCartTotalPrice}
            modifyAttr={this.props.modifyAttr}
            // Control
            visCartOverlay={this.props.visCartOverlay}
            togCartOverlay={this.props.togCartOverlay}
            closeOverlay={this.props.closeOverlay}
          />
          <Badge
            numItems={this.props.getItemCount()}
            className="fade-on-display"
          >
            {this.props.getItemCount()}
          </Badge>
        </ButtonGroup>
      </StyledWrapper>
    );
  }
}
/* ESLINT */
Topbar.propTypes = {
  // Currency
  currency: PropTypes.string,
  currencies: PropTypes.array,
  setCurrency: PropTypes.func,
  // Category
  category: PropTypes.string,
  categories: PropTypes.array,
  setCategory: PropTypes.func,
  // Cart
  cart: PropTypes.array,
  modifyItemCount: PropTypes.func,
  getItemCount: PropTypes.func,
  getCartTotalPrice: PropTypes.func,
  modifyAttr: PropTypes.func,
  // Overlay Control
  visCurrOverlay: PropTypes.bool,
  visCartOverlay: PropTypes.bool,
  togCurrOverlay: PropTypes.func,
  togCartOverlay: PropTypes.func,
  closeOverlay: PropTypes.func,
};
/* STYLES */
const StyledWrapper = styled.div`
  position: sticky;
  left: 0%;
  right: 0%;
  top: 0%;
  padding: 1% 7.013% 0% 8.125%;
  min-height: 80px;
  height: 5.57%;
  display: flex;
  flex-direction: "row";
  justify-content: space-between;
  align-content: center;
  background-color: #ffffff;
  z-index: 2;
`;
const StyledButton = styled.button`
  all: unset;
  ${"" /* font-family: Raleway; */}
  font-weight: 600;
  font-size: 18px;
  color: #5ece7b;
  margin-right: 10px;
  padding-bottom: 16%;
  margin-bottom: -30%;
  transition: opacity 0.5s ease, border 0.5s ease;
  border-bottom: 3px solid transparent;
  &:hover {
    border-color: #5ece7b;
  }
  border-color: ${(props) =>
    props.btnSelects === props.selectedCat ? "#5ece7b" : "transparent"};
`;
const Badge = styled.div`
  position: absolute;
  right: 6.3%;
  top: 35%;
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 100%;
  text-align: center;
  font-family: "Roboto Condensed";
  font-size: 14px;
  background: #000000;
  color: #ffffff;
  display: ${(props) => (props.numItems > 0 ? "default" : "none")};
`;
const ButtonGroup = styled.div`
  align-self: center;
`;
