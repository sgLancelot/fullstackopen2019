import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({onChange}) => {
  return (
    <form>
      <div>filter shown with <input onChange={onChange} /></div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Display = ({filter}) => {
  return (
    <>
    {filter.map(x => {
      return (
        <div key={x.name}>
        {x.name} {x.number}<br/>
        </div>
      )
    })}
    </>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')        
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()      // clicking submit causes page to reload. this prevents page from reloading.
    if ((typeof persons.find(x => x.name===newName)==='undefined')){
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPersonObject))}
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 
  const handleFilterChange = (event) => {
    setFilter(persons.filter(x => x.name.toUpperCase().includes(event.target.value.toUpperCase())))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Display filter={filter} />
    </div>
  )
}

export default App