const express = require("express");
const authMiddleware =
    require("../middlewares/auth.middleware");
const { getDrivers, registerDriver, loginDriver, getProfile } = require("../controllers/driver.controller.js");

const router = express.Router();


router.get("/", getDrivers);
router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

module.exports = router;