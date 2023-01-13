const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const validationService = require('../services/validation.service');
const jwt = require('jsonwebtoken')

class AuthController {
    async register(req, res) {
        let { name, email, password } = req.body;

        let validation = validationService.validateRegistrationForm({ name, email, password })

        if (validation.status === false) {
            res.status(400).send(validation.message);
            return;
        }

        let user;

        try {
            user = await userService.findUser({ email });
        } catch (error) {
            console.log(error);
        }

        if (user) {
            res.status(400).send({
                "Status": 400,
                "Message": "User Already Exist"
            })

            return
        }

        try {
            password = bcrypt.hashSync(password, 1);
            await userService.createUser({ name, email, password });
            res.status(200).send({
                "Status": 200,
                "Message": "Registration Success"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                "Status": 500,
                "Message": "Error is happening from server"
            })
        }
    }

    async login(req, res) {
        let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        let { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({
                "Status": 400,
                "Message": "All fields are required"
            })
            return;
        }

        let user;

        try {
            user = await userService.findUser({ email })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                "Status": 500,
                "Message": "Error is happening from server"
            })
        }

        if (!user) {
            res.status(400).send({
                "Status": 400,
                "Message": "Invalid User or Password"
            })

            return;
        }


        if (user.email === email && bcrypt.compareSync(password, user.password)) {
            let payload = {
                name: user.name,
                email: user.email
            }
            let token = jwt.sign(payload, JWT_SECRET_KEY);
            res.status(200).send({
                "Status": 200,
                "Message": "Login Success",
                "user": payload,
                token
            })
        } else {
            res.status(400).send({
                "Status": 400,
                "Message": "Invalid Password"
            })
        }
    }
}


module.exports = new AuthController();