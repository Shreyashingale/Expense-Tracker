const express = require('express');
const User = require('./models/User');
require('../server/db/connect');
const app = express();
const port = 5000;
const router = require('../server/router/router');
const bodyParser = require('body-parser');

//needed for reading data send in the body as json
// Middleware functions can intercept and process incoming HTTP requests and outgoing HTTP responses
app.use(bodyParser.json());
//first parameter is u can set the path and second is router
app.use(router);

/*

mongodb+srv://shreyashingale282:<password>@cluster0.9iabkzq.mongodb.net/?retryWrites=true&w=majority
*/

// app.get('/' , (req ,res)=>{
//     console.log("on home page");
//     res.send("Hello World");
// })




app.listen(port , ()=>{
    console.log(`Listning to the port ${port}`);
})





