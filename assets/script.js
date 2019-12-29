// create city array functionality, input will add the name of the city to the array
// create button to clear the city array
// clicking on a city will use then make a call against the weather api for data regarding that city.

var cityList = [];

function createCityList(){
    cityList.forEach(function(city) {
        $(".cityList").prepend($(`<button class="list-group-item list-group-item-action">${city}</button>`));
    })
}

$(".input-group").on("submit", function(e) {
    e.preventDefault();
    console.log("im here!")
    var newCity = $("#citySearchInput").val();
    cityList.push(newCity);
    createCityList();
})