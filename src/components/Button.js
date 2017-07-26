import React, { Component } from 'react';

class Button extends Component {
  render() {
    const {onClick, text, disabled} = this.props
    return (
      <button
        disabled={disabled}
        onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button
