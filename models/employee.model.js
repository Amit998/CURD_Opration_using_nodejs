const mongoose = require('mongoose')

var emplyeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:'This field is required'
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
});
emplyeeSchema.path('email').validate((val)=>{
    emailRegex =/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
    return emailRegex.test(val);
},'Invalid email.')
mongoose.model('Emoloyee',emplyeeSchema)