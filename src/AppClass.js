import React, { Component } from "react";
import styled from "styled-components";

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    // count += 1; // wrong approach
    // setCount(count + 1); // correct approach for functional component

    // this.setState({
    //   count: this.state.count + 1,
    // });

    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  decrement = () => {
    // count -= 1; // wrong approach
    // setCount(count - 1);  // correct approach for functional component

    // this.setState({
    //   count: this.state.count - 1,
    // });
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };
  render() {
    return (
      <Container>
        <h1>useState Hook</h1>
        <h2>Count tracker</h2>
        <p>The count is: {this.state.count}</p>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </Container>
    );
  }
}
const Container = styled.div``;
const Button = styled.button``;
