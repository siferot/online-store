const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const basketRouter = require("./basketRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");
const rateRouter = require("./rateRouter");

router.use("/user", userRouter);
router.use("/basket", basketRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/rate", rateRouter);

module.exports = router;
