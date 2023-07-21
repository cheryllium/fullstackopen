import { useState, useEffect } from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('success')

  useEffect(() => {
    personsService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const setSuccessMessage = (message) => {
    setMessage(message)
    setStatus('success')
    setTimeout(
      () => setMessage(''), 5000
    )
  }

  const setErrorMessage = (message) => {
    setMessage(message)
    setStatus('error')
    setTimeout(
      () => setMessage(''), 5000
    )
  }
  
  const handleAddPerson = (event) => {
    event.preventDefault()

    let existing = persons.find(person => person.name === newName)
    if(existing) {
      if(existing.number !== newNumber) {
        if(window.confirm(`${existing.name} is already added to the phonebook, replace the old number with a new one?`)) {
          personsService
            .update(existing.id, { ...existing, number: newNumber })
            .then(updatedPerson => {
              setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
              setNewName('')
              setNewNumber('')

              setSuccessMessage(`Number changed for ${updatedPerson.name}`)
            })
            .catch(() => {
              setPersons(persons.filter(p => p.id !== existing.id))
              setErrorMessage(`Information of ${existing.name} has already been removed from server`)
            })
        }
      } else {
        alert(`${newName} is already added to the phone book`)
        setNewName('')
        setNewNumber('')
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService.create(newPerson)
      .then(
        createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`${createdPerson.name} added to phonebook`)
        }
      )
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} status={status} />
      
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDeletePerson} />
      
    </div>
  )
}

export default App
