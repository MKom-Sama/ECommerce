import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Cart_ItemList from "../components/Cart_ItemList";

export default class Cart extends Component {
  render() {
    return (
      <StyledWrapper>
        <Title>CART</Title>
        <Cart_ItemList
          cart={this.props.cart}
          currency={this.props.currency}
          modifyItemCount={this.props.modifyItemCount}
          modifyAttr={this.props.modifyAttr}
        />
      </StyledWrapper>
    );
  }
}
/* ESLINT */
Cart.propTypes = {
  currency: PropTypes.string,
  cart: PropTypes.array,
  modifyItemCount: PropTypes.func,
  modifyAttr: PropTypes.func,
};
/* STYLES */
const StyledWrapper = styled.div`
  padding: 2% 7.013% 0% 8.125%;
`;

const Title = styled.h2`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  color: #1d1f22;
`;
