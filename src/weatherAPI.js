const dotenv = require('dotenv');
dotenv.config();
const request = require('superagent');
const apiKey = process.env.REACT_APP_WU_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getLocation = zip => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;
const getWeather = zip => `http://api.wunderground.com/api/${apiKey}/wu/astronomy/hourly/q/${zip}.json`;

function processWeatherData(data) {
    console.log(data.response);
    if (data.response.error) return { error: data.response.error.description };
    return {
        temperature: data.hourly_forecast[ 0 ].temp.english,
        condition: data.hourly_forecast[ 0 ].condition,
        windSpeed: data.hourly_forecast[ 0 ].wspd.english,
        windDir: data.hourly_forecast[ 0 ].wdir.dir,
        sunrise: data.sun_phase.sunrise.hour + ':' + data.sun_phase.sunrise.minute,
        sunset: data.sun_phase.sunset.hour + ':' + data.sun_phase.sunset.minute,
    };
}

function processLocationData(data) {
    if (data.response.error) return { error: data.response.error.description };
    return {
        city: data.current_observation.display_location.city,
        state: data.current_observation.display_location.state,
        country: data.current_observation.display_location.country,
        elevation: data.current_observation.display_location.elevation
    };
}

const get = url => request.get(url).then(res => res.body);

export default function getLocationWeather(zip) {
    return Promise.all([
        get(getWeather(zip)).then(processWeatherData),
        get(getLocation(zip)).then(processLocationData)
    ]).then(([weather, location]) => {
        return { weather, location };
    });
};