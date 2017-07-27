import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {
  updateStore,
} from './actions'
import NetworkService from './apiService/NetworkService'

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

  getLocationData = () => {
    const { onUpdateStore } = this.props
    NetworkService.getLocation()
      .then(data => {
        onUpdateStore('reservation', 'locationId', data.LokationID)
        onUpdateStore('reservation', 'isBluetoothLocation', data.isBluetoothLocation)
      })
  }

  getTrailerData = () => {
    const { locationId } = this.props.state.reservation
    NetworkService.getTrailers(locationId)
      .then(data => {
        this.setState({trailers: data})
      })
  }

  getUserData = () => {
    const { onUpdateStore } = this.props
    const { mobile, email } = this.state
    NetworkService.getUser(mobile, email)
      .then(data => {
        const {DebitorNavn, DebitorEmail, DebitorID, DebitorAdresse1, DebitorPostnr, DebitorBy } = data
        onUpdateStore('customer', 'DebitorNavn', DebitorNavn)
        onUpdateStore('customer', 'DebitorEmail', DebitorEmail)
        onUpdateStore('customer', 'DebitorID', DebitorID)
        onUpdateStore('customer', 'DebitorAdresse1', DebitorAdresse1)
        onUpdateStore('customer', 'DebitorPostnr', DebitorPostnr)
        onUpdateStore('customer', 'DebitorBy', DebitorBy)
      })
  }

  postReservationData = () => {
    const { reservation, customer, driver } = this.props.state
    NetworkService.postReservation({
      ...reservation,
      customer: { ...customer },
      driverInfo: { ...driver }
    }).then(data => {
      console.log(data);
    })
  }

  componentDidMount() {
    this.getLocationData()
  }

  onSearchTrailersClick = () => {
    this.getTrailerData();
  }

  onTrailerClick = (productId) => {
    const { onUpdateStore } = this.props
    onUpdateStore('reservation', 'productId', productId)
  }

  onLoginClick = () => {
    this.getUserData()
  }

  onDriverSave = () => {
    const { onUpdateStore } = this.props
    const { license, registration } = this.state
    //const { locationId, productId, startDate, endDate } = this.props.state.reservation
    onUpdateStore('driver', 'PrimaryDrivingLicenseNumber', license)
    onUpdateStore('driver', 'RegistrationNumber', registration)
    // postFetch1(CREATE_LEASE, {
    //   lease: {
    //     FKLocationID: locationId,
    //     FKProductID: productId,
    //     SessionID: '6852267c-d8c2-471a-8a35-cf4a3403c412',
    //     ReservationDateStart: startDate,
    //     ReservationDateEnd: endDate
    //   }
    // }, (data) => {
    //   console.log(data);
    // })
  }

  getPrice = () => {
    // const { locationId, startDate, endDate, productId, insurance } = this.props.state.reservation
    // postFetch(PRICE_LINK, {
    //   locationId,
    //   startDate,
    //   endDate,
    //   productId,
    //   insurance
    // },
    // (data) => {
    //   this.setState({summary: data})
    // })
  }

  onInputChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  onReserveClick = () => {
    this.postReservationData();
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
      <button onClick={this.onSearchTrailersClick}>get trailers</button>
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
              <button onClick={this.onLoginClick}>login</button>
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
            <button onClick={this.onReserveClick}>reserve</button>
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
