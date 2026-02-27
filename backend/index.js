require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sessionRoutes = require("./routes/session.js")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/", sessionRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`URL: http://localhost:3000`)
})
 
