import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {
  updateStore,
} from './actions'
import {
  getFetch,
  postFetch,
  postFetch1
} from './api'

const GUID_LINK = 'http://52.18.171.117/api/kiosk/location/338495a7-d32c-4991-bc32-74018850497b'
const TRAILER_TYPES_LINK = 'http://52.18.171.117/api/kiosk/location/productids/'
const LOGIN = 'http://52.18.171.117/api/kiosk/user/'
const PRICE_LINK = 'http://52.18.171.117/api/kiosk/orderlinetypes'
const CREATE_LINK = 'http://52.18.171.117/api/kiosk/reservation/create'
const CREATE_LEASE = 'http://52.18.171.117/api/kiosk/lease/create'

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
    getFetch(GUID_LINK, (data) => onUpdateStore('reservation', 'isBluetoothLocation', data.isBluetoothLocation))
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
    const { mobile, email } = this.state
    getFetch(LOGIN + mobile + '/' + email, (data) => {
      const {DebitorNavn, DebitorEmail, DebitorID, DebitorAdresse1, DebitorPostnr, DebitorBy } = data
      onUpdateStore('customer', 'DebitorNavn', DebitorNavn)
      onUpdateStore('customer', 'DebitorEmail', DebitorEmail)
      onUpdateStore('customer', 'DebitorID', DebitorID)
      onUpdateStore('customer', 'DebitorAdresse1', DebitorAdresse1)
      onUpdateStore('customer', 'DebitorPostnr', DebitorPostnr)
      onUpdateStore('customer', 'DebitorBy', DebitorBy)
    })
  }

  onDriverSave = () => {
    const { onUpdateStore } = this.props
    const { license, registration } = this.state
    const { locationId, productId, startDate, endDate } = this.props.state.reservation
    onUpdateStore('driver', 'PrimaryDrivingLicenseNumber', license)
    onUpdateStore('driver', 'RegistrationNumber', registration)
    postFetch1(CREATE_LEASE, {
      lease: {
        FKLocationID: locationId,
        FKProductID: productId,
        SessionID: '6852267c-d8c2-471a-8a35-cf4a3403c412',
        ReservationDateStart: startDate,
        ReservationDateEnd: endDate
      }
    }, (data) => {
      console.log(data);
    })
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
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  onReserveClick = () => {
    const { reservation, customer, driver } = this.props.state
    postFetch1(CREATE_LINK, {
      ...reservation,
      customer: { ...customer },
      driverInfo: { ...driver }
      }, (data) => {
        console.log(data);
      }
    )
  }

  render() {
    const { locationId, startDate, endDate, productId } = this.props.state.reservation
    const { trailers, summary } = this.state
    const { DebitorNavn } = this.props.state.customer
    const { RegistrationNumber } = this.props.state.driver
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {locationId}
        {trailers.map((item, index) =>
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
        {productId &&
          <div>
            selected trailer:
            {productId}
            <br />
            <br />
            your selected times:
            <br />
            {startDate}
            <br />
            {endDate}
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
            {DebitorNavn &&
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
            {RegistrationNumber &&
              <div>
                <button onClick={this.getPrice}>get price</button>
                {summary.map((item) =>
                  item.type === 10 ? <p>{item.cost} DKK</p> : false
                )}
              </div>
            }
            {summary.length > 1 &&
              <button onClick={this.onReserveClick}>reserve</button>
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
