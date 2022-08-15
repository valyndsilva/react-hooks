import React, { Component } from "react";

export default class PropsChildClass extends Component {
  render() {
    const { name, description } = this.props; // assigning to this.props you can pull the values of name and description
    return (
      <div>
        <strong>
          <i>Child-based component</i>
        </strong>
        {/* <h2>{this.props.name}</h2>
        <p>{this.props.description}</p> */}

        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    );
  }
}
