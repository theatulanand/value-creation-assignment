require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const authRouter = require('./routes/authentication.router');
const dbConnect = require('./database/database');

// Database Connection
dbConnect();

app.use(express.json())


// Home Page
app.get("/", (req, res) => {
    res.send("Welcome to Policy Calculator App");
})


// Auth Router
app.use(authRouter);

// Starting Server
app.listen(PORT, () => {
    console.log(`App is running at PORT : ${PORT}`);
})

