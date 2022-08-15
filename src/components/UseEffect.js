import { useEffect, useState } from "react";
import styled from "styled-components";

function UseEffect() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [name, setName] = useState("");

  // On Every Render
  useEffect(() => {
    console.log("component re-rendered");
  });

  // On first Render/Mount only! - componentDidMount Alternative
  useEffect(() => {
    console.log("The component mounted!");
  }, []);

  // On first Render + whenever dependency changes! only! - componentDidUpdate Alternative
  useEffect(() => {
    console.log(`The name changed!: ${name}`);

    //cleanup code...
    return () => {
      console.log("component unmounted");
    };
  }, [name]); // can include props or state in the dependency array

  // Follows the same rules, except this handles the unmounting on a component! - componentWillUnmount Alternative
  useEffect(() => {
    console.log("attach listener");
    window.addEventListener("resize", updateWindowWidth);
  }, []);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  return (
    <Container>
      <h1>useEffect Hook</h1>
      <h2>The window width is:{windowWidth}</h2>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a name"
      />
    </Container>
  );
}

export default UseEffect;
const Container = styled.div``;
const Input = styled.input``;
