
//Element Target 

let userInput =document.getElementById('cityName');
let HeroName = document.getElementById('Name');
let cityTemp = document.getElementById('cityTemp');
let CityWeather = document.getElementById('weather');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let imgData= document.getElementById('imgData');
let leftSec = document.getElementById('left-sec');
let mainCont = document.getElementById('mainCont');
let Country = document.getElementById('country');
let maxTemp = document.getElementById('max-temp');


//Img changes after 1min

let total = 1;

setInterval(() => {

    if(total<4){
        total += 1;
       
    }
    else{
        total = 1;
    }
    leftSec.style.background = `url(Images/side${total}.jpg) no-repeat center center/cover`;
    mainCont.style.background = `url(Images/hero${total}.jpg) no-repeat center center/cover`;
   
}, 30000);

//Set Values

var setValue =(data)=>{
    HeroName.innerText = data.name;
    cityTemp.innerText =data.main.temp + '°C';
    CityWeather.innerText =data.weather[0].main;
    wind.innerText = Math.round(data.wind.speed *3.6 )  + '  km/h'  ;
    humidity.innerText =data.main.humidity+'%' ;
    imgData.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png) no-repeat center center/contain`;
    Country.innerText = data.sys.country;
    maxTemp.innerText = data.main.temp_max + '°C';
   
}

//Geolocation


 let getLocation =()=>{  navigator.geolocation.getCurrentPosition((loc)=>{
    let lat = loc.coords.latitude;
    let lon = loc.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=65907d6f94de686068c01207ea31c25d&units=metric`)
    .then((responce)=>responce.json())
    .then((data)=>{
        setValue(data);
        console.log(data)
    })
})
 }

 getLocation();

//search Location 

let searchButton = document.getElementById('search-addon').addEventListener('click',findWeather = ()=>{

    let cityName = userInput.value;
    
    var WeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=65907d6f94de686068c01207ea31c25d&units=metric`;

    fetch(WeatherApi)
    .then((responce)=>{
        return responce.json()
    }).then((data)=>{
      
        setValue(data);
        
    
    });
    
})
