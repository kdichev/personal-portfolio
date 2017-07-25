import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {
  increaseAction,
  decreaseAction,
  resetAction
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
        {this.props.value}
        <button onClick={this.props.onIncreaseClick}>increase</button>
        <button onClick={this.props.onDecreaseClick}>decrease</button>
        <button onClick={this.props.onResetClick}>reset</button>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state)  {
  let counter = state.counter
  console.log(state);
  return {
    value: counter.count
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction),
    onResetClick: () => dispatch(resetAction)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
