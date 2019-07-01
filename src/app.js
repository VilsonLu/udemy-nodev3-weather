const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set the specific view engine
app.set('view engine', 'hbs');
// change the directory of the views
app.set('views', viewsPath);
// set the directory for the partials
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));


// when using handlebar, you will need to specify the route
app.get('', (req, res) => {
  res.render('index', { title: 'Weathering with you', subtitle: 'Showing on July', name: 'Vilson Lu' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us', subtitle: 'What do we do?', name: 'Vilson Lu' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', subtitle: 'What do you need?', name: 'Vilson Lu' });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'Please provide an address',
    });
    return;
  }

  geocode(decodeURI(req.query.address), (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({ error });
      return;
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        res.send({ error });
        return;
      }

      res.send({
        forecast: forecastData,
        location,
        search: decodeURI(req.query.address),
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'Please provide a search term',
    });

    return;
  }

  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('error', { code: '404', error: 'What help do you need?' });
});

app.get('*', (req, res) => {
  res.render('error', { code: '404', error: 'The page does not exists :o' });
});

// starts the server

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
