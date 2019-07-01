const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const TOKEN = process.env.FORECAST_TOKEN;
  const url = `https://api.darksky.net/forecast/${TOKEN}/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const currentData = body.currently;
      const dailyData = body.daily;
      const { temperatureHigh } = dailyData.data[0];
      const { temperatureLow } = dailyData.data[0];
      const message = `${dailyData.data[0].summary} It is currently ${currentData.temperature} degrees out. The temperature high today is ${temperatureHigh} with a low of ${temperatureLow}. There is ${currentData.precipProbability}% chance of rain.`;
      callback(undefined, message);
    }
  });
};

module.exports = forecast;
