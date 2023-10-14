import { useEffect, useRef, useState } from 'react'
import './App.css'
import {type User} from './types.d'
import { UsersList } from './components/UsersList';


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  
  const originalUsers = useRef<User[]>([])
  // useRef -> para guardar un valor
  // que se va a compartir entre renderizados
  // pero que al cambiar no vuelva a renderizar el componente
  
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }


  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) =>  user.email !== email)
    setUsers(filteredUsers)
  }

   useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res =>res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results 
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

        <button onClick={handleReset}>
          resetear estado
        </button>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
    </div>
  )
}

export default App
