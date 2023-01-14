const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const validationService = require('../services/validation.service');
const jwt = require('jsonwebtoken');
const encryptionService = require('../services/encryption.service');

class AuthController {
    async register(req, res) {
        let { username, name, email, phone, age, password } = req.body;

        let validation = validationService.validateRegistrationForm({ username, name, phone, email, age, password })

        if (validation.status === false) {
            res.status(400).send(validation.message);
            return;
        }

        let user;

        try {
            user = await userService.findUser({ username });
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
            name = encryptionService.encrypt(name, password);
            email = encryptionService.encrypt(email, password);
            phone = encryptionService.encrypt(phone, password);
            age = encryptionService.encrypt(age, password);
            password = bcrypt.hashSync(password, 1);

            await userService.createUser({ username, name, email, phone, age, password });
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
        let { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send({
                "Status": 400,
                "Message": "All fields are required"
            })
            return;
        }

        let user;

        try {
            user = await userService.findUser({ username })
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


        if (user.username === username && bcrypt.compareSync(password, user.password)) {
            let payload = {
                name: encryptionService.decrypt(user.name, password),
                email: encryptionService.decrypt(user.email, password),
                phone: encryptionService.decrypt(user.phone, password),
                age: encryptionService.decrypt(user.age, password)
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