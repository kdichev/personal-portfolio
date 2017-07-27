export function getFetch(link, callback) {
  fetch(link)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        callback(data)
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

export function postFetch(link, data, callback) {
  fetch(link, {
    method: 'POST',
    headers: {
      'country': 'dk',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      locationId: data.locationId,
      reservationStart: data.startDate,
      reservationEnd: data.endDate,
      productId: data.productId,
      insurance: data.insurance
    })
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        callback(data)
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
