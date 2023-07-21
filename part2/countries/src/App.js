import { useState, useEffect } from 'react'

import CountriesList from './components/CountriesList'
import CountryData from './components/CountryData'
import countriesService from './services/countries'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  // Load the initial countries list
  useEffect(() => {
    countriesService.getAll()
      .then(
        countriesList => {
          setCountries(countriesList)
        }
      )
  }, [])
  
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country)
  }
  
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(name.toLowerCase())
      || country.name.official.toLowerCase().includes(name.toLowerCase())
  })
  
  return (<div>
            <form>
              find countries <input value={name} onChange={handleNameChange} />
            </form>
            {selectedCountry ?
             <CountryData
               country={selectedCountry}
               selected={true}
               clearSelected={() => handleSelectCountry('')}
             /> : 
             <CountriesList
               countries={filteredCountries}
               selectCountry={handleSelectCountry}
             />
            }
          </div>)
}

export default App;
