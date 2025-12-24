import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";


function WeatherApp(){
    const [weather, setWeather]=useState(null);

    useEffect(()=>{
        loadInfo();
    }, [])

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ""}`;
    }, [weather])
    
    async function loadInfo(city = "london"){
        try {
            const request = await fetch(`${import.meta.env.VITE_WEATHER_URL}key=${import.meta.env.VITE_WEATHER_KEY}&q=${encodeURIComponent(city)}`
            );

            const json = await request.json();
            console.log("API RESPONSE:", json);

            if (json.error) {
                console.error("API ERROR:", json.error.message);
                return;
            }

            setWeather(json);

        } catch (error){
            console.error("FETCH ERROR:", error);
        }

    }

    function handleOnchangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return(
        <div>
            <WeatherForm onChangeCity={handleOnchangeCity} />
            <WeatherMainInfo weather={weather} />
        </div>
    )
}

export default WeatherApp;