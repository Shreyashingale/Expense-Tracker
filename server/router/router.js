const express = require('express');
const router = express.Router();
const User = require('../models/User');

//path and a callback function second parameter
router.get('/' , (req , res)=>{
    res.send("Router Visited");

})


//register api
router.post('/register' , async(req , res)=>{
    try {
            console.log(req.body);
            if(await User.findOne({email : req.body.email})){
                console.log("User existed");
                return res.status(400).json({ message: 'User Already Existed' });
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
            res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        
    }
})

module.exports = router;