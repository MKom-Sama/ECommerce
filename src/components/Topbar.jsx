import React, { Component } from "react";
import styled from "styled-components";

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
          <StyledButton
            onClick={() => this.props.setCategory("women")}
            btnSelects="women"
            selectedCat={this.props.category}
          >
            WOMEN
          </StyledButton>
          <StyledButton
            onClick={() => this.props.setCategory("men")}
            btnSelects="men"
            selectedCat={this.props.category}
          >
            MEN
          </StyledButton>
          <StyledButton
            onClick={() => this.props.setCategory("kids")}
            btnSelects="kids"
            selectedCat={this.props.category}
          >
            KIDS
          </StyledButton>
        </ButtonGroup>

        {/* LOGO */}
        <NonDraggableImg src={appLogo} alt="logo" />

        <ButtonGroup>
          <CurrencyPicker
            currency={this.props.currency}
            setCurrency={this.props.setCurrency}
          />
          <CartOverlay
            cart={this.props.cart}
            currency={this.props.currency}
            modifyItemCount={this.props.modifyItemCount}
            modifyItemSize={this.props.modifyItemSize}
            getItemCount={this.props.getItemCount}
            getCartTotalPrice={this.props.getCartTotalPrice}
          />
        </ButtonGroup>
      </StyledWrapper>
    );
  }
}

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
  z-index: 1;
`;
const StyledButton = styled.button`
  all: unset;
  font-family: Raleway;
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
const NonDraggableImg = styled.img`
  user-drag: none;
  -webkit-user-select: none; /* Safari, Chrome */
  -webkit-user-drag: none;
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
  user-select: none; /* CSS3 */
`;
const StyledIcon = styled(NonDraggableImg)``;

const ButtonGroup = styled.div`
  align-self: center;
`;
