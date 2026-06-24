const getDrivers = (req, res) => {
    res.json({
        success: true,
        data: [],
    });
};

const driverService = require("../services/driver.service.js");

const registerDriver = async (req, res) => {
    try {
        const result = await driverService.registerDriver(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};

const loginDriver = async (req, res) => {
    try {

        const { email, password } = req.body;

        const result =
            await driverService.loginDriver({
                email,
                password,
            });

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const getProfile = async (req, res) => {

  const profile =
    await driverService.getProfile(
      req.driver.driverId
    );

  return res.json({
    success: true,
    data: profile,
  });
};

module.exports = {
    getDrivers,
    registerDriver,
    loginDriver,
    getProfile
};