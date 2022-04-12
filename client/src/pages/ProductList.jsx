import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

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
        <CategoryName>{this.props.category.toUpperCase()}</CategoryName>
        <Grid>
          {this.state.products.map(
            (product) =>
              (product.category === this.props.category ||
                this.props.category === "all") && (
                <ProductItem key={product.id}>
                  <OutOfStock inStock={product.inStock}>
                    Out Of Stock
                  </OutOfStock>
                  <LinkToPDP to={`/product/${product.id}`}>
                    <ProductImg src={product.gallery[0]} />
                  </LinkToPDP>
                  <AddToCartButton
                    onClick={() =>
                      this.props.addNewItem(product, 1, product.inStock)
                    }
                  >
                    <CartIcon src={cartIcon} />
                  </AddToCartButton>
                  <Link className="non-decor" to={`/product/${product.id}`}>
                    <ProductName>
                      {product.brand + " " + product.name}
                    </ProductName>
                  </Link>
                  <ProductPrice>
                    <strong className="bold">
                      {getCurrencySymbol(this.props.currency)}
                    </strong>
                    {parseFloat(
                      product.prices.filter(
                        (price) => price.currency.label === this.props.currency
                      )[0].amount
                    ).toFixed(2)}
                  </ProductPrice>
                </ProductItem>
              )
          )}
        </Grid>
      </StyledWrapper>
    );
  }
}

/* ESLINT */
ProductList.propTypes = {
  // Currency
  currency: PropTypes.string,
  // Category
  category: PropTypes.string,
  // Cart
  addNewItem: PropTypes.func,
};
/* STYLES */
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

const ProductName = styled.span`
  font-size: 1.4em;
`;
const ProductPrice = styled.span`
  font-size: 1.2em;
  margin-top: 8px;
`;

const AddToCartButton = styled.button`
  all: unset;
  display: flex; /* Changed on Hover to Flex */
  background-color: #5ece7b;
  width: 52px;
  height: 52px;
  border-radius: 100%;
  align-self: flex-end;
  margin-top: -10%;
  margin-right: 5%;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.5s ease;
  opacity: 0;
  &:hover {
    background-color: #66d477;
  }
`;
const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 10px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }
  &:hover ${AddToCartButton} {
    opacity: 1;
  }
`;

const ProductImg = styled.img`
  max-height: 95%;
  flex: 1;
  object-fit: contain;
  padding-bottom: 0;
  margin-bottom: -40%;
`;

const LinkToPDP = styled(Link)`
  all: initial;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 80%;
`;
const CartIcon = styled.img`
  filter: brightness(0) invert(1);
`;
const OutOfStock = styled.div`
  position: absolute;
  align-self: center;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  margin-top: 12%;
  color: #8d8f9a;
  display: ${(props) => (!props.inStock ? "default" : "none")};
`;

const CategoryName = styled.strong`
  font-size: 2em;
`;
