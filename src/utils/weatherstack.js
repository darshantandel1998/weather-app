const request = require('request');

const apiUrl = 'http://api.weatherstack.com';
const apiKey = '8ce801f7caff6290907f65885077f08a';

const current = (latitude, longitude, callback) => {
    const url = `${apiUrl}/current?access_key=${apiKey}&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) return callback('unable to connect weatherstack current service.', undefined);
        if (!body.current) return callback('unable to find weather data.', undefined);
        return callback(undefined, {
            ...body.current,
            'weather_descriptions': body.current.weather_descriptions[0]
        });
    });
}

module.exports = { current };
