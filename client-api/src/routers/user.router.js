const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail, getUserById } = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { crateAccessJWT, crateRefreshJWT } = require("../helpers/jwt.helper");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { setPasswordRestPin } = require("../model/resetPin/ResetPin.model");
const { emailProcessor } = require("../helpers/email.helper");

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
router.post("/reset-password",  async (req, res) => {
	const { email } = req.body;

	const user = await getUserByEmail(email);

	if (user && user._id) {
		/// crate// 2. create unique 6 digit pin
		const setPin = await setPasswordRestPin(email);
		await emailProcessor({
			email,
			pin: setPin.pin,
			
		});
	}

	res.json({
		status: "success",
		message:
			"If the email is exist in our database, the password reset pin will be sent shortly.",
	});
});

module.exports = router;
