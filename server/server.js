require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Policy Calculator App");
})


app.listen(PORT, () => {
    console.log(`App is running at PORT : ${PORT}`);
})

