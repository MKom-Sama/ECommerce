import React, { Component } from "react";

import styled from "styled-components";

import { getCurrencySymbol } from "../utils";

import rightIcon from "../assets/svg/arrows/right_arrow.svg";
import leftIcon from "../assets/svg/arrows/left_arrow.svg";

export default class Cart_ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsGallery: {},
    };
  }
  componentDidMount() {
    let gallery = {};
    this.props.cart.forEach((item) => {
      gallery[item.id] = { img: item.gallery, idx: 0 };
    });
    this.setState({ itemsGallery: { ...gallery } });
  }

  getFirstImg = (id) => {
    try {
      return this.state.itemsGallery[id].img[this.state.itemsGallery[id].idx];
    } catch {
      return "https://t.ly/Kuar";
    }
  };

  changeImg = (id, inc) => {
    // Rotate Thro Item Gallery Array
    let itemGallery = [...this.state.itemsGallery[id].img];
    let currIdx = this.state.itemsGallery[id].idx;

    let newIdx = (currIdx + inc) % itemGallery.length;
    if (newIdx < 0) {
      newIdx += itemGallery.length;
    }
    let newItemsGallery = { ...this.state.itemsGallery };
    newItemsGallery[id].idx = newIdx;
    this.setState({ itemsGallery: { ...newItemsGallery } });
  };

  render() {
    return (
      <StyledWrapper>
        <CartList>
          {this.props.cart.map((item) => (
            <CartItem key={item.pid}>
              <Left>
                <Text>{item.name}</Text>
                <h2>
                  {getCurrencySymbol(this.props.currency)}
                  {
                    item.prices.filter(
                      (price) => price.currency.label === this.props.currency
                    )[0].amount
                  }
                </h2>
                {/* For Type text Attributes */}
                {item.attributes.map(
                  (attrSet, idx) =>
                    attrSet.type === "text" && (
                      <span key={idx}>
                        <strong className="robo">{attrSet.name}:</strong>
                        <Sizes>
                          {attrSet.items.map((attrItem, idx) => (
                            <Size
                              key={idx}
                              btnSelects={attrItem.value}
                              onClick={() =>
                                this.props.modifyAttr(
                                  item.id,
                                  attrSet.name,
                                  attrItem.value
                                )
                              }
                              selectedAttr={item.selectedAttr[attrSet.name]}
                            >
                              {attrItem.value}
                            </Size>
                          ))}
                        </Sizes>
                      </span>
                    )
                )}
                {/* For Type swatch Attributes */}
                {item.attributes.map(
                  (attrSet, idx) =>
                    attrSet.type === "swatch" && (
                      <span key={idx}>
                        <strong className="robo bold">{attrSet.name}:</strong>
                        <Sizes>
                          {attrSet.items.map((attrItem, idx) => (
                            <SwatchBox
                              key={idx}
                              btnSelects={attrItem.displayValue}
                              swatchColor={attrItem.value}
                              onClick={() =>
                                this.props.modifyAttr(
                                  item.id,
                                  attrSet.name,
                                  attrItem.displayValue
                                )
                              }
                              selectedAttr={item.selectedAttr[attrSet.name]}
                            />
                          ))}
                        </Sizes>
                      </span>
                    )
                )}
              </Left>
              <Right>
                <BoxGroup>
                  <Box
                    name="plus"
                    onClick={() => this.props.modifyItemCount(item.id, 1)}
                  >
                    +
                  </Box>
                  <span>{item.quantity}</span>
                  <Box
                    name="minus"
                    onClick={() => this.props.modifyItemCount(item.id, -1)}
                  >
                    -
                  </Box>
                </BoxGroup>
                <div>
                  <ProductImg
                    className="non-drag"
                    src={this.getFirstImg(item.id)}
                  />
                  {item.gallery.length > 1 && (
                    <Arrows>
                      <img
                        onClick={() => this.changeImg(item.id, -1)}
                        className="non-decor"
                        src={leftIcon}
                        alt="arrow_left"
                      />
                      <img
                        onClick={() => this.changeImg(item.id, 1)}
                        className="non-decor"
                        src={rightIcon}
                        alt="arrow_right"
                      />
                    </Arrows>
                  )}
                </div>
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

const Arrows = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-top: -85%;
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
const ProductImg = styled.img`
  flex: 4;
  max-width: 141px;
  max-height: 185px;
  min-width: 141px;
  min-height: 185px;
`;

const BoxGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
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
  align-self: center;
  font-size: 14px;
  &:hover {
    background-color: #d7dee3;
  }
`;
const Size = styled.button`
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
  background-color: ${(props) =>
    props.btnSelects === props.selectedAttr ? "#000000" : "#ffffff"};
  color: ${(props) =>
    props.btnSelects === props.selectedAttr ? "#ffffff" : "#000000"};
  &:hover {
    background-color: #30404d;
    color: #ffffff;
  }
`;
const SwatchBox = styled.div`
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
  background-color: ${(props) =>
    props.btnSelects === props.selectedAttr
      ? `${props.swatchColor}`
      : "#ffffff"};
  border-color: ${(props) => props.swatchColor};
`;
const Text = styled.span`
  font-style: normal;
  font-size: 26px;
  color: #1d1f22;
`;
