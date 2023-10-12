import { useEffect, useState } from 'react'
import './App.css'
import {type User} from './types.d'
import { UsersList } from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);


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
    <>
      <h1>prueba tecnica</h1>
      <UsersList users={users}/>
    </>
  )
}

export default App
