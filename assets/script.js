
const apiKey = '0457b30a523cda1e67defc7edc1045b8' ;
let uvURL = "http://api.openweathermap.org/data/2.5/uvi?APPID=" + apiKey;
let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=" +  apiKey + '&q='
let weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=" +  apiKey + '&q=';

// search button on click WEATHER
$("#search").on('click', function () {
    event.preventDefault();
    let city = $('#cityInput').val();
    weatherAjax(city);
    forecastAjax(city);
});

function weatherAjax (city) {
    $.ajax({
        url: weatherURL + city,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        // call UV api using latlon response from weather
        uvAjax(response.coord.lat, response.coord.lon);
    });
};

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

function uvAjax (lat, lon) {
    let latlon = `&lat=${lat}&lon=${lon}`
    $.ajax({
        url: uvURL + latlon,
        method: "GET"
      }).then(function (response) {
        console.log(response);
    });
}

// Call the weather API  - UV
// $("#search").on('click', function () {
//     event.preventDefault();
//     console.log("search duh");

// });

// city history to local storage.
function storeCity(city) {
    var currentCity = $('<li>').text(city);
    currentCity.attr({type: 'button', class:'storeCity', name:city});
    $('#cities').append(currentCity);
    localStorage.setItem(city, city);
};


// date_txt/dt_txt --> field in the 5 day forecast with the day and military time. Isolate the time and filter by the time. 

// .split() <-- can give this a charecter on which to split, give this a space and aplit into an array of date and time

// filter() set up a filter statement targeting the time and filter for objects with the same time, this will turn the forecast object 