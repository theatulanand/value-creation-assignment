const { validatePolicyForm } = require("../services/validation.service");

class PolicyController {
    async generateIllustration(req, res) {
        const { pt, ppt, premiumFrequency, modelPremium, sumAssured, dob } = req.body;
        //console.log(req.body);
        let validation = validatePolicyForm({ pt, ppt, premiumFrequency, modelPremium, sumAssured, dob });

        if (validation.status === false) {
            res.status(400).send(validation.message);
            return;
        }

        //console.log(validation);

        res.status(200).send("All data are valid");

        //console.log(pt, ppt, premiumFrequency, modelPremium, sumAssured, dob);
    }

    async getIllustration(req, res) {
        res.send("Hello Atul")
    }
}

module.exports = new PolicyController();