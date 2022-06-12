const Router = require('express')
const router = new Router()
const rateController = require('../controllers/rateController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', rateController.create)
router.get('/', rateController.get)

module.exports = router