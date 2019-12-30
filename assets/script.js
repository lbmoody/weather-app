// create city array functionality, input will add the name of the city to the array
// create button to clear the city array
// clicking on a city will use then make a call against the weather api for data regarding that city.
// add cityList to localStorage
// add button to remove from local storage
// add functionality to pull current location weather?


var cityList = [];


function createCityList(){
    $(".cityList").empty();
    cityList.forEach(function(city) {
        $(".cityList").prepend($(`<button class="list-group-item list-group-item-action cityButton" data-city="${city}">${city}</button>`));
    })
}

function getUVI(id, cityLat, cityLong) {
    var uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLong}&appid=${id}`;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (data) {
        $(".cityToday").append(`<p>UV Index: <span class="badge badge-danger p-2">${data.value}</span></p>`);
        console.log("UV Data", data);
    })
}

function getCityWeather() {
    var thisCity = $(this).attr("data-city");
    var id = "5859ec0dbfd9ff0a36abca355158892e";
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${thisCity}&units=imperial&appid=${id}`;
    var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${thisCity}&units=imperial&appid=${id}`;
    
    var cityLat;
    var cityLong;

    $(".cityToday").empty();
    
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(data) {
        $(".cityToday").append(`<h3>${data.name} (${new Date(1000 * data.dt).toLocaleString().slice(0, 10)})</h3>`)
        $(".cityToday").append(`<p>Temperature: ${data.main.temp} &degF</p>`)
        $(".cityToday").append(`<p>Humidity: ${data.main.humidity} %</p>`)
        $(".cityToday").append(`<p>Wind: ${data.wind.speed} mph</p>`)
        console.log("Current Weather:", data);
        cityLat = data.coord.lat;
        cityLong = data.coord.lon;
        getUVI(id, cityLat, cityLong);
    })
    
    $.ajax({
        url: forcastURL, 
        method: "GET"
    }).then(function(data) {
        console.log("Forcast Weather", data);
        
    })
    
}

$("form").on("submit", function(event) {
    event.preventDefault();
    console.log("im here!")
    var newCity = $("#citySearchInput").val().trim();
    cityList.push(newCity);
    createCityList();
    $("#citySearchInput").val("");
})

$(".cityList").on("click", ".cityButton", getCityWeather);