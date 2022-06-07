const request = require('request');

const apiUrl = 'https://api.mapbox.com';
const apiKey = 'pk.eyJ1IjoiZGFyc2hhbnRhbmRlbCIsImEiOiJjbDJ5aXNxdWYwMTN6M2NtcWtobWJ6ejhnIn0.Nb6rBWi1uIzK34FJhWpQBQ';

const geocoding = (address, callback) => {
    const url = `${apiUrl}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) return callback('unable to connect mapbox geocoding service.', undefined);
        if (body.features.length == 0) return callback('unable to find location.', undefined);
        const [feature] = body.features;
        return callback(undefined, {
            ...feature,
            'latitude': feature.center[1],
            'longitude': feature.center[0],
            'location': feature.place_name
        });
    });
}

module.exports = { geocoding };
