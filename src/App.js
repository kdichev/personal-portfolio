import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {
  updateStore,
} from './actions'
import {getFetch, postFetch} from './api'

const GUID_LINK = 'http://52.18.171.117/api/kiosk/location/338495a7-d32c-4991-bc32-74018850497b'
const TRAILER_TYPES_LINK = 'http://52.18.171.117/api/kiosk/location/productids/'
const LOGIN = 'http://52.18.171.117/api/kiosk/user/'
const PRICE_LINK = 'http://52.18.171.117/api/kiosk/orderlinetypes'
class App extends Component {
  constructor() {
    super();
    this.state = {
      trailers: [],
      mobile: '',
      email: '',
      license: '',
      registration: '',
      summary: []
    }
  }
  componentDidMount() {
    const { onUpdateStore } = this.props
    getFetch(GUID_LINK, (data) => onUpdateStore('reservation', 'locationId', data.LokationID))
  }

  onClick = () => {
    const { locationId } = this.props.state.reservation
    getFetch(TRAILER_TYPES_LINK + locationId, (data) => this.setState({trailers: data}))
  }

  onTrailerClick = (productId) => {
    const { onUpdateStore } = this.props
    onUpdateStore('reservation', 'productId', productId)
  }

  onLogin = () => {
    const { onUpdateStore } = this.props
    getFetch(LOGIN + this.state.mobile + '/' + this.state.email, (data) => {
      onUpdateStore('customer', 'DebitorNavn', data.DebitorNavn)
      onUpdateStore('customer', 'DebitorEmail', data.DebitorEmail)
      onUpdateStore('customer', 'DebitorID', data.DebitorID)
      onUpdateStore('customer', 'DebitorAdresse1', data.DebitorAdresse1)
      onUpdateStore('customer', 'DebitorPostnr', data.DebitorPostnr)
      onUpdateStore('customer', 'DebitorBy', data.DebitorBy)
    })
  }

  onDriverSave = () => {
    const { onUpdateStore } = this.props
    onUpdateStore('driver', 'PrimaryDrivingLicenseNumber', this.state.license)
    onUpdateStore('driver', 'RegistrationNumber', this.state.registration)
  }

  getPrice = () => {
    const { locationId, startDate, endDate, productId, insurance } = this.props.state.reservation
    postFetch(PRICE_LINK, {
      locationId,
      startDate,
      endDate,
      productId,
      insurance
    },
    (data) => {
      this.setState({summary: data})
    })
  }

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.props.state.reservation.locationId}
        {this.state.trailers.map((item, index) =>
          <div key={index}>
            <p>{`${item.ProductName} ${item.ProductID}`}
              <button
                disabled={item.Available === 0 ? true: false}
                onClick={() => this.onTrailerClick(item.ProductID)}>reserve</button>
            </p>
          </div>
        )}
        <br />
        <button onClick={this.onClick}>get trailers</button>
        <br />
        <br />
        {this.props.state.reservation.productId &&
          <div>
            selected trailer:
            {this.props.state.reservation.productId}
            <br />
            <br />
            your selected times:
            <br />
            {this.props.state.reservation.startDate}
            <br />
            {this.props.state.reservation.endDate}
            <br />
            <br />
            <div>
              <label>email:</label>
              <input id='email' type='text' onChange={(e) => this.onInputChange(e)}/>
              <br />
              <label>mobile:</label>
              <input id='mobile' type='text' onChange={(e) => this.onInputChange(e)}/>
              <br />
              <button onClick={this.onLogin}>login</button>
            </div>
            {this.props.state.customer.DebitorNavn &&
              <div>
                <label>license:</label>
                <input id='license' type='text' onChange={(e) => this.onInputChange(e)}/>
                <br />
                <label>registration:</label>
                <input id='registration' type='text' onChange={(e) => this.onInputChange(e)}/>
                <br />
                <button onClick={this.onDriverSave}>save</button>
              </div>
            }
            <br />
            <br />
            {this.props.state.driver.RegistrationNumber &&
              <div>
                <button onClick={this.getPrice}>get price</button>
                {this.state.summary.map((item) =>
                  item.type === 10 ? <p>{item.cost} DKK</p> : false
                )}
              </div>
            }
            {this.state.summary.length > 1 &&
              <button>reserve</button>
            }
          </div>
        }
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    state: state.ftgroup
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onUpdateStore: (field, key, value) => dispatch(updateStore(field, key, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
