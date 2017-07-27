import RequestService from './RequestService'

const BASE_URL = "http://52.18.171.117/api/kiosk"

class NetworkService {
  getLocation() {
    const url = `${BASE_URL}/location/338495a7-d32c-4991-bc32-74018850497b`
    return RequestService.request(url, 'GET')
  }

  getTrailers(locationId) {
    const url = `${BASE_URL}/location/productids/${locationId}`
    return RequestService.request(url, 'GET')
  }

  getUser(mobile, email) {
    const url = `${BASE_URL}/user/${mobile}/${email}`
    return RequestService.request(url, 'GET')
  }

  postReservation(data) {
    const url = `${BASE_URL}/reservation/create`
    return RequestService.request(url, 'POST', data)
  }
}

export default new NetworkService()
