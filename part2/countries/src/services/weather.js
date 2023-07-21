import axios from 'axios'
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY
const baseUrl = 'http://api.openweathermap.org/data/2.5/'

const getWeather = (lat, lon) => {
  return axios
    .get(`${baseUrl}/weather`, { params: {
      lat, lon, appid: apiKey
    }})
    .then(response => response.data)
}

export default { getWeather }
