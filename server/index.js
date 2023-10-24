const express = require('express');
require('../server/db/connect');
const app = express();
const port = 5000;




/*

mongodb+srv://shreyashingale282:<password>@cluster0.9iabkzq.mongodb.net/?retryWrites=true&w=majority
*/

app.get('/' , (req ,res)=>{
    console.log("on home page");
    res.send("Hello World");
})




app.listen(port , ()=>{
    console.log(`Listning to the port ${port}`);
})





