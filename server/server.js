require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const authRouter = require('./router/authentication.router');


// Home Page
app.get("/", (req, res) => {
    res.send("Welcome to Policy Calculator App");
})

// Auth Router
app.use(authRouter);


app.listen(PORT, () => {
    console.log(`App is running at PORT : ${PORT}`);
})

