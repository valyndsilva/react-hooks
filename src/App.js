import "./App.css";
import styled from "styled-components";
import UseEffect from "./components/UseEffect";
import UseState from "./components/UseState";
import Props from "./components/Props/Props";
import CustomHook from "./components/CustomHook/CustomHook";
function App() {
  // https://usehooks.com/
  return (
    <Container>
      <UseEffect />
      <UseState />
      <br />
      <Props
        name="Props!"
        description="Props passed here from App.js parent!"
        price={10}
      />
      <CustomHook />
    </Container>
  );
}

export default App;
const Container = styled.div``;
