class RequestService {
  // async function
  async request(url, method, data = null) {
    const settings = {
      method: method,
      headers: {
        'country': 'dk',
        'content-type': 'application/json'
      }
    }
    if (data) {
      settings.body = JSON.stringify(data);
    }
    let req = await (await (fetch(url, settings)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log('Error: ', err)
      })
    ))
    return req
  }
}

export default new RequestService()
