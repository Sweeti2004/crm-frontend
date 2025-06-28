const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail, getUserById, updatePassword,storeUserRefreshJWT } = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { crateAccessJWT, crateRefreshJWT } = require("../helpers/jwt.helper");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { setPasswordRestPin, getPinByEmailPin, deletePin } = require("../model/resetPin/ResetPin.model");
const { emailProcessor } = require("../helpers/email.helper");
const { resetPassReqValidation,updatePassValidation } = require("../middlewares/formValidation.middleware")
const{deleteJWT}=require("../helpers/redis.helper")
router.all('/', (req, res, next) => {
    next();
});

// Create new user router
router.post('/', async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;

    try {
        const hashedPass = await hashPassword(password);
        const newUserObj = {
            name,
            company,
            address,
            phone,
            email,
            password: hashedPass,
        };

        const result = await insertUser(newUserObj);
        console.log(result);
        return res.json({ message: "new user created", result });
    } catch (error) {
        console.log(error);
        return res.json({ status: "error", message: error.message });
    }
});

// User sign in router
router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid Form Submission" });
    }

    const user = await getUserByEmail(email);
    console.log(user);

    const passFromDb = user && user._id ? user.password : null;

    if (!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password!" });
    }

    const result = await comparePassword(password, passFromDb);

    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password!" });
    }

    const accessJWT = await crateAccessJWT(user.email, `${user._id}`);
    const refreshJWT = await crateRefreshJWT(user.email, `${user._id}`);

    return res.json({ status: "success", message: "Login Successfully!", accessJWT, refreshJWT });
});

// Get user profile router
router.get("/", userAuthorization, async (req, res) => {
    const _id = req.userId;
    const userProof = await getUserById(_id);
    return res.json({ user: userProof });
});

// Reset password router
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    /// crate// 2. create unique 6 digit pin
    const setPin = await setPasswordRestPin(email);
    await emailProcessor({
        email,
        pin: setPin.pin,
        type: "request-new-password"
    });



});

router.patch("/reset-password",updatePassValidation, async (req, res) => {
    const { email, pin, newPassword } = req.body;
    const getPin = await getPinByEmailPin(email, pin)
    // 2. validate pin
    if (getPin?._id) {
        const dbDate = getPin.addedAt;
        const expiresIn = 1;

        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

        const today = new Date();

        if (today > expDate) {
            return res.json({ status: "error", message: "Invalid or expired pin." });
        }
        // encrypt new password
        const hashedPass = await hashPassword(newPassword);

        const user = await updatePassword(email, hashedPass);
        if (user._id) {
            await emailProcessor({
                email,
                type: "update-password-success"
            });


            //delete the pin from db

            deletePin(email, pin)
            return res.json({
                status: "success",
                message: "Your password has been updated"
            })
        }
        res.json({
            status: "error",
            message: "Unable to update your password ,please try again later"
        })
    }
    res.json(getPin)
})

// User logout and invalidate jwts

router.delete("/logout", userAuthorization, async (req, res) => {
	const { authorization } = req.headers;
	//this data coming form database
	const _id = req.userId;

	// 2. delete accessJWT from redis database
	deleteJWT(authorization);

	// 3. delete refreshJWT from mongodb
	const result = await storeUserRefreshJWT(_id, "");

	if (result._id) {
		return res.json({ status: "success", message: "Loged out successfully" });
	}

	res.json({
		status: "error",
		message: "Unable to logg you out, plz try again later",
	});
});


module.exports = router;
