var searchFormEl = document.querySelector("#searchForm");
var citySearch = document.querySelector("#citySearch");
var currentCityEl = document.getElementById("currentCity");
var currentWeatherEl = document.getElementById("currentWeather");
var fiveDayEl= document.querySelector(".fiveDay");
var cityListEl = document.getElementById("cityList");
var cityListArr = JSON.parse(localStorage.getItem("citylist")) || [];

var formSubmitHandler = function(event){
    event.preventDefault();
    var city= citySearch.value.trim();

    if(city){
        getCurrentWeth(city);
        cityList(city);
        citySearch.value="";
    }else{
        alert("Please enter a City name");
    }
}

var cityList = function(city){
    if(cityListArr.includes(city)===false){
        var cityBtn = document.createElement("button");
        cityBtn.classList.add("m-1", "bg-secondary")
        cityBtn.textContent = city;
    
        cityListEl.append(cityBtn);
        cityListArr.push(city);
        localStorage.setItem("citylist", JSON.stringify(cityListArr));
        console.log(cityListArr);
    };
};

console.log(cityListArr);
var displayCityList = function(){
    for(var i=0; i<cityListArr.length; i++){
        var cityBtn = document.createElement("button");
        cityBtn.classList.add("m-1", "bg-secondary")
        cityBtn.textContent = cityListArr[i];

        cityListEl.append(cityBtn)
    }
}

var getCurrentWeth = function(city){
    var response = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=3818ca5ac2a56508daf02a0f6528796f")
        .then(function(response){
            response.json().then(function(data){
            displayCurrent(data);
            });
        });
};


var get5Day = function(lat,lon){
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly,alerts&appid=3818ca5ac2a56508daf02a0f6528796f")
        .then(function(response){
            response.json().then(function(data){
                // console.log(data);
                display5Day(data);
            });
        });
              
};

var displayCurrent = function(weather){
    currentWeatherEl.textContent="";
    currentWeatherEl.classList.add("border", "p-2", "m-1")

    var currentCity= document.createElement("h2");
    currentCity.innerHTML=weather.name + " "+moment().format("(MM/DD/YYYY)");

    var icon = weather.weather[0].icon;
    var iconImage= document.createElement("img");
    iconImage.setAttribute("src", "http://openweathermap.org/img/wn/" +icon+ ".png");
    iconImage.className="iconImage";
    currentCity.appendChild(iconImage);
    
    var temp = document.createElement("p");
    temp.textContent="Temp: " + weather.main.temp +" "+String.fromCharCode(176)+"F";

    var wind=document.createElement("p");
    wind.textContent="Wind: "+ weather.wind.speed + " MPH";

    var humidity = document.createElement("p");
    humidity.textContent= "Humidity: " + weather.main.humidity +"%";

    var lat=weather.coord.lat;
    var lon = weather.coord.lon;
    get5Day(lat,lon);
    
    currentWeatherEl.append(currentCity,temp,wind,humidity);
};

var display5Day = function(forcast){
    console.log(forcast);
    fiveDayEl.textContent="";
    fiveDayEl.classList.add("m-1")
    var dayTracker = 1;

    var uv = document.createElement("p");
    uv.textContent= "UV Index: ";

    var uvi=document.createElement("span");
    uvi.textContent=forcast.current.uvi;
    
    if(uvi.textContent < 2){
        uvi.className ="bg-success";
    } else if(uvi.textContent >= 2 && uvi.textContent < 5){
        uvi.className="bg-warning"
    } else {
        uvi.className="bg-danger"
    };
    
    uv.appendChild(uvi);
    currentWeatherEl.append(uv);

    var dailyforcast = document.createElement("h3");
    dailyforcast.className="col-12"
    dailyforcast.textContent="Look Ahead:";
    fiveDayEl.append(dailyforcast);

    for(var i=1; i<6; i++){
        var fiveDayForcast = forcast.daily[i];
        var icon = fiveDayForcast.weather[0].icon;

        var container = document.createElement("div");
        container.classList.add("col-2","d-flex", "flex-column", "bg-secondary", "p-1", "m-1", "text-light");

        var date= document.createElement("p")
        date.textContent= moment().add(dayTracker, "days").format("(MM/DD/YYYY)");

        var iconImg = document.createElement("img");
        iconImg.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
        iconImg.className="iconImage";

        var temp=document.createElement("p");
        temp.textContent= "Temp: " + fiveDayForcast.temp.day+ " " + String.fromCharCode(176)+"F";

        var wind=document.createElement("p");
        wind.textContent="Wind: "+ fiveDayForcast.wind_speed + " MPH";

        var humidity = document.createElement("p");
        humidity.textContent= "Humidity: " + fiveDayForcast.humidity +"%";

        container.append(date, iconImg, temp, wind, humidity);
        fiveDayEl.append(container);
        dayTracker++;
    }
};

displayCityList();
searchFormEl.addEventListener("submit", formSubmitHandler);
cityListEl.addEventListener("click", function(event){
    var city = event.target.textContent
    getCurrentWeth(city);
    // console.log("Hello");
});