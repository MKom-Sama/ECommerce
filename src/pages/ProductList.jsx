import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Icons
import cartIcon from "../assets/svg/cart.svg";

// Utils
import { getCurrencySymbol } from "../utils";
import { getProducts } from "../graphQL";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    getProducts().then((result) => this.setState({ products: result }));
  }
  render() {
    return (
      <StyledWrapper>
        <span style={{ fontSize: "2em" }}>
          {this.props.category.toUpperCase()}
        </span>
        <Grid>
          {this.state.products.map((product) => (
            <ProductItem key={product.id}>
              <Link
                style={{
                  all: "initial",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  maxHeight: "80%",
                }}
                to={`/product/${product.id}`}
              >
                <ProductImg src={product.gallery[0]} />
              </Link>
              <AddToCartButton
                onClick={() =>
                  this.props.addNewItem({
                    pid: product.id,
                    name: product.name,
                    prices: product.prices,
                    size: "xsm",
                    gallery: product.gallery,
                  })
                }
              >
                <CartIcon src={cartIcon} />
              </AddToCartButton>
              <Link
                style={{ all: "initial", cursor: "pointer" }}
                to={`/product/${product.id}`}
              >
                <span style={{ fontSize: "1.4em" }}>{product.name}</span>
              </Link>
              <span style={{ fontSize: "1.2em", marginTop: 8 }}>
                <strong>{getCurrencySymbol(this.props.currency)}</strong>
                {
                  product.prices.filter(
                    (price) => price.currency.label == this.props.currency
                  )[0].amount
                }
              </span>
            </ProductItem>
          ))}
        </Grid>
      </StyledWrapper>
    );
  }
}

// Styles
const StyledWrapper = styled.div`
  padding: 2% 7.013% 0% 8.125%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-gap: 5%;
  padding-top: 4%;
  padding-bottom: 5%;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.01);
  }
`;

const ProductImg = styled.img`
  max-height: 95%;
  flex: 1;
  object-fit: cover;
  padding-bottom: 0;
  margin-bottom: -40%;
`;

const AddToCartButton = styled.button`
  all: unset;
  display: flex;
  background-color: #5ece7b;
  width: 52px;
  height: 52px;
  border-radius: 100%;
  align-self: flex-end;
  margin-top: -10%;
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
