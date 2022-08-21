// current goal
// Using HTML, CSS, jQuery, AJAX, and the OpenWeatherMap API, start by showing the
// current conditions for city you live in on your page.


"use strict"
$(() => {
    // functions

    // takes in string and returns same string with the first letters of each word capitalized
    const firstLettersCapitalized = string => string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    //gets weather data from WeatherMap and displays in navbar
    const displayCurrentWeatherData = () => {
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            q:     "San Antonio, US",
            units: "imperial"
        }).done(data => {
            console.log(data);
            $("#current-icon").html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
            $("#current-weather-description").html(firstLettersCapitalized(data.weather[0].description));
            $("#current-temp").html(`${parseInt(data.main.temp)} F`);
            $("#current-feels-like").html(`Feels Like ${parseInt(data.main.feels_like)} F`);
            $("#current-humidity").html(`${data.main.humidity}% Humidity`)
        });
    }

    //find high temp from weathermap, inputting data list of 3 hour interval weather data and amount of days from today
    const highTemp = (data, day) => {
        let highTemp = 0;
        for(let i=0; i<8; i++) {
            if(highTemp < data.list[i + (day*8) - 8].main.temp_max) {
                highTemp = data.list[i + (day*8) - 8].main.temp_max;
            }
        }
        return parseInt(highTemp);
    }

    //find low temp from weathermap, inputting data list of 3 hour interval weather data and amount of days from today
    const lowTemp = (data, day) => {
        let lowTemp = 1000;
        for(let i=0; i<8; i++) {
            if(lowTemp > data.list[i + (day*8) - 8].main.temp_min) {
                lowTemp = data.list[i + (day*8) - 8].main.temp_min;
            }
        }
        return parseInt(lowTemp);
    }

    //gets forecast from WeatherMap and displays 5 day forecast on page
    const displayForecast = () => {
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: OPEN_WEATHER_APPID,
            q:     "San Antonio, US",
            units: "imperial"
        }).done(data => {
            console.log(data);
                $("#upcoming-tomorrow-card").html(`
                    <ul>
                        <li>High: ${highTemp(data, 1)}</li>
                        <li>Low: ${lowTemp(data, 1)}</li>
                        <li></li>
                    </ul>
                `);
        });
    }


    // global variables
    mapboxgl.accessToken = MAPBOX_KEY;


    // create map
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-98.48954479592629, 29.42675986019988], // starting position [lng, lat]
        zoom: 17, // starting zoom
        projection: 'globe' // display the map as a 3D globe
    });
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });




    //display weather data
    displayCurrentWeatherData();
    displayForecast();

});