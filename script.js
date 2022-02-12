
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=b8ff289a4d93cdcd36219e18544e1ce2";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let results = "";
        results += '<h1>Weather in ' + json.name + "</h1>";
        for (let i = 0; i < json.weather.length; i++) {
          results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h1>' + json.main.temp + " &deg;F</h1>"
        results += '<h3>' + "Feels like: " + json.main.feels_like + " &deg;F</h3>"
        results += '<h3>' + "Low: " + json.main.temp_min + " &deg;F</h3>"
        results += '<h3>' + "High: " + json.main.temp_max + " &deg;F</h3>"
        results += '<h3>' + "Humidity: " + json.main.humidity + "%</h3>"
        results += '<h3>' + "Wind speed: " + json.wind.speed + " mph</h3>"
        results += '<h3>' + "Cloud cover: " + json.clouds.all + "%</h3>"
        results += "<p>"
        for (let i = 0; i < json.weather.length; i++) {
          results += json.weather[i].description
          if (i !== json.weather.length - 1)
            results += ", "
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
        const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=b8ff289a4d93cdcd36219e18544e1ce2";
        fetch(url2)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            let forecast = "";
            for (let i = 0; i < json.list.length; i++) {
              forecast+= "<div class='el'>"
              forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
              forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
              forecast += "<p>Feels like: " + json.list[i].main.feels_like + " &deg;F</p>";
              forecast += "<p>Low: " + json.list[i].main.temp_min + " &deg;F</p>";
              forecast += "<p>High: " + json.list[i].main.temp_max + " &deg;F</p>";
              forecast += "<p>Humidity: " + json.list[i].main.humidity + " %</p>";
              forecast += "<p>Cloudiness: " + json.list[i].clouds.all + " %</p>";
              forecast += "<p>Wind speed: " + json.list[i].wind.speed + " mph</p>";
              forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
              forecast += "</div>"
            }
        document.getElementById("forecastResults").innerHTML = forecast;
              })
      });
  })
