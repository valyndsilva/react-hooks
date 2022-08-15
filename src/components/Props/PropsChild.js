import React from "react";

function PropsChild({ name, description }) {
  return (
    <div>
      <strong>
        <i>Functional-based component</i>
      </strong>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default PropsChild;
