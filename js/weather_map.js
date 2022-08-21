// current goal
// Using HTML, CSS, jQuery, AJAX, and the OpenWeatherMap API, start by showing the
// current conditions for city you live in on your page.


"use strict"
$(() => {
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

    //
    const displayCurrentWeatherData = () => {
        let weatherData;
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            q:     "San Antonio, US",
            units: "imperial"
        }).done(data => {
            console.log(data);
            $("#current-icon").html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
            console.log(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
        });
    }

    displayCurrentWeatherData();


});

//