const express = require('express');
const router = express.Router();
const User = require('../models/User');






//path and a callback function second parameter
router.get('/' , (req , res)=>{
    res.send("Router Visited");

})


//register api
/*
register api flow
=>get user values from req body
=> and then create a new instance of the user values
=> save the new instance
*/

router.post('/register' , async(req , res)=>{
    try {
            console.log(req.body);
            if(await User.findOne({email : req.body.email})){
                console.log("User existed");
                return res.status(400).json({ message: 'User Already Existed', userRegisterStatus : 0});
            }

            const newUser = new User({

                username : req.body.username ,
                email : req.body.email ,
                password : req.body.password,
                income : 0,
                expenses : 0,
                transaction : []
            }) 

            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' , userRegisterStatus : 1 });

    } catch (error) {
        
    }
})



//login api
//db operations need to be async await
/*
=> here first step is same get user credentials
=> then find user by email
=> after finding match the password

*/
router.post('/login' , async(req , res)=>{
    console.log(req.body.email);
    const userLogin = await User.findOne({email:req.body.email});
    if(userLogin){
        if(userLogin.password === req.body.password){
                res.status(200).json({message : 'User Logged in' , userLoginStatus : 1});

        }
        else{
            res.status(404).json({message : "Password Not Matched" , userLoginStatus : 0});
        }

    }
    else{
        res.status(404).json({message : 'User Not Found'})
    }
})
module.exports = router;