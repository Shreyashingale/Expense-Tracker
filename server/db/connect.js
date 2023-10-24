const mongoose  = require('mongoose');


mongoose.connect('mongodb+srv://shreyashingale282:Yash282@cluster0.9iabkzq.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to the database");
})
.catch((error)=>{
    console.log(error);
})