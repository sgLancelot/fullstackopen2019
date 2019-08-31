import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({onChange}) => {
  return (
    <form>
      <div>find countries<input onChange={onChange} /></div>
    </form>
  )
}

const CountryView = (props) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(`http://api-cdn.apixu.com/v1/current.json?key=92915f8b30ae4701838112925193108&q=${props.country.capital}`)
      .then(response => {
        setWeather({
          'temperature': response.data.current.temp_c,
          'condition': response.data.current.condition.icon,
          'windspeed': response.data.current.wind_kph,
          'winddir': response.data.current.wind_dir,})
      })
  }, [])
  return (
    <>
    <h1>{props.country.name}</h1>
    <p>capital: {props.country.capital}</p>
    <p>population: {props.country.population}</p>
    <h2>languages</h2>
    <ul>
      {props.country.languages.map(x => <li key={x.name}>{x.name}</li>)}
    </ul>
    <img src={props.country.flag} width='10%' height='10%' alt='flag'></img><br/>
    <h2>Weather in {props.country.capital}</h2>
    <b>temperature: </b> {weather.temperature}<br/>
    <img src={weather.condition} alt='weather'></img><br/>
    <b>wind: </b>{weather.windspeed} kph direction {weather.winddir}
    </>)
}

const Display = (props) => {
  if (props.filter.length > 10) {
    return <>Too many matches, specify another filter</>
  } else if (props.filter.length === 1) {
    return (
      <>
      <CountryView country={props.filter[0]} />
      </>)
  } else {
  return (
    props.filter.map(x => {return (
      <div key={x.name}>
        <form onSubmit={props.onSubmit}>
          {x.name}<button value={x.name} type='submit'>show</button>
        </form>
      </div>)})
  )}
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(countries.filter(x => x.name.toUpperCase().includes(event.target.value.toUpperCase())))
  }

  const handleShow = (event) => {
    event.preventDefault()
    setFilter(countries.filter(x => x.name.toUpperCase().includes(event.target[0].value.toUpperCase())))
  }
 
  return (
    <>
    <Filter onChange={handleFilter}/>
    <Display filter={filter} onSubmit={handleShow} />
    </>
  )
}

export default App