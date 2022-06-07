const mapbox = require('./utils/mapbox');
const weatherstack = require('./utils/weatherstack');

module.exports = {
    geocoding: mapbox.geocoding,
    forecast: weatherstack.current
};
