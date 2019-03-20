const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamFkcnViaW8iLCJhIjoiY2p0YTdkc2l4MDgwMDN5bWV1bGN4Z2tteiJ9.tSlDpL9KG4-_63Bn0Mwqcw';

  request({ url, json: true }, (error, { body }) =>{
    if (error) {
      callback('Unable to connect to location services!');
    } else if(body.features.length === 0){
      callback('Unable to find location.. Try another search');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    };
  });
};

module.exports = geocode;
