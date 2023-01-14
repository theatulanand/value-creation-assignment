class ValidationService {

    validateRegistrationForm({ username, name, email, phone, age, password }) {

        if (!username || !name || !email || !phone || !age || !password) {
            const message = "All fields are required"
            return {
                status: false,
                message
            }
        }



        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const phoneRegex = /^[0-9]{10}$/;
        const usernameRegex = /^[A-Za-z0-9_]{5,}$/;


        // Check if name is not empty
        if (name === "") {
            const message = "Name must be filled out";
            return { status: false, message };
        }

        // Check if email is not empty and matches the email regex
        if (email === "" || !emailRegex.test(email)) {
            const message = "Invalid email address";
            return { status: false, message };
        }

        // Check if password is not empty, 8 characters long and contains at least one special character
        if (password === "" || !passwordRegex.test(password)) {
            const message = "Password must be at least 8 characters long and Strong for example : abc@1234";
            return { status: false, message };
        }

        // Check if mobile is not empty and matches the mobile number regex
        if (phone === "" || !phoneRegex.test(phone)) {
            const message = "Invalid phone number";
            return { status: false, message };
        }

        // Check if age is not empty and is a number
        if (age === "" || isNaN(age)) {
            const message = "Invalid age";
            return { status: false, message };
        }

        // Check if username is not empty and matches the username regex
        if (username === "" || !usernameRegex.test(username)) {
            const message = "Invalid username. It should be at least 5 characters long and can contain only alphanumeric characters and underscore";
            return { status: false, message };
        }

        return {
            status: true,
            Message: "Form are valid"
        };
    }


}

module.exports = new ValidationService();