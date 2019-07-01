const request = require('request');

const geocode = (address, callback) => {
  const TOKEN = process.env.GEOCODE_ACCESS_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${TOKEN}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;

      const coordinates = {
        latitude,
        longitude,
        location,
      };

      callback(undefined, coordinates);
    }
  });
};

module.exports = geocode;
