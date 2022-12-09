if (localStorage.getItem('history') === null) {
    localStorage.setItem('history', JSON.stringify([]))
}
var searchHistory = JSON.parse(localStorage.getItem('history'))

var cityWeather = [{
    name: '', date: '', icon: '', temp: '', humidity: '', wind: '',
},
{
    name: '', date: '', icon: '', temp: '', humidity: '', wind: '',
},
{
    name: '', date: '', icon: '', temp: '', humidity: '', wind: '',
},
{
    name: '', date: '', icon: '', temp: '', humidity: '', wind: '',
},
{
    name: '', date: '', icon: '', temp: '', humidity: '', wind: '',
},
{
    name: '', date: '', icon: '', temp: '', humidity: '', wind: '',
}
]

function getWeather(name) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=imperial&appid=779e59dd91f874141af916bcc9211594`;
    console.log(name);
    $.ajax({
        url: weatherUrl,
        method: "GET",
    }).then(function (res) {
        for (i = 0; i < cityWeather.length; i++) {
            cityWeather[i].date = res.list[i].dt_txt;
            cityWeather[i].temp = res.list[i].main.temp;
            cityWeather[i].icon = res.list[i].weather[0].icon;
            cityWeather[i].wind = res.list[i].wind.speed;
            cityWeather[i].humidity = res.list[i].main.humidity;
        }
    })
    displayWeather();
}

function displayWeather() {
    for (i = 0; i < cityWeather.length; i++) {
        $(`#day-${i + 1}`).children("div.name").text(cityWeather[i].name);
        $(`#day-${i + 1}`).children("div.date").text(cityWeather[i].date);
        $(`#day-${i + 1}`).children("div.icon").text(cityWeather[i].icon);
        $(`#day-${i + 1}`).children("div.temp").text(cityWeather[i].temp);
        $(`#day-${i + 1}`).children("div.humidity").text(cityWeather[i].humidity);
        $(`#day-${i + 1}`).children("div.wind").text(cityWeather[i].wind);
    }
}

// $('.preset-city').on('click', getWeather($(this).text()))
getWeather('atlanta');
console.log(cityWeather);