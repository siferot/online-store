const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/add", basketController.addDevice);
router.post("/update", basketController.updateDevice);
router.post("/remove", basketController.removeDevice);
router.post("/clear", basketController.clearBasket);
router.get("/", basketController.getBasket);

module.exports = router;
