const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail, getUserById, updatePassword, storeUserRefreshJWT, getAllUsers, updateUserRole } = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { crateAccessJWT, crateRefreshJWT } = require("../helpers/jwt.helper");
const { userAuthorization, roleAuthorization, adminOnly } = require("../middlewares/roleAuthorization.middleware");
const { setPasswordRestPin, getPinByEmailPin, deletePin } = require("../model/resetPin/ResetPin.model");
const { emailProcessor } = require("../helpers/email.helper");
const { resetPassReqValidation, updatePassValidation } = require("../middlewares/formValidation.middleware")
const { deleteJWT } = require("../helpers/redis.helper")

/**
 * POST /user
 * Register new user (default role: client)
 */
router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !company) {
      return res.json({ status: "error", message: "Missing required fields" });
    }

    // Hash password
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPass,
      role: 'client', // Default role for new registrations
    };

    const result = await insertUser(newUserObj);
    
    res.json({ 
      status: "success", 
      message: "New user created successfully!", 
      userId: result._id 
    });
  } catch (error) {
    console.log(error);

    let message = "Unable to create new user at the moment, Please try again or contact administration!";
    if (error.message.includes("duplicate key error collection")) {
      message = "this email already has an account";
    }
    res.json({ status: "error", message });
  }
});

/**
 * POST /user/login
 * User login with email and password
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid Form Submission" });
    }

    const user = await getUserByEmail(email);

    if (!user || !user._id) {
        return res.json({ status: "error", message: "Invalid email or password!" });
    }

    if (!user.isActive) {
        return res.json({ status: "error", message: "Your account is inactive. Please contact admin." });
    }

    const passFromDb = user.password;
    const result = await comparePassword(password, passFromDb);

    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password!" });
    }

    const accessJWT = await crateAccessJWT(user.email, `${user._id}`);
    const refreshJWT = await crateRefreshJWT(user.email, `${user._id}`);

    return res.json({ 
      status: "success", 
      message: "Login Successfully!", 
      accessJWT, 
      refreshJWT,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
});

/**
 * GET /user/profile
 * Get current user profile
 */
router.get("/profile", userAuthorization, async (req, res) => {
    const _id = req.userId;
    
    try {
      const user = await getUserById(_id);
      
      if (!user) {
        return res.json({ status: "error", message: "User not found" });
      }

      const { name, email, role, company, phone, address, department, createdAt, lastLogin } = user;
      
      return res.json({ 
        status: "success",
        user: {
          _id,
          name,
          email,
          role,
          company,
          phone,
          address,
          department,
          createdAt,
          lastLogin,
        }
      });
    } catch (error) {
      return res.json({ status: "error", message: error.message });
    }
});

/**
 * GET /user (for backward compatibility)
 * Get current user basic info
 */
router.get("/", userAuthorization, async (req, res) => {
    const _id = req.userId;
    
    try {
      const userProof = await getUserById(_id);
      const { name, email, role } = userProof;
      
      return res.json({ 
        user: {
          _id,
          name,
          email,
          role,
        }
      });
    } catch (error) {
      return res.json({ status: "error", message: error.message });
    }
});

/**
 * GET /user/all
 * Get all users (Admin only)
 */
router.get("/all", adminOnly, async (req, res) => {
    try {
      const users = await getAllUsers();
      
      return res.json({
        status: "success",
        count: users.length,
        users: users.map(u => ({
          _id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          company: u.company,
          isActive: u.isActive,
          createdAt: u.createdAt,
        }))
      });
    } catch (error) {
      return res.json({ status: "error", message: error.message });
    }
});

/**
 * POST /user/create-staff
 * Create new support staff (Admin only)
 */
router.post("/create-staff", adminOnly, async (req, res) => {
  const { name, email, password, department } = req.body;

  try {
    if (!name || !email || !password) {
      return res.json({ status: "error", message: "Missing required fields" });
    }

    const hashedPass = await hashPassword(password);

    const newStaffObj = {
      name,
      email,
      password: hashedPass,
      role: 'support',
      department: department || 'General Support',
      company: 'ResolveHub Support Team',
      isActive: true,
    };

    const result = await insertUser(newStaffObj);
    
    res.json({
      status: "success",
      message: "Support staff created successfully!",
      staffId: result._id
    });
  } catch (error) {
    let message = "Unable to create support staff";
    if (error.message.includes("duplicate key error collection")) {
      message = "Email already exists";
    }
    res.json({ status: "error", message });
  }
});

/**
 * PATCH /user/:userId/role
 * Update user role (Admin only)
 */
router.patch("/:userId/role", adminOnly, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, department } = req.body;

    if (!['client', 'support', 'admin'].includes(role)) {
      return res.json({ status: "error", message: "Invalid role" });
    }

    const result = await updateUserRole(userId, role, department);

    if (result._id) {
      return res.json({
        status: "success",
        message: "User role updated successfully"
      });
    }

    res.json({ status: "error", message: "Unable to update user role" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

/**
 * POST /user/reset-password
 * Request password reset
 */

router.post("/reset-password", resetPassReqValidation, async (req, res) => {
    const { email } = req.body;

    try {
      const user = await getUserByEmail(email);

      // Create unique 6 digit pin
      const setPin = await setPasswordRestPin(email);
      await emailProcessor({
        email,
        pin: setPin.pin,
        type: "request-new-password"
      });

      return res.json({
        status: "success",
        message: "If the email is in our system, you will receive a password reset pin shortly."
      });
    } catch (error) {
      return res.json({ status: "error", message: error.message });
    }
});

/**
 * PATCH /user/reset-password
 * Update password with PIN verification
 */
router.patch("/reset-password", updatePassValidation, async (req, res) => {
    const { email, pin, newPassword } = req.body;
    
    try {
      const getPin = await getPinByEmailPin(email, pin);
      
      if (!getPin?._id) {
        return res.json({ status: "error", message: "Invalid PIN" });
      }

      // Validate pin expiry
      const dbDate = new Date(getPin.addedAt);
      const expiresIn = 1;
      let expDate = new Date(dbDate.setDate(dbDate.getDate() + expiresIn));
      const today = new Date();

      if (today > expDate) {
        return res.json({ status: "error", message: "Invalid or expired pin." });
      }

      // Hash new password
      const hashedPass = await hashPassword(newPassword);
      const user = await updatePassword(email, hashedPass);

      if (user._id) {
        await emailProcessor({
          email,
          type: "update-password-success"
        });

        // Delete the PIN from db
        await deletePin(email, pin);

        return res.json({
          status: "success",
          message: "Your password has been updated successfully"
        });
      }

      res.json({
        status: "error",
        message: "Unable to update your password, please try again later"
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
});

/**
 * DELETE /user/logout
 * User logout and invalidate JWTs
 */
router.delete("/logout", userAuthorization, async (req, res) => {
	try {
    const { authorization } = req.headers;
    const _id = req.userId;

    // Delete accessJWT from redis database
    deleteJWT(authorization);

    // Delete refreshJWT from mongodb
    const result = await storeUserRefreshJWT(_id, "");

    if (result._id) {
      return res.json({ status: "success", message: "Logged out successfully" });
    }

    res.json({
      status: "error",
      message: "Unable to log you out, please try again later",
    });
	} catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
