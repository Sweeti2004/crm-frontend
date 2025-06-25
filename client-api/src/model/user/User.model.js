const mongoose = require("mongoose");
const { UserSchema } = require("./User.schema");

// Insert a new user
const insertUser = async (userObj) => {
  try {
    const user = new UserSchema(userObj);
    const result = await user.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  if (!email) return null;

  try {
    const user = await UserSchema.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user by Id
const getUserById = async (_id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid ObjectId");
    }

    const data = await UserSchema.findOne({ _id });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Store refresh JWT
const storeUserRefreshJWT = async (_id, token) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid ObjectId");
    }

    const data = await UserSchema.findOneAndUpdate(
      { _id },
      {
        $set: {
          "refreshJWT.token": token,
          "refreshJWT.addedAt": Date.now(),
        },
      },
      { new: true }
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  insertUser,
  getUserByEmail,
  getUserById,
  storeUserRefreshJWT,
};
