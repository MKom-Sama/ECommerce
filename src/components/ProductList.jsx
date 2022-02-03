import React, { Component } from "react";
import styled from "styled-components";

import cartIcon from "../assets/svg/cart.svg";

let dummyData = [
  { name: "Apollo Running Short", img: "https://t.ly/aHT0", price: "25.55" },
  { name: "Apollo Running Short", img: "https://t.ly/aHT0", price: "25.55" },
  { name: "Apollo Running Short", img: "https://t.ly/D8OR", price: "25.55" },
  { name: "Apollo Running Short", img: "https://t.ly/aHT0", price: "25.55" },
  { name: "Apollo Running Short", img: "https://t.ly/aHT0", price: "25.55" },
  { name: "Apollo Running Short", img: "https://t.ly/aHT0", price: "25.55" },
];

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: dummyData,
    };
  }
  render() {
    return (
      <StyledWrapper>
        <span style={{ fontSize: "2em" }}>
          {this.props.category.toUpperCase()}
        </span>
        <Grid>
          {this.state.products.map((product) => (
            <ProductItem>
              <ProductImg src={product.img} />
              <AddToCartButton>
                <CartIcon src={cartIcon} />
              </AddToCartButton>
              <span style={{ fontSize: "1.4em" }}>{product.name}</span>
              <span style={{ fontSize: "1.2em", marginTop: 8 }}>
                <strong>$</strong>
                {product.price}
              </span>
            </ProductItem>
          ))}
        </Grid>
      </StyledWrapper>
    );
  }
}

const StyledWrapper = styled.div`
  padding: 2% 7.013% 0% 8.125%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));;
  grid-gap: 5%;
  padding-top: 4%;
  padding-bottom:5%;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom:10px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transition:transform .5s ease;
  &:hover{
    transform:scale(1.01)
  }
`;
const ProductImg = styled.img`
  max-height: 80%;
  flex: 1;
  object-fit: cover;
`;

const AddToCartButton = styled.button`
  all: unset;
  display: flex;
  background-color: #5ece7b;
  width: 52px;
  height: 52px;
  border-radius: 100%;
  align-self: flex-end;
  margin-top: -5%;
  margin-right: 5%;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #66d477;
  }
`;

const CartIcon = styled.img`
  filter: brightness(0) invert(1);
`;
