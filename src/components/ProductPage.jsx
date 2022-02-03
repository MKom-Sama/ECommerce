import React, { Component } from "react";
import styled from "styled-components";
import PDPController from "./PDPController";

let dummyProduct = {
  name: "Apollo Running Short",
  img: "https://t.ly/aHT0",
  price: "25.55",
};

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: "sm", // xsm | sm | md |lrg
    };
  }
  selectSize = (sz) => this.setState({ selectedSize: sz });
  render() {
    return (
      <StyledWrapper>
        <MiniGallery className="hide-grid-on-small" >
          <MiniImage src={dummyProduct.img} />
          <MiniImage src={dummyProduct.img} />
          <MiniImage src={dummyProduct.img} />
        </MiniGallery>
        <StyledDiv className="responsive-flex">
          <MainImage style={{ flex: 1 }} src={dummyProduct.img} />
          <PDPController
            selectSize={this.selectSize}
            selectedSize={this.state.selectedSize}
          />
        </StyledDiv>
      </StyledWrapper>
    );
  }
}
const StyledWrapper = styled.div`
  padding: 2% 7.013% 0% 8.125%;
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
`;

const MiniGallery = styled.div`
  ${'' /* display: grid;  is grid thro class */}
  grid-gap: 10px;
  grid-template-columns: 1fr;
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 500px;
  margin: 1%;
`;

const MiniImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
const MainImage = styled.img`
  min-width: 50%;
  min-height: 60%;
  margin: 5px;
  object-fit: cover;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
