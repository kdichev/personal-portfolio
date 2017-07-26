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
  fetchData,
  loadData,
  updateStore,
} from './actions'
const GUID = '338495a7-d32c-4991-bc32-74018850497b'
const CC = 'dk'
const LINK = 'http://52.18.171.117/api/kiosk/location/338495a7-d32c-4991-bc32-74018850497b'
  class App extends Component {
    componentWillMount() {
      fetch(LINK)  
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log(data);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
      // const {savedCounter, fetchData, loadData} = this.props
      // const stub = ["Pre","Loaded","State",4,5,6,7,8]
      // console.log(savedCounter);
      // fetchData(stub);
      // loadData(stub)
      this.props.onUpdateStore('driver', 'RegistrationNumber', 1231231212)

    }

    componentDidMount() {
      this.props.onUpdateStore('reservation', 'locationId', 1)
    }

    render() {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            {this.props.state.driver.RegistrationNumber}
            <br />
            {this.props.state.reservation.locationId}
            <br />
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          {/* <Counter
            onIncreaseClick={this.props.onIncreaseClick}
            onDecreaseClick={this.props.onDecreaseClick}
            onResetClick={this.props.onResetClick}
            onSaveClick={this.props.onSaveClick}
            onRemoveClick={this.props.onRemoveClick}
            value={this.props.counterValue}
            savedCounter={this.props.savedCounter}
          /> */}
          {/* <Data data={this.props.fetch}/> */}
        </div>
      );
    }
  }

// Map Redux state to component props
function mapStateToProps(state)  {
  // let counter = state.counter
  // let fetch = state.fetch
  return {
    // counterValue: counter.count,
    // savedCounter: counter.saved,
    // fetch: fetch.data
    state: state.ftgroup
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    // onIncreaseClick: () => dispatch(increaseAction),
    // onDecreaseClick: () => dispatch(decreaseAction),
    // onResetClick: () => dispatch(resetAction),
    // onSaveClick: () => dispatch(saveAction),
    // onRemoveClick: () => dispatch(removeAction),
    // fetchData: (data) => dispatch(fetchData(data)),
    // loadData: (data) => dispatch(loadData(data))
    onUpdateStore: (field, key, value) => dispatch(updateStore(field, key, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
