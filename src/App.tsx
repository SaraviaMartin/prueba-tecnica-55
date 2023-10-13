import { useEffect, useState } from 'react'
import './App.css'
import {type User} from './types.d'
import { UsersList } from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

   useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res =>res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.log(err)
      })
   }, []) 

   const sortedUsers = sortByCountry 
   ? users.toSorted((a,b) => {
    return a.location.country.localeCompare(b.location.country)
   }) : users

  return (
    <div>
      <h1>prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por pais' : 'Ordenar Por Pais'}
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={sortedUsers}/>
      </main>
    </div>
  )
}

export default App
