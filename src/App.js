import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter'
import {
  increaseAction,
  decreaseAction,
  resetAction,
  saveAction,
  removeAction
} from './actions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Counter
          onIncreaseClick={this.props.onIncreaseClick}
          onDecreaseClick={this.props.onDecreaseClick}
          onResetClick={this.props.onResetClick}
          onSaveClick={this.props.onSaveClick}
          onRemoveClick={this.props.onRemoveClick}
          value={this.props.counterValue}
          savedCounter={this.props.savedCounter}
        />
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state)  {
  let counter = state.counter
  return {
    counterValue: counter.count,
    savedCounter: counter.saved
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction),
    onResetClick: () => dispatch(resetAction),
    onSaveClick: () => dispatch(saveAction),
    onRemoveClick: () => dispatch(removeAction)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
