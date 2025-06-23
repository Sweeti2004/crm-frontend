const express=require("express")
const router=express.Router()
const {insertUser,getUserByEmail}=require("../model/user/User.model")
const {hashPassword,comparePassword}=require("../helpers/bcrypt.helper")
router.all('/',(req,res,next)=>{
    
   // res.json({message: "Return from user router"})
    next();
})
//Create new user router
router.post('/',async(req,res)=>{
    const {name,company,address,phone,email,password}=req.body;
    try {
        //hash password
        const hashedPass=await hashPassword(password)
        const newUserObj={
            name,
            company,
            address,
            phone,
            email,
            password: hashedPass,
        }
        const result=await insertUser(newUserObj)
    console.log(result);
    res.json({message:"new user created",result}) 
    } catch (error) {
        console.log(error)
        res.json({status:"error",message:error.message})

    }
   
    
});
//User sign in router
router.post("/login",async(req,res)=>{
    console.log(req.body)
    const{email,password}=req.body;
    
    //hash our pass and comare with db one
    if(!email || !password){
        res.json({status:"error",message:"Invalid Form Submission"})
    }
//get user with email from db
const user=await getUserByEmail(email)
    console.log(user)
    const passFromDb=user && user._id?user.password:null
   if(!passFromDb) return res.json({status:"error",message:"Invalid email or password!"})
    const result= await comparePassword(password,passFromDb)
    console.log(result)
    res.json({status:"success",message:"Login Successfully!"})
})
module.exports=router;