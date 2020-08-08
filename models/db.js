const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/EmployeeTestDB',{useNewUrlParser:true},(error)=>{
    if(!error){
        console.log('Connection Succesfull')
    }else{
        console.log('connection Faild '+error)
    }
});

require('./employee.model');