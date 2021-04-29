const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:3
    },
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]        
       },
    email:{
        type: String,
        required:true,
        unique:[true, "Email is Already Persent"],
        
    },
    password:{
        type: String,
        required:true
    }
})

userSchema.pre("save", async function( next ){
    if("password"){
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();

})

//model
const User = new mongoose.model('User', userSchema);

module.exports = User;