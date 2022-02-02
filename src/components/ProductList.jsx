import React, { Component } from "react";
import styled from "styled-components";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledWrapper>
        <h2>{this.props.category}</h2>
      </StyledWrapper>
    );
  }
}

const StyledWrapper = styled.div`
  padding: 1% 7.013% 0% 8.125%;
`;
