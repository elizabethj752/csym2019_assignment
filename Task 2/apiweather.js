//to set the date, day, month, time, am-pm for the webpage 
const timeT1 = document.getElementById('time');    //declaring a constant timeT1 feeding in the date stored at 'time'
const dateT2 = document.getElementById('date');    //declaring a constant timeT1 feeding in the date stored at 'date'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] //creating an array for days in a week
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; //creating an array for months in a year

setInterval(() => {
    const time = new Date ();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour =time.getHours();
   const hoursIn12HrFormat = hour >= 13 ? hour %12: hour //conversion for time
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
   
    timeT1.innerHTML = (hoursIn12HrFormat < 10? '0'+ hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+ minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    dateT2.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);






$(document).ready(function() {
     $('#countryName').change(function() {
     $('#city').load($(this).val() + '-cities' + '.html');
         $('#city').change(function() {
             var cityValue = $(this).val();
             var responseStatus = 'success';
             getData(cityValue);
         });
     });
 });

 function getData(cityValue) {
     $.ajax({
         url: 'http://api.openweathermap.org/data/2.5/weather?id=' + cityValue + '&appid=d69f32eef7fe49bedc09889779abecd0',
         type: 'GET',
         dataType: 'json',
         success: function(res) {
         
             //display the chosen city from the requested data
             $('#cityInfo').empty().append( res.name );
             //display the city name div after the user choose country and city

             $('#weatherData').empty().append(
                 'Weather Conditions: ' + res.weather[0].main + '</br>' +
                 'Temperature :' + convtoCel(res.main.temp) + '</br>' +
                 'Wind Speed :' + convtoMPH(res.wind.speed) + '</br>' +
                 'Wind Direction: ' + convtodirection(res.wind.deg));
             
         },
         error: function() {
             $('#errorData').html('<p>Hi there! Sorry! We faced some problems to load the data</p>');
             
         }
     });
 }

 //convert temperature in kelvin to Celsius.
 function convtoCel(kelvin) {
     var tempeRatureinCel = Math.round(kelvin - 273.15);
     return tempeRatureinCel + '°C';
 }

 //converts speed from knots to miles per hour(mph)
 function convtoMPH(knots) {
     var speedMPH = Math.round(knots * 1.15077945); //1 Knot = 1.15077945 mph
     return speedMPH + ' mph';
 }

 
//convert the wind direction from degree to textual description.
function  convtodirection(degree){
var windDirection = ['Northerly','North Easterly',
'Easterly','South Easterly','Southerly','South Westerly',
'Westerly','North Westerly'];
  degree += 22.5;
  var w = parseInt(degree / 45);
  return windDirection[w%8];
}
