require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const authRouter = require('./routes/authentication.router');
const policyRouter = require('./routes/policy.router');
const verifyJWT = require('./middlewares/verifyJwtToken.middleware')
const dbConnect = require('./database/database');

// Database Connection
dbConnect();

app.use(cors());

app.use(express.json())


// Home Page
app.get("/", (req, res) => {
    res.send("Welcome to Policy Calculator App");
})


// Auth Router
app.use(authRouter);
app.use(verifyJWT);
app.use(policyRouter)

// Starting Server
app.listen(PORT, () => {
    console.log(`App is running at PORT : ${PORT}`);
})

