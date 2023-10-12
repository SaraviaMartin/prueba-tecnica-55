import { useEffect, useState } from 'react'
import './App.css'
import {type User} from './types.d'
import { UsersList } from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
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

  return (
    <div>
      <h1>prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users}/>
      </main>
    </div>
  )
}

export default App
