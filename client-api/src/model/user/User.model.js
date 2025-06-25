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


const storeUserRefreshJWT = (_id, token) => {  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id },
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
  storeUserRefreshJWT,
};
