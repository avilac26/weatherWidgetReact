
function WeatherMainInfo({weather}){
    return(
        <div>
            <div>
                <p>{weather?.location.name}</p>
                <p>{weather?.location.country}</p>
                <div>
                    <img src={`http:${weather?.current.condition.icon}`} 
                    width="128" 
                    alt={weather?.current.condition.icon}/>
                </div>
                <div>
                    <div>
                        <p>{weather?.current.condition.text}</p>
                        <p>{weather?.current.temp_c}°C</p>
                    </div>
                    
                </div>
            </div>
            <div>
                <div>
                    <iframe 
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62879.45510818271!2d${weather?.location.lon}6!3d${weather?.location.lat}7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scr!4v1766544227571!5m2!1ses-419!2scr`}
                    width="600" 
                    height="450" 
                    style={{border:0}}
                    allowfullscreen 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    )
}


export default WeatherMainInfo;