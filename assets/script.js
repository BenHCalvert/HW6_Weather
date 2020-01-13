// Set variables for API AJAX calls
const apiKey = '0457b30a523cda1e67defc7edc1045b8' ;
let uvURL = "http://api.openweathermap.org/data/2.5/uvi?APPID=" + apiKey;
let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=" +  apiKey + '&q='
let weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=" +  apiKey + '&q=';

// Set jQuery variables for DOM elements
let dispCurrentCity = $('#current-weather-title');
let dispCurrentTemp = $('#currenttemp');
let dispCurrentHum = $('#currenthum');
let dispCurrentWind = $('#currentwind');
let dispCurrentUV = $('#currentUV');

let forecastDate1 = $('#date1');
let forecastDate2 = $('#date2');
let forecastDate3 = $('#date3');
let forecastDate4 = $('#date4');
let forecastDate5 = $('#date5');

let forecastIcon1 = $('icon1');
let forecastIcon2 = $('icon2');
let forecastIcon3 = $('icon3');
let forecastIcon4 = $('icon4');
let forecastIcon5 = $('icon5');

let forecastTemp1 = $('forecastTemp1');
let forecastTemp2 = $('forecastTemp2');
let forecastTemp3 = $('forecastTemp3');
let forecastTemp4 = $('forecastTemp4');
let forecastTemp5 = $('forecastTemp5');

// search button on click WEATHER
$("#search").on('click', function () {
    event.preventDefault();
    let city = $('#cityInput').val();
    weatherAjax(city);
    forecastAjax(city);
});

// Current weather AJAX/Fx Call and UV Fx Call
function weatherAjax (city) {
    $.ajax({
        url: weatherURL + city,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        // call UV api using latlon response from weather
        uvAjax(response.coord.lat, response.coord.lon);

        // Add response to the DOM - Current Weather
        dispCurrentCity.text(`Current Weather | ${response.name}`)
        dispCurrentTemp.text(`Temperature: ${response.main.temp}°F`)
        dispCurrentHum.text(`Humidity: ${response.main.humidity}%`)
        dispCurrentWind.text(`Wind Speed: ${response.wind.speed} MPH`)
        dispCurrentUV.text(`UV Index: ${response.value}`)
    });
};

// Forecast AJAX/Fx Call
function forecastAjax (city) {
    $.ajax({
        url: forecastURL + city,
        method: "GET"
    }).then(function (response) {
        let fiveDays = response.list.filter(function(obj){
            return obj.dt_txt.split(' ')[1] === '15:00:00'
        });
        console.log(fiveDays);
    });
};

// UV AJAX
function uvAjax (lat, lon) {
    let latlon = `&lat=${lat}&lon=${lon}`
    $.ajax({
        url: uvURL + latlon,
        method: "GET"
      }).then(function (UVresponse) {
        console.log('UV response', UVresponse);
    });
};

// city history to local storage.
function storeCity(city) {
    var currentCity = $('<li>').text(city);
    currentCity.attr({type: 'button', class:'storeCity', name:city});
    $('#cities').append(currentCity);
    localStorage.setItem(city, city);
};




// **************************
// Notes:
// date_txt/dt_txt --> field in the 5 day forecast with the day and military time. Isolate the time and filter by the time. 

// .split() <-- can give this a charecter on which to split, give this a space and aplit into an array of date and time

// filter() set up a filter statement targeting the time and filter for objects with the same time, this will turn the forecast object 

