import React, { Component } from "react";

import styled from "styled-components";

// Currencies
import USDIcon from "../assets/svg/USD.svg";
import EURIcon from "../assets/svg/EUR.svg";
import JPYIcon from "../assets/svg/JPY.svg";

import upIcon from "../assets/svg/up_arrow.svg";
import downIcon from "../assets/svg/down_arrow.svg";

export default class CurrencyPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrPicker: false,
    };
  }
  getSelectedCurrIcon = () => {
    switch (this.props.currency) {
      case "USD":
        return USDIcon;
      case "EUR":
        return EURIcon;
      case "JPY":
        return JPYIcon;
      default:
        break;
    }
  };
  render() {
    return (
      <>
        <StyledIcon
          src={this.getSelectedCurrIcon()}
          alt="currency"
          onClick={() => {
            this.setState((state) => ({
              showCurrPicker: !state.showCurrPicker,
            }));
          }}
        />
        <NonDraggableImg
          src={this.state.showCurrPicker ? upIcon : downIcon}
          style={{ marginRight: "1.375em" }}
        />
        <DropDownContent
          visible={this.state.showCurrPicker}
          className="fade-on-display"
        >
          <CurrencyList>
            <Styledli onClick={() => this.props.setCurrency("USD")}>
              <StyledIcon src={USDIcon} />
              USD
            </Styledli>
            <Styledli onClick={() => this.props.setCurrency("EUR")}>
              <StyledIcon src={EURIcon} />
              EUR
            </Styledli>
            <Styledli onClick={() => this.props.setCurrency("JPY")}>
              <StyledIcon src={JPYIcon} />
              JPY
            </Styledli>
          </CurrencyList>
        </DropDownContent>
      </>
    );
  }
}
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
  position: fixed;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 140px;
  width: 114px;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "block" : "none")};
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
