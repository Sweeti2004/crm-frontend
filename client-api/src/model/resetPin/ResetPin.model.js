const mongoose = require("mongoose");
const { ResetPinSchema } = require("./ResetPin.schema");
const { randomPinNumber } = require("../../utils/randomGenerator");

// Insert a new reset pin
const setPasswordRestPin = async (email) => {
  try {
    const pinLength = 6;
    const randPin = await randomPinNumber(pinLength);

    const restObj = {
      email,
      pin: randPin,
    };

    const data = await new ResetPinSchema(restObj).save();
    return data;
  } catch (error) {
    throw error;
  }
};

// Get pin by email and pin
const getPinByEmailPin = async (email, pin) => {
  try {
    const data = await ResetPinSchema.findOne({ email, pin });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete pin by email and pin
const deletePin = async (email, pin) => {
  try {
    await ResetPinSchema.findOneAndDelete({ email, pin });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  setPasswordRestPin,
  getPinByEmailPin,
  deletePin,
};
