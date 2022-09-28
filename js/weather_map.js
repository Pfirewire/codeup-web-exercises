// current goal
// Using HTML, CSS, jQuery, AJAX, and the OpenWeatherMap API, start by showing the
// current conditions for city you live in on your page.


"use strict"
$(() => {
    // ------------ FUNCTIONS ------------

    // takes in string and returns same string with the first letters of each word capitalized
    const firstLettersCapitalized = string => string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    // takes date string format yyyy-mm-dd and returns {month name} dd, yyyy format
    const prettyDate = dateString => {
        let month;
        switch (dateString.substring(5, 7)) {
            case "01":
                month = "January";
                break;
            case "02":
                month = "February";
                break;
            case "03":
                month = "March";
                break;
            case "04":
                month = "April";
                break;
            case "05":
                month = "May";
                break;
            case "06":
                month = "June";
                break;
            case "07":
                month = "July";
                break;
            case "08":
                month = "August";
                break;
            case "09":
                month = "September";
                break;
            case "10":
                month = "October";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "December";
                break;
        }
        return `${month} ${dateString.substring(8, dateString.length)}, ${dateString.substring(0, 4)}`;
    }

    // takes timestamp, returns readable local time string
    const localTime = timestamp => {
        let date = new Date((timestamp) * 1000);
        if (date.getHours() < 12) {
            return `${date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} AM`;
        } else {
            return `${(date.getHours()-12).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} PM`;
        }
    }

    //gets weather data from WeatherMap and displays in navbar
    const displayCurrentWeatherData = (lat, lng) => {
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            lat: lat,
            lon: lng,
            units: "imperial"
        }).done(data => {
            // console.log(data);
            $("#header-title").html(data.name);
            $("#current-icon").html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
            $("#current-weather-description").html(firstLettersCapitalized(data.weather[0].description));
            $("#current-temp").html(`${parseInt(data.main.temp)} F`);
            $("#current-feels-like").html(`Feels Like ${parseInt(data.main.feels_like)} F`);
            $("#current-humidity").html(`${data.main.humidity}% Humidity`)
        });
    }

    //find high temp from weathermap, inputting data list of 3 hour interval weather data and amount of days from today
    const highTemp = (data, day) => {
        let highTemp = -1000;
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
    const displayForecast = (lat, lng) => {
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: OPEN_WEATHER_APPID,
            lat: lat,
            lon: lng,
            units: "imperial"
        }).done(data => {
            // console.log(data);

            //adding data to "tomorrow" card
            //should include more data than the rest as it is larger
            $("#upcoming-tomorrow-card").html(`
                <div class="card-header">Tomorrow's Forecast</div> 
                <ul class="list-group list-group-flush px-2">
                    <li class="list-group-item">High: ${highTemp(data, 1)}&#8457;</li>
                    <li class="list-group-item">Low: ${lowTemp(data, 1)}&#8457;</li>
                    <li class="list-group-item"><img src="http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png"> ${firstLettersCapitalized(data.list[7].weather[0].description)}</li>
                    <li class="list-group-item">Humidity: ${data.list[7].main.humidity}%</li>
                    <li class="list-group-item">Wind: ${parseInt(data.list[7].wind.speed)} mi/hr</li>
                    <li class="list-group-item">Pressure: ${data.list[7].main.pressure} hPa</li>
                    <li class="list-group-item">Sunrise: ${localTime(data.city.sunrise)}</li>
                    <li class="list-group-item">Sunset: ${localTime(data.city.sunset)}</li>
                </ul>
            `);

            //adding data for the rest of the 5 day forecast
            //should include minimal data
            for(let i=2; i<=5; i++) {
                $(`#upcoming-${i}-card`).html(`
                    <div class="card-header">${prettyDate(data.list[i*8-1].dt_txt.substring(0, 10))}</div>
                    <ul class="list-group list-group-flush px-2">
                        <li class="list-group-item">${highTemp(data, i)}&#8457; / ${lowTemp(data, i)}&#8457;</li>
                        <li class="list-group-item"><img src="http://openweathermap.org/img/w/${data.list[i*8-1].weather[0].icon}.png"> ${firstLettersCapitalized(data.list[i*8-1].weather[0].description)}</li>
                        <li class="list-group-item">Humidity: ${data.list[i*8-1].main.humidity}%</li>
                        <li class="list-group-item">Wind: ${parseInt(data.list[i*8-1].wind.speed)} mi/hr</li>
                        <li class="list-group-item">Pressure: ${data.list[i*8-1].main.pressure} hPa</li>
                    </ul>
                `);
            }
        });
    }

    // returns longitude and latitude
    const geocode = (search, token) => {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
            .then(function(res) {
                return res.json();
            }).then(function(data) {
                return data.features[0].center;
            });
    }

    // takes address string and updates map, current weather info, and forecast cards
    const changeAddress = address => {
        geocode(address, MAPBOX_KEY).then(result => {
            map.setCenter(result);
            map.setZoom(9);
            updateMarker(result);
        });
    }

    // updates marker
    const updateMarker = coords => {
        marker.setLngLat(coords).addTo(map);
        displayCurrentWeatherData(coords[1], coords[0]);
        displayForecast(coords[1], coords[0]);
    }

    // calls updateMarker with correct lng/lat array input
    const markerDragEnd = () => {
        updateMarker([marker.getLngLat().lng, marker.getLngLat().lat]);
    }



    // ------------ GLOBAL VARIABLES ------------

    mapboxgl.accessToken = MAPBOX_KEY;

    // setting marker
    let marker = new mapboxgl.Marker({
        draggable: true
    });

    // create map centered on San Antonio
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-98.4946, 29.4252], // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: 'globe' // display the map as a 3D globe
    });
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });

    //initial display weather data in San Antonio
    changeAddress("San Antonio, Texas");

    // acts like address-btn is clicked when user hits 'enter' while selected in the input-address input box
    $("#input-address").keyup((e) => {
        if (e.keyCode === 13) {
            $("#address-btn").click();
        }
    });

    // change city to user entered city when address-btn pressed
    $("#address-btn").click(() => {
        changeAddress($("#input-address").val());
        $("#input-address").val("");
    });

    // call markerDragEnd when marker has been dragged
    marker.on("dragend", markerDragEnd);

    // calls updateMarker when user clicks on map
    map.on("click", (e) => {
        updateMarker([e.lngLat.lng, e.lngLat.lat]);
    });
});