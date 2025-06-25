const express = require("express")
const router = express.Router()
const { insertUser, getUserByEmail,getUserById} = require("../model/user/User.model")
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper")
const { crateAccessJWT, crateRefreshJWT } = require("../helpers/jwt.helper")
const {userAuthorization}=require("../middlewares/authorization.middleware")
router.all('/', (req, res, next) => {

    // res.json({message: "Return from user router"})
    next();
})
//Create new user router
router.post('/', async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;
    try {
        //hash password
        const hashedPass = await hashPassword(password)
        const newUserObj = {
            name,
            company,
            address,
            phone,
            email,
            password: hashedPass,
        }
        const result = await insertUser(newUserObj)
        console.log(result);
        res.json({ message: "new user created", result })
    } catch (error) {
        console.log(error)
        res.json({ status: "error", message: error.message })

    }


});
//User sign in router
router.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    //hash our pass and comare with db one
    if (!email || !password) {
        res.json({ status: "error", message: "Invalid Form Submission" })
    }
    //get user with email from db
    const user = await getUserByEmail(email)
    console.log(user)
    const passFromDb = user && user._id ? user.password : null
    if (!passFromDb) return res.json({ status: "error", message: "Invalid email or password!" })


    const result = await comparePassword(password, passFromDb)
    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password!" })
    }
    const accessJWT = await crateAccessJWT(user.email, `${user._id}`)
    const refreshJWT = await crateRefreshJWT(user.email, `${user._id}`)

    res.json({ status: "success", message: "Login Successfully!", accessJWT, refreshJWT })
})

//get user profile router
router.get("/", userAuthorization, async(req, res) => {
    const _id=req.userId
    const userProof=await getUserById(_id)
    res.json({ user:userProof })
})
module.exports = router;