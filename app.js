//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+ "/index.html");


});

app.post("/", function(req, res){

  const city= req.body.cityName;
  // console.log(city);
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0ae641f77acb9ec2f93f6efd497a7181&units=metric";

  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in "+city+" is " + temp + " degree Celcius</h1>");
      res.write("<p> The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + imgURL + "> ");

    });

  });

});

app.listen(3000, function() {
  console.log("server running on port 3000");
});
