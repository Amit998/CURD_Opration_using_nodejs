const express  =require('express');
var router= express.Router();

const mongoose= require('mongoose')
const Employee=mongoose.model('Emoloyee')


router.get('/',(req,res) =>{
    res.render("employee/addOrEdit",{
        viewTitle:"Insert Employee"
    });
})

router.get('/delete/:_id',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id,
        req.body,
        (err,doc) =>{
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log(` Having Issues Of ${err}`);
        }

    });
    
});



router.post("/",(req,res) =>{
    // console.log(req.body);
    if(req.body._id == ''){
        insertRecord(req,res)
    }else{
        updateRecord(req,res)
    }
})

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc) =>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == 'ValidationError' ){
                handlevalidateError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle:"Update Employee",
                    employee:req.body
                });
            }
            else{
                console.log(`Error During Instering ${err} `);
            }
        }

    });
}

function insertRecord(req,res){
    var employee=new Employee();
    employee.fullName=req.body.fullName;
    employee.email=req.body.email;
    employee.mobile=req.body.mobile;
    employee.city=req.body.city;

    employee.save((err,doc) =>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == 'ValidationError' ){
                handlevalidateError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle:"Insert Employee",
                    employee:req.body
                });

            }
            // console.log(`Error During Instering ${err} `);
            
        }
    });

}

router.get('/list',(req,res) =>{
    
    Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list:docs
            });

        }
    })
})


function handlevalidateError(err,body){
    
    for (field in err.errors){
       switch(err.errors[field].path){
        case 'fullName':
            console.log(err.errors[field].message)
            // console.log(err.errors[field].message)
           
            body['fullNameError']=err.errors[field].message;
            break;
        case 'email':
            console.log(err.errors[field].message)
            // console.log(err.errors[field].message)
            // console.log(err.console.errors[field].message);
            body['emailError']=err.errors[field].message;
            break;
        default :
            
            break;
       }
    }
    // err.errors();
}
router.get('/:id',(req,res) =>{
    Employee.findById(req.params.id,(err,doc) =>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle:"Update Employee",
                employee:doc
            });

        }else{

        }
    });
});
module.exports = router;