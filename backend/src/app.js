// backend/index.js
const express = require("express")
const cors = require("cors")
require("./db.js")
require('dotenv').config();

export const app = express()


app.use(cors())
app.use(express.json())
const mainRouter = require("./route/index.js")

app.get("/test" , (req , res) => {
    res.status(200).send("success");
})

app.use("/api/v1" , mainRouter);

const PORT = process.env.PORT || 5000;

export default app;