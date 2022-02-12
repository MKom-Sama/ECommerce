import React, { Component } from "react";

import styled from "styled-components";

// Currency Icons
import USDIcon from "../assets/svg/currIcons/USD.svg";
import GBPIcon from "../assets/svg/currIcons/GBP.svg";
import JPYIcon from "../assets/svg/currIcons/JPY.svg";
import RUBIcon from "../assets/svg/currIcons/RUB.svg";
import A$Icon from "../assets/svg/currIcons/A$.svg";

import upIcon from "../assets/svg/up_arrow.svg";
import downIcon from "../assets/svg/down_arrow.svg";

export default class CurrencyPicker extends Component {
  constructor(props) {
    super(props);
  }
  getCurrIcon = (currName) => {
    switch (currName) {
      case "USD":
        return USDIcon;
      case "GBP":
        return GBPIcon;
      case "JPY":
        return JPYIcon;
      case "RUB":
        return RUBIcon;
      case "AUD":
        return A$Icon;
      default:
        break;
    }
  };
  render() {
    return (
      <>
        <StyledIcon
          src={this.getCurrIcon(this.props.currency)}
          alt="currency"
          onClick={() => this.props.togCurrOverlay()}
        />
        <NonDraggableImg
          src={this.props.visCurrOverlay ? upIcon : downIcon}
          style={{ marginRight: "1.375em" }}
        />
        <DropDownContent
          visible={this.props.visCurrOverlay}
          className="fade-on-display"
        >
          <CurrencyList>
            {this.props.currencies.map((curr) => (
              <Styledli onClick={() => this.props.setCurrency(curr)}>
                <StyledIcon src={this.getCurrIcon(curr)} />
                {curr}
              </Styledli>
            ))}
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
