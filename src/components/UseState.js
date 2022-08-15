import React, { useState } from "react";
import styled from "styled-components";

function UseState() {
  const [count, setCount] = useState(0); // setCount (2nd variable) here is the setter which is a fn that allows you to modify the value of what is stored in the count(1st variable). setting useState to 0 means setting count to a initial value of 0.
  const increment = () => {
    // count += 1; // wrong approach
    setCount(count + 1); // correct approach
  };
  const decrement = () => {
    // count -= 1; // wrong approach
    setCount(count - 1);
  };
  // Check AppClass.js for class component type of this example
  return (
    <Container>
      <h1>useState Hook</h1>
      <h2>Count tracker</h2>
      <p>The count is: {count}</p>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
    </Container>
  );
}

export default UseState;
const Container = styled.div``;
const Button = styled.button``;
