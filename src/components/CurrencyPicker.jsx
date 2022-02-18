import React, { Component } from "react";

import styled from "styled-components";

import upIcon from "../assets/svg/arrows/up_arrow.svg";
import downIcon from "../assets/svg/arrows/down_arrow.svg";

import { getCurrencyIcon } from "../utils";

export default class CurrencyPicker extends Component {
  constructor(props) {
    super(props);
  }

  myRef = React.createRef();
  handleClickOutCurrOverlay = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.props.closeOverlay();
    }
  };

  componentDidUpdate() {
    if (this.props.visCurrOverlay) {
      document.addEventListener("click", this.handleClickOutCurrOverlay, true);
    } else {
      document.removeEventListener(
        "click",
        this.handleClickOutCurrOverlay,
        true
      );
    }
  }

  render() {
    return (
      <span ref={this.myRef}>
        <StyledIcon
          src={getCurrencyIcon(this.props.currency)}
          alt="currency"
          onClick={() => this.props.togCurrOverlay()}
          className="non-drag"
        />
        <ArrowIcon
          src={this.props.visCurrOverlay ? upIcon : downIcon}
          className="non-drag"
        />
        <DropDownContent
          visible={this.props.visCurrOverlay}
          className="fade-on-display"
        >
          <CurrencyList>
            {this.props.currencies.map((curr) => (
              <Styledli
                key={curr}
                onClick={() => {
                  this.props.setCurrency(curr);
                  this.props.closeOverlay();
                }}
              >
                <StyledIcon src={getCurrencyIcon(curr)} />
                {curr}
              </Styledli>
            ))}
          </CurrencyList>
        </DropDownContent>
      </span>
    );
  }
}
const StyledIcon = styled.img`
  cursor: pointer;
`;

const DropDownContent = styled.div`
  position: fixed;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 114px;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: #ffffff;
`;
const CurrencyList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;
`;
const Styledli = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 76%;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  align-self: center;
  font-size: 1.2em;
  margin: 8px;
  padding: 1% 1% 5% 5%;
  border-radius: 5px;
  &:hover {
    background-color: #e1e8ed;
  }
  transition: background-color 0.2s ease;
`;

const ArrowIcon = styled.img`
  margin-right: 1.375em;
  margin-bottom: 0.48em;
`;
