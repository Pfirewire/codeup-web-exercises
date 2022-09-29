// current goal
// Using HTML, CSS, jQuery, AJAX, and the OpenWeatherMap API, start by showing the
// current conditions for city you live in on your page.


"use strict"
$(() => {

    // ------------ GLOBAL VARIABLES ------------

    // Access Token
    mapboxgl.accessToken = MAPBOX_KEY;
    // Create Map
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
    // Create Marker

    const marker = new mapboxgl.Marker({
        draggable: true
    });

    const Get = {
        forecast: (lat, lng) => {
            // Get request for forecast data
            $.get("http://api.openweathermap.org/data/2.5/forecast", {
                APPID: OPEN_WEATHER_APPID,
                lat: lat,
                lon: lng,
                units: "imperial"
            }).done(data => {
                // Print data
                Print.tomorrowCard(data);
                Print.upcomingCards(data);
            });
        },
        currentWeather: (lat, lng) => {
            $.get("http://api.openweathermap.org/data/2.5/weather", {
                APPID: OPEN_WEATHER_APPID,
                lat: lat,
                lon: lng,
                units: "imperial"
            }).done(data => {
                Print.currentNavbar(data)
            });
        },
        geocode: (search, token) => {
            // returns longitude and latitude
            let baseUrl = 'https://api.mapbox.com';
            let endPoint = '/geocoding/v5/mapbox.places/';
            return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
                .then(function(res) {
                    return res.json();
                }).then(function(data) {
                    return data.features[0].center;
                });
        }
    };

    const Print = {
        tomorrowCard: data => {
            //adding data to "tomorrow" card
            //should include more data than the rest as it is larger
            $("#upcoming-tomorrow-card").html(`
                <div class="card-header">Tomorrow's Forecast</div> 
                <ul class="list-group list-group-flush px-2">
                    <li class="list-group-item">High: ${Deduce.highTemp(data, 1)}&#8457;</li>
                    <li class="list-group-item">Low: ${Deduce.lowTemp(data, 1)}&#8457;</li>
                    <li class="list-group-item"><img src="http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png"> ${Pretty.capitalizeFirstLetters(data.list[7].weather[0].description)}</li>
                    <li class="list-group-item">Humidity: ${data.list[7].main.humidity}%</li>
                    <li class="list-group-item">Wind: ${parseInt(data.list[7].wind.speed)} mi/hr</li>
                    <li class="list-group-item">Pressure: ${data.list[7].main.pressure} hPa</li>
                    <li class="list-group-item">Sunrise: ${Pretty.time(data.city.sunrise)}</li>
                    <li class="list-group-item">Sunset: ${Pretty.time(data.city.sunset)}</li>
                </ul>
            `);
        },
        upcomingCards: data => {
            for(let i=2; i<=5; i++) {
                $(`#upcoming-${i}-card`).html(`
                    <div class="card-header">${Pretty.date(data.list[i*8-1].dt_txt.substring(0, 10))}</div>
                    <ul class="list-group list-group-flush px-2">
                        <li class="list-group-item">${Deduce.highTemp(data, i)}&#8457; / ${Deduce.lowTemp(data, i)}&#8457;</li>
                        <li class="list-group-item"><img src="http://openweathermap.org/img/w/${data.list[i*8-1].weather[0].icon}.png"> ${Pretty.capitalizeFirstLetters(data.list[i*8-1].weather[0].description)}</li>
                        <li class="list-group-item">Humidity: ${data.list[i*8-1].main.humidity}%</li>
                        <li class="list-group-item">Wind: ${parseInt(data.list[i*8-1].wind.speed)} mi/hr</li>
                        <li class="list-group-item">Pressure: ${data.list[i*8-1].main.pressure} hPa</li>
                    </ul>
                `);
            }
        },
        currentNavbar: data => {
            $("#header-title").html(data.name);
            $("#current-icon").html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
            $("#current-weather-description").html(Pretty.capitalizeFirstLetters(data.weather[0].description));
            $("#current-temp").html(`${parseInt(data.main.temp)} F`);
            $("#current-feels-like").html(`Feels Like ${parseInt(data.main.feels_like)} F`);
            $("#current-humidity").html(`${data.main.humidity}% Humidity`)
        }
    }

    const Pretty = {
        capitalizeFirstLetters: str => {
            // takes in string and returns same string with the first letters of each word capitalized
            return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        },
        date: date => {
            // takes date string format yyyy-mm-dd and returns {month name} dd, yyyy format
            let month;
            switch (date.substring(5, 7)) {
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
            return `${month} ${date.substring(8, date.length)}, ${date.substring(0, 4)}`;
        },
        time: timestamp => {
            // takes timestamp, returns readable local time string
            let date = new Date((timestamp) * 1000);
            if (date.getHours() < 12) {
                return `${date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} AM`;
            } else {
                return `${(date.getHours()-12).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} PM`;
            }
        }
    }

    const Deduce = {
        //find high temp from weathermap, inputting data list of 3 hour interval weather data and amount of days from today
        highTemp: (data, day) => {
            let highTemp = -1000;
            for(let i=0; i<8; i++) {
                if(highTemp < data.list[i + (day*8) - 8].main.temp_max) {
                    highTemp = data.list[i + (day*8) - 8].main.temp_max;
                }
            }
            return parseInt(highTemp);
        },
        lowTemp: (data, day) => {
            //find low temp from weathermap, inputting data list of 3 hour interval weather data and amount of days from today
            let lowTemp = 1000;
            for(let i=0; i<8; i++) {
                if(lowTemp > data.list[i + (day*8) - 8].main.temp_min) {
                    lowTemp = data.list[i + (day*8) - 8].main.temp_min;
                }
            }
            return parseInt(lowTemp);
        }
    }

    const User = {
        searchAddress: address => {
            // takes address string and updates map, current weather info, and forecast cards
            Get.geocode(address, MAPBOX_KEY).then(result => {
                map.setCenter(result);
                map.setZoom(9);
                MyMap.Marker.update(result);
            });
        }
    }

    const Event = {
        checkForSearch: () => {
            // acts like address-btn is clicked when user hits 'enter' while selected in the input-address input box
            $("#input-address").keyup((e) => {
                if (e.keyCode === 13) {
                    $("#address-btn").click();
                }
            });

            // change city to user entered city when address-btn pressed
            $("#address-btn").click(() => {
                User.searchAddress($("#input-address").val());
                $("#input-address").val("");
            });
        }
    }

    const MyMap = {
        Marker: {
            update: (coords, marker) => {
                // Updates marker location with coordinates
                marker.setLngLat(coords).addTo(map);
                Get.currentWeather(coords[1], coords[0]);
                Get.forecast(coords[1], coords[0]);
            },
            dragEnd: marker => {
                MyMap.Marker.update([marker.getLngLat().lng, marker.getLngLat().lat], marker);
            },
            createDraggable: () => {

                return marker;
            }
        }
    }







    //initial display weather data in San Antonio
    User.searchAddress("San Antonio, Texas");

    Event.checkForSearch();



    // call MyMap.Marker.dragEnd when marker has been dragged
    marker.on("dragend", MyMap.Marker.dragEnd(marker));

    // calls MyMap.Marker.update when user clicks on map
    map.on("click", (e) => {
        MyMap.Marker.update([e.lngLat.lng, e.lngLat.lat]);
    });
});