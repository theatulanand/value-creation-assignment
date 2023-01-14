const router = require('express').Router();
const policyController = require('../controllers/policy.controller');

router.post('/generateIllustration', policyController.generateIllustration)

router.get('/getIllustration', policyController.getIllustration)


module.exports = router;