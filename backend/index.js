require('dotenv').config()
const express = require('express')
const pool = require("./db.js")
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
   res.send("Football Training Planner API running");
})

app.get("/session", async(req, res)=>{
    try {
        const result = await pool.query(
            `SELECT * FROM training_sessions
            `

        )
        res.status(200).json(result.rows)
    } catch (error) {
        
        res.status(500).json({ error: "Failed to fetch all sessions" });
    }
})

app.post("/session", async(req, res)=>{
    try {
        const {session_date, duration_minutes, focus, notes} = req.body
        const result = await pool.query(
            `
            INSERT INTO training_sessions 
            (session_date, duration_minutes, focus, notes)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,[session_date, duration_minutes, focus, notes]
        )
        res.status(201).json(result.rows[0])

    } catch (error) {
        
        res.status(500).json({ error: "Failed to create session" });
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`URL: http://localhost:3000`)
})
 
