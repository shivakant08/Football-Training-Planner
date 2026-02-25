import { useState,useEffect } from 'react'
import { getSessions } from './api/session'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [sessions, setSessions] = useState([])
  useEffect(()=>{
    getSessions().then(setSessions)
  },[])

  return (
    <div style={{padding: "20px"}}>
      <h1>Football Training Planner</h1>
      <ul>
        {sessions.map((session)=>(
          <li key={session.id}>
            <strong>{session.session_date}</strong> - {session.focus} ({session.duration_minutes} mins)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
