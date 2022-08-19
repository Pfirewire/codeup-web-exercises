// current goal
// Using HTML, CSS, jQuery, AJAX, and the OpenWeatherMap API, start by showing the
// current conditions for city you live in on your page.


"use strict"
$(() => {
    //
    const displayWeatherData = () => {
        let weatherData;
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            q:     "San Antonio, US",
            units: "imperial"
        }).done(data => {
            console.log(data);
            console.log(`It is ${data.main.temp} degrees Fahrenheit outside, but it feels like ${data.main.feels_like}`);
        });
    }

    displayWeatherData();


});