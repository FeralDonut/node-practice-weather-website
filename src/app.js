// express library exposes a single fucntion used to create a new express application
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public/index.html'));

// express doesnt take in any arguements
// we configure our server by using various methods on the app itself.
const app = express();

// defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engin and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jose-Antonio D. Rubio',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Jose-Antonio'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jose-Antonio D. Rubio',
    message: 'Help! I need somebody.',
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error });
    } 
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
     return res.send({
      error:'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404 ERROR',
    name: "Jose-Antonio D. Rubio",
    errorMessage: 'Help Article Not Found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: "404 ERROR",
    name: "Jose-Antonio D. Rubio",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});