const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*


steps creating schema and creating model
*/

const userSchema = new Schema({
    username : {
        type : String ,
        required : true
    },
    email :{
        type : String ,
        required : true
    },
    password : {
        type  : String , 
        required  :true
    },
    income  :{
        type : Number , 
        default : 0 

    },
    expenses :{
        type : Number , 
        default : 0
    },
    transactions  : [{
        tid : {
            type : Number,
        },
        ttype : {
            type : String ,
        },
        texpense : {
            type : Number ,
        },
        tdate : {
            type : Date ,    
            default : Date.now()
        }
    }]
    
});



const User = mongoose.model("USER" , userSchema);

module.exports = User;