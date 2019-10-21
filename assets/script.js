// UV Index
var apiKey = 0457b30a523cda1e67defc7edc1045b8 ;
var cityInput = cityInput.val().trim();
var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey ;
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityInput + "&units=metric&cnt=5" + APIKey;

// search button on click
$("#search").on('click', function () {
    event.preventDefault();
    console.log("search duh");
)
    $.ajax({
        url: weatherURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        console.log(weatherURL);
});

// city history to local storage.
function storeCity(city) {
    var currentCity = $('<li>').text(city);
    currentCity.attr({type: 'button', class:'storeCity', name:city});
    $('#cities').append(currentCity);
    localStorage.setItem(city, city);
};