import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

const Notification = ({message}) => {
  const notiStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
}

const ErrorNoti = ({message}) => {
  const notiStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
}

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

/*
const Display = ({filter}) => {
  const delPerson = x => {
    if (window.confirm(`Delete ${x.name}?`)){
      personService.del(x.id).catch(error => {
        console.log('fail')
      })
    } 
  }
  return (
    <>
    {filter.map(x => {
      return (
        <div key={x.name}>
        {x.name} {x.number} <button onClick={()=>delPerson(x)}>delete</button> <br/>
        </div>
      )
    })}
    </>
  )
}*/


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()      // clicking submit causes page to reload. this prevents page from reloading.
    if ((typeof persons.find(x => x.name===newName)==='undefined')){
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(newPersonObject).then(addedPerson => {
        setMessage(`Added ${newName}`)
        setTimeout(()=> {setMessage(null)},5000)
        setPersons(persons.concat(addedPerson))
      })}
    else if (persons.find(x => x.name===newName).number !== newNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const url = `http://localhost:3001/persons/${persons.find(x => x.name===newName).id}`
        const targetPerson = persons.find(x=>x.id===persons.find(x => x.name===newName).id)
        const changedPerson = {...targetPerson, number:newNumber}
        axios.put(url, changedPerson).then(response => {
          setPersons(persons.map(x=> x.id !== 7 ? x:response.data))
        })
      }
    } else {
      window.alert(`${newName} is already added to phonebook!`)
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
  const deletePerson = x => {
    if (window.confirm(`Delete ${x.name}?`)){
      personService.del(x.id).catch(error => {
        setError(`Information of ${x.name} has already been removed from server`)
      })
    } 
  }

  const rows = () => {
    return (
      <>
      {filter.map(x => {
        return (
          <div key={x.name}>
          {x.name} {x.number} <button onClick={()=>deletePerson(x)}>delete</button> <br/>
          </div>
        )
      })}
      </>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNoti message={error} />
      <Filter onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {rows()}
    </div>
  )
}

export default App