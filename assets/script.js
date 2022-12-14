var cityWeather = [{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',},
{name: '', date: '', icon: '', temp: '', humidity: '', wind: '',}
]

var cityLocation = {lat: '', lon: ''}

var searchHistory = setSearchHistory()

function setSearchHistory () {
    $('#search-history').empty()
    if (localStorage.getItem('history') === null) {
        localStorage.setItem('history', JSON.stringify([]))
    }
    var recentSearchHistory = JSON.parse(localStorage.getItem('history'))
    for (i=0; i < recentSearchHistory.length; i++) {
        $('#search-history').append(`<li>${recentSearchHistory[i]}</li>`)
    }
    localStorage.setItem('history', JSON.stringify(recentSearchHistory))
    return recentSearchHistory
}

function displayWeather() {
    $('.col-2').attr('style', 'visibility:visible')
    for (i = 0; i < cityWeather.length; i++) {
        $(`#city-name`).html(`<h3>${cityWeather[0].name}</h3>`)
        $(`#day-${i + 1}`).children(".date").text(cityWeather[i].date);
        $(`#day-${i + 1}`).children(".icon").attr('src',`http://openweathermap.org/img/wn/${cityWeather[i].icon}@2x.png`);
        $(`#day-${i + 1}`).children(".temp").text(`${cityWeather[i].temp}°`);
        $(`#day-${i + 1}`).children(".humidity").text(`Humidity: ${cityWeather[i].humidity}`);
        $(`#day-${i + 1}`).children("div.wind").text(`Wind: ${cityWeather[i].wind}`);
    }
    setSearchHistory()
}

function getLocation(event, name) {
    event.preventDefault();
    console.log('my click works for preset')
    var name = $(this).text()
    if (searchHistory.length > 4) {
        searchHistory.pop();
        searchHistory.unshift(name)
    } else {
        searchHistory.unshift(name)
    }
    localStorage.setItem('history', JSON.stringify(searchHistory))
    console.log(name)
    var locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=779e59dd91f874141af916bcc9211594`
    console.log(locationUrl)
    $.ajax({
        url: locationUrl,
        method: 'GET',
    }).then(function(res) {
        cityWeather[0].name = name
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

$('.search-button').on('click', function(event) {
    event.preventDefault();
    var isThisTheForm = $(this).parent().children()[0].value;
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    searchHistory.unshift(isThisTheForm)
    localStorage.setItem('history', JSON.stringify(searchHistory))
    console.log(isThisTheForm)
    console.log('ssearch button clicked')
    var locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${isThisTheForm}&appid=779e59dd91f874141af916bcc9211594`
    console.log(locationUrl)
    $.ajax({
        url: locationUrl,
        method: 'GET',
    }).then(function(res) {
        console.log(res)
        cityWeather[0].name = isThisTheForm
        cityLocation.lat = res[0].lat
        cityLocation.lon = res[0].lon
        getWeather(cityLocation.lat, cityLocation.lon)
    })
})