import { useState, useEffect } from 'react'
import countryService from '../services/countries'
import weatherService from '../services/weather'

const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    weatherService.getWeather(lat, lon).then(
      data => {
        setWeather(data)
      }
    )
  }, [])

  if(!weather) {
    return null
  }

  return (
    <div>
      temperature {weather.main.temp - 273.15} Celsius<br />
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /><br />
      wind {weather.wind.speed} m/s<br />
    </div>
  )
}

const CountryData = ({ country, selected, clearSelected }) => {
  const [countryData, setCountryData] = useState(null)
  
  // Get data for the country after first render
  useEffect(() => {
    countryService.getCountry(country)
      .then(data => {
        setCountryData(data)
      })
  }, [])

  // Don't render anything on initial render (before country data is populated)
  if(!countryData) {
    return null
  }

  // Render the data for the country
  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>
        Capital {countryData.capital[0]}<br />
        Area {countryData.area}
      </p>

      <h2>languages</h2>
      <ul>
        {Object.entries(countryData.languages).map(
          l => <li key={l[1]}>{l[1]}</li>
        )}
      </ul>

      <h1 className="flag">{countryData.flag}</h1>

      <Weather lat={countryData.latlng[0]} lon={countryData.latlng[1]} />
      
      {selected
       && <div>
            <button onClick={clearSelected}>Go back</button>
          </div>}
    </div>
  )
  
}

export default CountryData
