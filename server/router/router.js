const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');





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
                res.status(200).json({message : 'User Logged in' , userLoginStatus : 1 , token : jwt.sign({email : req.body.email} , 'secretkey')});

        }
        else{
            res.status(404).json({message : "Password Not Matched" , userLoginStatus : 0 , token :null });
        }

    }
    else{
        res.status(404).json({message : 'User Not Found'})
    }
})


//get api to get the users all data

// here we are sending email in parameters cause for crud well use endpoints and for other opearions will use query parameters and trying to get the data of user that matches the condtion
router.get('/userDetails/:email' , async(req , res)=>{
    //so this ':' sign in url is to specify url parameter in the backend to access the parameter no need to use it in the frotend cause we are using this to only access the email
    const email = req.params.email;
    console.log(email);
    const userInfo = await User.find({email : email})
    console.log(userInfo);
    if(userInfo){
        //here in json format we are sending a single object
        res.status(200).json({message : "Send Data" ,userInfo : userInfo});
    }
    else{
        res.status(404).json({message : 'User Not Found' , userInfo : {}});
    }
})


//update user income api
// for updating api by email we are getting email by url and data through body and then we are running query in mongofb by mail and for second parameter using the data do update using set only that parameter is updated
router.put('/updateIncome/:email' , async(req ,res)=>{

    const email = req.params.email;
    const data = req.body.income;
    console.log(data);
    const updatedUser = await User.findOneAndUpdate({email :email} , {$set : {income : data}});

    console.log(updatedUser);
    if(updatedUser){
        res.status(200).json({message : 'Updated user' , user : updatedUser});
    }
    else{
        res.status(404).json({message : 'User Not Found' , user : null});
    }

})



// api to update transactions;

// here we are doing same updating by email and getting data in body
router.put('/updateTransactions/:email' , async(req , res)=>{
    
    const email = req.params.email;
    console.log(email);
    const data = req.body;
    const updatedUser = await User.findOneAndUpdate({email : email} , {transactions : data});
    console.log(updatedUser);

    if(updatedUser){
        res.status(200).json({message : "Updated Transactions"});
    }
    else{
        res.status(404).json({message : "Not Updated"});
    }

})

module.exports = router;