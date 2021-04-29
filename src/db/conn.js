const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/users-apis', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection sucessfull")
}).catch((e)=>{
    console.log('No connection')
})