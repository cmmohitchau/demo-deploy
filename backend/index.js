// backend/index.js
const express = require("express")
const cors = require("cors")
require("./db.js")
require('dotenv').config();

const app = express()


app.use(cors())
app.use(express.json())
const mainRouter = require("./route/index.js")


app.use("/api/v1" , mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log("app is listening at port " , PORT);
})