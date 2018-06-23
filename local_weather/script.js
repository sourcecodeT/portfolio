
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    
    var data = JSON.parse(getWeatherData(lat, lon));

    // set name    
    var country = "";
    var name = "";
    
    switch (data.sys.country){
      case "VN": country = "Việt Nam"     
    }
    
    switch (data.name){
      case "Ha Noi": 
        name = "Hà Nội";
        break;
      case "Hung Yen":
        name = "Hưng Yên";
        break;
    }
    
        
    $("#location").text(country + ' --- ' + name);
    $("#fah").click(function() {
       $("#cel").removeClass("active");
       var temp = Math.round(data.main.temp * 9 / 5 + 32);
       $("#metric").text("F");
       $("#temp").text(temp);
       $("#temp-min").text(temp);
       $("#temp-max").text(temp);
    });
    $("#cel").click(function() {
       $("#metric").text("C");
       $("#temp").text(data.main.temp);
       $("#temp-min").text(data.main.temp_min);
       $("#temp-max").text(data.main.temp_max);
    });
    $("#temp").text(data.main.temp);
    $("#temp-min").text(data.main.temp_min);
    $("#temp-max").text(data.main.temp_max);
    
    $("#icon").attr("src", data.weather[0].icon);
  });
}

var date = new Date();
var dateStr = date.toLocaleString();
$("#date").text(dateStr);

function getWeatherData(lat, lon) {
  var json = "";
  $.ajax({
    url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon,
    async: false,
    type: "GET",
    dataType: "json",
    success: function(data) {
      json = JSON.stringify(data);
    }
  });
  return json;
}
