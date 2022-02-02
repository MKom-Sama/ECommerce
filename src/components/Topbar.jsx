import React, { Component } from "react";
import styled from "styled-components";

import appLogo from "../assets/svg/a-logo.svg";
import currencyIcon from "../assets/svg/$.svg";
import cartIcon from "../assets/svg/cart.svg";
import upIcon from "../assets/svg/up_arrow.svg";
import downIcon from "../assets/svg/down_arrow.svg";

export default class Topbar extends Component {
  render() {
    return (
      <StyledWrapper>
        <ButtonGroup>
          <StyledButton>WOMEN</StyledButton>
          <StyledButton>MEN</StyledButton>
          <StyledButton>KIDS</StyledButton>
        </ButtonGroup>
        <NonDraggableImg src={appLogo} alt="logo" />

        <ButtonGroup>
          <StyledIcon src={currencyIcon} alt="logo" />
          <NonDraggableImg src={downIcon} style={{ marginRight: "1.375em" }} />
          <StyledIcon src={cartIcon} alt="logo" />
        </ButtonGroup>
      </StyledWrapper>
    );
  }
}

/* STYLES */
const StyledWrapper = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  margin: 1% 7.013% 0% 8.125%;
  min-height: 80px;
  height: 5.57%;
  display: flex;
  flex-direction: "row";
  justify-content: space-between;
  align-content: center;
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
