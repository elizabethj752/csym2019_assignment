

//to set the date, day, month, time, am-pm for the webpage 
 const timeT1 = document.getElementById('time');    //declaring a constant timeT1 feeding in the date stored at 'time'
 const dateT2 = document.getElementById('date');    //declaring a constant timeT1 feeding in the date stored at 'date'

 const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] //creating an array for days in a week
 const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; //creating an array for months in a year

 setInterval(() => {
     const time = new Date (); //creating anew variable time  for date for the browser
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
    getWeatherResults();
});


function getWeatherResults() {



    setTimeout(function(){



        $.ajax( {


            url:'weather.json',
            type:'Get',
            datatype:'json',

            success:function(res){

                var weatherInfo =  '<table><tr><th>City Name</th><th>Current Condition</th><th>Temperature</th> <th>Wind-Speed</th> <th>Wind-Direction</th> <th>Wind Chill Factor</th></tr>'; //define table
                $('#weatherData').html('');


                var forecast = res.weatherData;
//concantenating all data in tabular format
                $.each(forecast, function(index){

                    weatherInfo += '<tr><td>' + forecast[index].cityName + ' </td><td id="#currentcond">' + forecast[index].currentConditions + ' </td><td>' + forecast[index].tempeRature + ' </td><td>' + forecast[index].windSpeed + ' </td><td>' + forecast[index].windDirection + ' </td><td>' + forecast[index].windChillFac + ' </td><td>'; 
                });





                weatherInfo +='</table>';
                $('#weatherData').append(weatherInfo);
                getWeatherResults();
            },



            error:function(){
                $('#errorData').html('<p>Hi there! Sorry! We faced some problems to load the data</p>')
            }
        });
    }, 1000);
}
