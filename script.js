var searchFormEl = document.querySelector("#searchForm");
var citySearch = document.querySelector("#citySearch");

var formSubmitHandler = function(event){
    event.preventDefault();
    var city= citySearch.value.trim();

    if(city){
        getCurrentWeth(city);
        citySearch.value="";
    }else{
        alert("Please enter a City name");
    }
}

var getCurrentWeth = function(city){
    var response = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3818ca5ac2a56508daf02a0f6528796f")
        .then(function(response){
            response.json().then(function(data){
            // console.log(data);
            });
        });
};

// var get5Day = function(city){
//     var response = fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&cnt=10&appid=3818ca5ac2a56508daf02a0f6528796f")
//         .then(function(response){
//             response.json().then(function(data){
//                 console.log(data)
//             });
//         });
// }

// get5Day("charlotte")
getCurrentWeth("charlotte");
searchFormEl.addEventListener("submit", formSubmitHandler);