// create button to clear the city array
// add cityList to localStorage
// add functionality to pull current location weather if no current city selected?


var cityList = [];

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

function createCityList(){
    $(".cityList").empty();
    cityList.forEach(function(city) {
        $(".cityList").prepend($(`<button class="list-group-item list-group-item-action cityButton" data-city="${city}">${city}</button>`));
    })
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cityList = storedCities;
    }

    createCityList();

    if (cityList != []) {

    }
}

// function getWeather() {

// }

// function getForcast() {
    
// }

function getUVI(id, cityLat, cityLong) {
    var uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLong}&appid=${id}`;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (data) {
        $(".cityToday").append(`<p>UV Index: <span class="badge badge-danger p-2">${data.value}</span></p>`);
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
        $(".cityToday").append(
            `<div class="row ml-1">
                <h3 class="mr-3">${data.name} (${(new Date(1000 * data.dt).getUTCMonth()) + 1}/${(new Date(1000 * data.dt).getUTCDate()) - 1}/${new Date(1000 * data.dt).getUTCFullYear()})</h3>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
            </div>`
        )
        $(".cityToday").append(`<p>Temperature: ${data.main.temp} &degF</p>`)
        $(".cityToday").append(`<p>Humidity: ${data.main.humidity} %</p>`)
        $(".cityToday").append(`<p>Wind: ${data.wind.speed} mph</p>`)
        cityLat = data.coord.lat;
        cityLong = data.coord.lon;
        getUVI(id, cityLat, cityLong);
    })
    
    $(".forcast").empty();

    $.ajax({
        url: forcastURL, 
        method: "GET"
    }).then(function(data) {
        for(i = 0; i < data.list.length; i ++) {
            if (data.list[i].dt_txt.search("15:00:00") != -1) {
                var forcastDate = data.list[i];
                $(".forcast").append(
                    `<div class="card bg-primary shadow m-4">
                        <div class="card-body">
                            <h4 class="card-title">${(new Date(1000 * forcastDate.dt).getUTCMonth()) + 1}/${new Date(1000 * forcastDate.dt).getUTCDate()}/${new Date(1000 * forcastDate.dt).getUTCFullYear()}</h4>
                            <div class="card-text">
                                <img src="http://openweathermap.org/img/w/${forcastDate.weather[0].icon}.png">
                                <p class="card-text">Temp: ${forcastDate.main.temp} &degF</p>
                                <p class="card-text">Humidity: ${forcastDate.main.humidity} %</p>
                            </div>
                        </div>
                    </div>`
                );
            }
        }
        
    })
    
}

init();

$("form").on("submit", function(event) {
    event.preventDefault();
    console.log("im here!")
    var newCity = $("#citySearchInput").val().trim();
    cityList.push(newCity);
    createCityList();
    storeCities();
    $("#citySearchInput").val("");
})

$(".cityList").on("click", ".cityButton", getCityWeather);


console.log(cityList[cityList.length - 1]);
