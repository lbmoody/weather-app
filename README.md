# weather-app
Weather-Interface with search functionality

## link
Launch Weather-Interface [Here](https://lbmoody.github.io/weather-app/)

## usage
Search for a city in the top left of the app, the city will populate in a list-group. On click of a city within the list-group a few api calls will be made against openweather. This will populate current weather for the selected city as well as a 5 day forcast that shows the weather for that city at 3pm for the next 5 days. The search functionality will default to the United States.

The app also saves the history of searched cities into localStorage. If you have searched for cities previously it will load the last searched city when the application has loaded.

## todo
 - Add functionality to load the current location if no cities have been searched previously
 - Add fuctionality to clear list of cities if the user so chooses

## screenshots

 - shows list of previously searched cities and the load of the last searched city
 - ![image](https://user-images.githubusercontent.com/24512590/71652236-395ecf80-2ce1-11ea-88d3-6dd85007ba24.png)

 - shows blank app if nothing has been previously searched (item in todos)
 - ![image](https://user-images.githubusercontent.com/24512590/71652259-6f03b880-2ce1-11ea-89d8-4dd5806f3be5.png)
