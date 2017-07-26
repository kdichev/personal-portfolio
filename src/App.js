import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter'
import Data from './components/Data'
import {
  increaseAction,
  decreaseAction,
  resetAction,
  saveAction,
  removeAction,
  fetchData
} from './actions'

class App extends Component {
  componentDidMount() {
    const response = [1,2,3,4,5,6,7,8]
    this.props.fetchData(response);
  }
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
        <Data data={this.props.fetch}/>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state)  {
  let counter = state.counter
  let fetch = state.fetch
  return {
    counterValue: counter.count,
    savedCounter: counter.saved,
    fetch: fetch.data
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction),
    onResetClick: () => dispatch(resetAction),
    onSaveClick: () => dispatch(saveAction),
    onRemoveClick: () => dispatch(removeAction),
    fetchData: (data) => dispatch(fetchData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
