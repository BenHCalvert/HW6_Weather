// UV Index
var apiKey = 0457b30a523cda1e67defc7edc1045b8 ;
var cityInput = 
var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey ;
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityInput + "&units=metric&cnt=5" + APIKey;

// search button on click
$("#search").on('click', function () {
    event.preventDefault();
    console.log("search duh");
    var cityInput = $('#search-input').val();
    // cityInput = cityInput.split(' ');
    // cityInput = cityInput.join('-');
    console.log(cityInput);
});