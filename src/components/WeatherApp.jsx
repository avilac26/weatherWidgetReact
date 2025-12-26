import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import styles from './weatherApp.module.css'
import Loading from "./loading";


function WeatherApp(){
    const [weather, setWeather]=useState(null);
    const [error, setError]=useState(null);

    useEffect(()=>{
        loadInfo();
    }, [])

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ""}`;
    }, [weather])
    
    async function loadInfo(city = "london"){
        setError(null);
        try {
            const request = await fetch(`${import.meta.env.VITE_WEATHER_URL}key=${import.meta.env.VITE_WEATHER_KEY}&q=${encodeURIComponent(city)}`
            );

            const json = await request.json();

            if (json.error) {
            setError(json.error.message);
            setWeather(null);
            return;
            }
            
            setTimeout(()=>{
                setWeather(json);
            }, 2000);
            

        } catch (error) {
            setError("Error al conectar con el servidor");
            setWeather(null);
        }

    }

    function handleOnchangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return(
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleOnchangeCity} />
            {error && <p className={styles.error}>{error}</p>}
            {!error && (weather ? <WeatherMainInfo weather={weather} /> : <Loading />)}
            
        </div>
    )
}

export default WeatherApp;