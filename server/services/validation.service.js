class ValidationService {

    validateRegistrationForm({ name, email, password }) {

        if (!name || !email || !password) {
            const message = "All fields are required"
            return {
                status: false,
                message
            }
        }


        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        // Check if name is not empty
        if (name === "") {
            const message = "Name must be filled out";
            return { status: false, message };
        }


        if (email === "" || !emailRegex.test(email)) {
            const message = "Invalid email address";
            return { status: false, message };
        }


        if (password === "" || !passwordRegex.test(password)) {
            const message = "Password must be at least 8 characters long and Strong for example : abc@1234";
            return { status: false, message };
        }

        return {
            status: true,
            Message: "Form are valid"
        };
    }


}

module.exports = new ValidationService();