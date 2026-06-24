const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");


const loginDriver = async ({ email, password }) => {

    const driver = await prisma.driver.findUnique({
        where: {
            email,
        },
    });

    if (!driver) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        driver.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            driverId: driver.id,
            email: driver.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        driver: {
            id: driver.id,
            fullName: driver.fullName,
            email: driver.email,
        },
    };
};

const registerDriver = async (driverData) => {
    const existingDriver = await prisma.driver.findUnique({
        where: {
            email: driverData.email
        }
    });
    if (existingDriver) {
        throw new Error("Driver already exists");
    }
    const hashedPassword = await bcrypt.hash(
        driverData.password, 10
    )
    const driver = await prisma.driver.create({
        data: {
            fullName: driverData.fullName,
            email: driverData.email,
            phone: driverData.phone,
            password: hashedPassword,
            city: driverData.city,
            licenseNumber: driverData.licenseNumber,
        }
    })
    return {
        success: true,
        message: 'Driver Registered Successfully',
        data: {
            id: driver.id,
            fullName: driver.fullName,
            email: driver.email,
            status: driver.status,
        },
    }
}

const getProfile = async (driverId) => {

  const driver =
    await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    });

  return {
    id: driver.id,
    fullName: driver.fullName,
    email: driver.email,
    phone: driver.phone,
    status: driver.status,
  };
};

module.exports = {
    registerDriver,
    loginDriver,
    getProfile
}