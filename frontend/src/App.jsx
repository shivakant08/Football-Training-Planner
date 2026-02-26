import { useState,useEffect } from 'react'
import { getSessions, createSession } from './api/session'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [sessions, setSessions] = useState([])
  const [form,setForm]=useState({
  session_date: "",
  focus: "",
  duration_minutes: "",
  notes: ""
  })

  const handleChange =(e)=>{
    setForm({
      ...form, [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async()=>{
    try {
      await createSession({
        ...form,duration_minutes: parseInt(form.duration_minutes, 10)
      })
      const updatedSessions = await getSessions()
      setSessions(updatedSessions)
      setForm({
        session_date: "",
        focus: "",
        duration_minutes: "",
        notes: ""
      })
    } catch (error) {
      alert(error.message)
    }
  }

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

      <h2>Add New Session</h2>
      <input type="date" name="session_date" value={form.session_date} onChange={handleChange}/>
      <input type="text" name="focus" placeholder="Focus Area" value={form.focus} onChange={handleChange}/>
      <input type="number" name="duration_minutes" placeholder="Duration (minutes)" value={form.duration_minutes} onChange={handleChange}/>
      <input type="text" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}/>
      <button onClick={handleSubmit}>
        Add Session
      </button>
    </div>
  )
}

export default App
