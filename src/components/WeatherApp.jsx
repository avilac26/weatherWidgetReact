import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import styles from './weatherApp.module.css'
import Loading from "./loading";


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
            
            setTimeout(()=>{
                setWeather(json);
            }, 2000);
            

        } catch (error){
            console.error("FETCH ERROR:", error);
        }

    }

    function handleOnchangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return(
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleOnchangeCity} />
            {weather?<WeatherMainInfo weather={weather} /> : <Loading/> }
            
        </div>
    )
}

export default WeatherApp;