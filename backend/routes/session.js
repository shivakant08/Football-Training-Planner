const express = require('express')
const router = express.Router()
const pool = require("../db.js")

//Example route
// router.get('/', (req, res)=>{
//    res.send("Football Training Planner API running");
// })

//Post a session
router.post("/session", async(req, res)=>{
    try {
        const {session_date, duration_minutes, focus, notes} = req.body

        if(!session_date || !duration_minutes || !focus || !notes){
            return res.status(400).json({error:"Missing required fileds"})
        }

        if(duration_minutes <= 0){
            return res.status(400).json({error:"Duration must be greater than zero"})
        }
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

//Get all sessions
router.get("/session", async(req, res)=>{
    try {
        const result = await pool.query(
            `SELECT * FROM training_sessions
            `)
        res.status(200).json(result.rows)
    } catch (error) {
        
        res.status(500).json({ error: "Failed to fetch all sessions" });
    }
})

//Update a session
router.put("/session/:id", async(req,res)=>{
    const {id} = req.params
    const {duration_minutes, focus, notes} = req.body
    
    if(duration_minutes && duration_minutes <= 0){
        return res.status(400).json({error:"Duration must be greater than zero"})
    }
    try {
        const result = await pool.query(
            `UPDATE training_sessions
            SET duration_minutes = COALESCE($1, duration_minutes),
            focus = COALESCE($2, focus),
            notes = COALESCE($3, notes)
            WHERE id= $4
            RETURNING *`,
            [duration_minutes, focus, notes, id]
        )

        if(result.rows.length === 0){
            return res.status(404).json({error: "Session not found"})
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Failed to update session"})
    }
})

//Delete a session
router.delete("/session/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query(
            "DELETE FROM training_sessions WHERE id = $1 RETURNING *",[id]
        )
        if(result.rows.length === 0){
            return res.status(404).json({error:"Session not found"})
        }
        res.status(204).send()
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to delete session"})
    }
})

module.exports = router