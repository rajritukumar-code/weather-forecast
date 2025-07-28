const userLocation=document.getElementById("userLocation");
const converter=document.getElementById("converter");
const weatherIcon=document.querySelector(".wearher_icon");
const temperature=document.querySelector(".temperature");
const feelsLike=document.querySelector(".feelsLike");
const description=document.querySelector(".description");
const date=document.querySelector(".date");
const city=document.querySelector(".city");

const Hvalue=document.getElementById("HValue");
const Wvalue=document.getElementById("WValue");
const SRValue=document.getElementById("SRValue");
const SSValue=document.getElementById("SSValue");
const CValue=document.getElementById("CValue");
const UVValue=document.getElementById("UVValue");
const PValue=document.getElementById("PValue");

const Forecast=document.querySelector(".forecast");

// console.log(Forecast);

WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=cffbc6617b68b781354362ee2b892124&q=`;
WEATHER_DATA_ENDPOINT=`https://api.openweathermap.org/data/3.0/onecall?appid=cffbc6617b68b781354362ee2b892124&exclude=minutely&units=metric&`;

function findUserLocation(){
    Forecast.innerHTML="";
    fetch(WEATHER_API_ENDPOINT+userLocation.value)
    .then((response)=>response.json())
    .then((data)=>{
        if(data.cod!="" && data.cod!=200){
            alert(data.message);
            return;
        }
        console.log(data);
        city.innerHTML=data.name+", "+data.sys.country;
        weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
        
        fetch(WEATHER_DATA_ENDPOINT+`lon=${data.coord.lon}&lat=${data.coord.lat}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            temperature.innerHTML=data.current.temp;
            feelsLike.innerHTML="Feels like "+ data.current.feels_like;
            description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;`+data.current.weather[0].description;

            const options = {
                weekday:"long",
                month:"long",
                day:"numeric",
                hour:"numeric",
                minute:"numeric",
                hour12:true,
            }

             date.innerHTML=getLongFormateDataTime(
                data.current.dt,
                data.timezone_offset,
                options);
             
            Hvalue.innerHTML=Math.round(data.current.humidity)+"<span>%<span/>";
            Wvalue.innerHTML=Math.round(data.current.wind_speed)+"<span>m/s<span/>";

            const options1 = { 
                 hour: "numeric",
                 minute: "numeric", 
                 hour12: true,
                 };

            SRValue.innerHTML=getLongFormateDataTime(
                data.current.sunrise,
                data.timezone_offset,
                options1);

            SSValue.innerHTML=getLongFormateDataTime(
                data.current.sunset,
                data.timezone_offset,
                options1);

            CValue.innerHTML=Math.round(data.current.clouds)+"<span>%<span/>";
            UVValue.innerHTML=Math.round(data.current.uvi);
            PValue.innerHTML=Math.round(data.current.pressure)+"<span>hPa<span/>";

            console.log(data.daily);
            data.daily.forEach((weather)=>{
                let div=document.createElement("div");
                const options={
                    weekday:"long",
                    month:"long",
                    day:"numeric",
                }
                let daily=getLongFormateDataTime(weather.dt,0,options).split(" at ")
                div.innerHTML= daily[0];
                div.innerHTML+=`<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>`;
                div.innerHTML+=`<p class="forecast-disc>${weather.weather[0].discription}</p>"`;
                div.style=`height:200px;
                display:grid;
                align-items:center;
                justify-items:center;
                text-align:center;
                background-color:#78c1f3;
                border-radius:20px;
                padding:1rem;`
                Forecast.append(div);
                
            })
        })
        
    });
}
function formatUnixTime(dtValue, offSet, options={}) {
    const date = new Date((dtValue + offSet)*1000);
    return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormateDataTime(dtValue, offSet, options){
    return formatUnixTime(dtValue, offSet, options)
}