require('./models/db')

const express = require('express')

const path = require('path')
const exhbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser= require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')



const employeeController = require('./controllers/employeeController');
var app=express();

app.use(bodyParser.urlencoded({ extended: false }));



app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',
    exhbs({
        extname:'hbs',defaultLayout:'mainLayout',
        layoutsDir:__dirname+'/views/layouts/',
        handlebars: allowInsecurePrototypeAccess(Handlebars)}//need to add this
));
app.set('view engine','hbs')

app.listen(3000,()=>{
    console.log(`express server is started as port 3000`);
})

app.use('/employee',employeeController)