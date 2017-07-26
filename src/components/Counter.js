import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const { value, onIncreaseClick, onDecreaseClick, onResetClick, onSaveClick, savedCounter, onRemoveClick } = this.props
    return (
      <div>
        {value}
        <button  onClick={onIncreaseClick}>increase</button>
        <button disabled={value < 1 ? true : false} onClick={onDecreaseClick}>decrease</button>
        <button disabled={value < 1 ? true : false} onClick={onResetClick}>reset</button>
        <button onClick={onSaveClick}>save</button>
        <button disabled={savedCounter.length < 1 ? true : false} onClick={onRemoveClick}>remove</button>
        {savedCounter.map((item =>
          <p>{item}</p>
        ))}
      </div>
    );
  }
}

export default Counter
