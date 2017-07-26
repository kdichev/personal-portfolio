import React, { Component } from 'react';
import Button from './Button'

class Counter extends Component {
  render() {
    const {
      value,
      onIncreaseClick,
      onDecreaseClick,
      onResetClick,
      onSaveClick,
      savedCounter,
      onRemoveClick
    } = this.props
    return (
      <div>
        {value}
        <Button onClick={onIncreaseClick} text={"increase"} />
        <Button onClick={onDecreaseClick} text={"decrease"} disabled={value < 1 ? true : false} />
        <Button onClick={onResetClick} text={"reset"} disabled={value < 1 ? true : false} />
        <Button onClick={onSaveClick} text={"save"} disabled={value < 1 ? true : false}/>
        <Button onClick={onRemoveClick} text={"remove"} />
        {savedCounter.map((item =>
          <p>{item}</p>
        ))}
      </div>
    );
  }
}

export default Counter
