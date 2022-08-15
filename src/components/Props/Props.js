import React from "react";
import PropsChild from "./PropsChild";
import PropsChildClass from "./PropsChildClass";

// function Props(props) {
function Props({ name, description, price }) {
  return (
    <div>
      {/* <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>{props.price}</p> */}

      {/* <h2>{name}</h2>
      <p>{description}</p>
      <p>{price}</p> */}

      <PropsChild name={name} description={description} />
      <PropsChildClass name={name} description={description} />
      <p>{price}</p>
    </div>
  );
}

export default Props;
