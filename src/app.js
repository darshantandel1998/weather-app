const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocoding, forecast } = require('./utils');

const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Darshan Tandel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Darshan Tandel'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Darshan Tandel',
        helpText: 'This is helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Address is not provided.' });
    }
    geocoding(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        forecast(latitude, longitude, (error, { weather_descriptions, temperature, feelslike } = {}) => {
            if (error) return res.send({ error });
            return res.send({
                address: req.query.address,
                latitude,
                longitude,
                location,
                weather_descriptions,
                temperature,
                feelslike,
                forecase: `${location}. (${latitude}, ${longitude})\n${weather_descriptions}. It is currently ${temperature} degree out. It feels like ${feelslike} degree out.`
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Darshan Tandel',
        errorMessage: 'Help artical not found.'
    });
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Darshan Tandel',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
