const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6c4ca56cd9846333234abba9fb72cdf7&query=${longitude},${latitude}&units=m`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to Connect with the local service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // let data = {
            //     temperature: response.body.current.temperature,
            //     feelsLike: response.body.current.feelslike,
            //     weatherdescription: response.body.current.weather_descriptions[0]
            // }
            let data = `${body.current.weather_descriptions[0]} through out the day. it is currently ${body.current.temperature} and it feels like ${body.current.feelslike}`;
            callback(undefined, data);
        }
    })
}

module.exports = forecast;