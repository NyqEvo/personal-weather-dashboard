if (localStorage.getItem('history') === null) {
    localStorage.setItem('history', JSON.stringify([]))
}
var searchHistory = JSON.parse(localStorage.getItem('history'))

var cityWeather = [{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',}
]

var cityLocation = {lat: '', lon: ''}


function displayWeather() {
    for (i = 0; i < cityWeather.length; i++) {
        $(`#day-${i + 1}`).children(".name").text(cityWeather[i].name);
        $(`#day-${i + 1}`).children(".date").text(cityWeather[i].date);
        $(`#day-${i + 1}`).children(".icon").attr('src',`http://openweathermap.org/img/wn/${cityWeather[i].icon}@2x.png`);
        $(`#day-${i + 1}`).children(".temp").text(`${cityWeather[i].temp}°`);
        $(`#day-${i + 1}`).children(".humidity").text(`Humidity: ${cityWeather[i].humidity}`);
        $(`#day-${i + 1}`).children("div.wind").text(`Wind: ${cityWeather[i].wind}`);
    }
}

function getLocation(name) {
    var name = $(this).text()
    var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=779e59dd91f874141af916bcc9211594`
    $.ajax({
        url: locationUrl,
        method: 'GET',
    }).then(function(res) {
        cityLocation.lat = res[0].lat
        cityLocation.lon = res[0].lon
        getWeather(cityLocation.lat, cityLocation.lon)
    })
}

function getWeather(lat, lon) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=537c5082f054c67490bdd35711142b24`;
    $.ajax({
        url: weatherUrl,
        method: "GET",
    }).then(function(res) {
        for (i=0; i<cityWeather.length; i++) {
            cityWeather[i].date = dayjs.unix(res.daily[i].dt).format('ddd')
            cityWeather[i].icon = res.daily[i].weather[0].icon
            cityWeather[i].temp = Math.floor(res.daily[i].temp.day)
            cityWeather[i].humidity = res.daily[i].humidity
            cityWeather[i].wind = res.daily[i].wind_speed
        }    
    }).then(displayWeather);
}

$('.preset-city').on('click', getLocation)
$('.search-button').on('submit', function(name) {
    var name = $(this).sibling('#city').val()
    var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=779e59dd91f874141af916bcc9211594`
    $.ajax({
        url: locationUrl,
        method: 'GET',
    }).then(function(res) {
        console.log(res)
        cityLocation.lat = res[0].lat
        cityLocation.lon = res[0].lon
        getWeather(cityLocation.lat, cityLocation.lon)
    })
})
