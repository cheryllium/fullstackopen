import CountryData from './CountryData'

const CountriesList = ({ countries, selectCountry }) => {
  if(countries.length > 10) {
    return <>Too many countries</>
  }

  if(countries.length === 1) {
    return <CountryData country={countries[0].name.official} />
  }

  return (
    <>
      {countries.map(
        c => <span key={c.name.common}>
               {c.name.common}
               <button onClick={() => selectCountry(c.name.official)}>show</button>
               <br />
             </span>
      )}
    </>
  )
}

export default CountriesList
