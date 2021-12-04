const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const url="mongodb+srv://ramgoel19:<itsram777>@cluster0.8jszl.mongodb.net/edutify?retryWrites=true&w=majority"
const port=process.env.PORT || 3000



mongoose.connect(url)

var RegAdmin=new mongoose.Schema({
    fname:String,
    lname:String,
    idNum:Number,
    email:String,
    contact:Number,
    pwd:String
})
var RegStudent=new mongoose.Schema({
    fname:String,
    lname:String,
    enNum:Number,
    email:String,
    contact:Number,
    pwd:String
})
var newsSchema=new mongoose.Schema({
    name:String,
    title:String,
    desc:String
})

var RegAdminModel=new mongoose.model('regAdmin',RegAdmin);
var RegStudentModel=new mongoose.model('regStudent',RegStudent);
var newsModel=new mongoose.model('newsInfo',newsSchema);


app.use(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"css")));
app.set('view engine', 'ejs');




app.use(bodyParser.urlencoded({
    extended: true
  }));



function numValidate(num){
    if (num.length==10){

        if (num[0]==9){

            return true;
        }
        else if(num[0]==7){
            return true;
        }
        else if(num[0]==8){
            return true;
        }
        else if(num[0]==6){
            return true;
        }
        else{
            return false
        }
    }
    else{

        return false;
    }
    
}

function emailValidate(email){
   var mail=email.split('.')

   if (mail[-1]=='com'  || mail[-1]=='in'){
       return true
   }
   else{
       return false
   }
    
}



  //Get EndPoint

//home endpoint

app.get('/', (req,res)=>{
    res.render('index', {prop:'dn'})
});



//register endpoint

app.get('/radmin', (req,res)=>{
    res.render('Admin', {prop:'dn', validate:""})
});
app.get('/rstudent', (req,res)=>{
    res.render('Student', {prop:'dn', validate:""})
});


//Option Endpoint


app.get('/login', (req,res)=>{
    res.render('option', {prop:'dn'})
});

app.get('/register', (req,res)=>{
    res.render('/', {prop:'dn'})
});

//Login endpoint

app.get('/adminlogin', (req,res)=>{
    res.render('AdminLogin', {prop:'dn'})
});

app.get('/studentlogin', (req,res)=>{
    res.render('StudentLogin', {prop:'dn'})
});






//POST endpoints



//register details submit endpoint [post]

app.post('/regadmin', (req,res)=>{
    

    let contact=req.body.contact
    let idNum=req.body.idNum
    let Email=req.body.email
    let Pwd=req.body.pwd
    console.log(req.body)
    if (numValidate(contact)==false && emailValidate(Email)==false){
       res.render('Admin',{validate:"Please Check the Details", prop:"dn"})
    }
    else{

        let register=new RegAdminModel(req.body);
        register.save();
        res.render('Result')
    }
    
});
app.post('/regstudent', (req,res)=>{
    
    let contact=req.body.contact
    let enroll=req.body.enNum
    let email=req.body.email
    let pwd=req.body.pwd
    console.log(req.body)
    if (numValidate(contact)==false && emailValidate(email)==false ){
       res.render('Student',{validate:"Please Check your Details", prop:"dn"})
    }
    else{

        
        let register=new RegStudentModel(req.body);
        register.save();
        res.render('Result')
    }
});




//Panel endpoint
app.post('/slogin', async(req,res)=>{


    var findbyId=await RegStudentModel.find({enNum:req.body.ennum}).exec();
    var findbyPwd=await RegStudentModel.find({pwd:req.body.pass}).exec();
    console.log(findbyId.length)
    console.log(findbyPwd.length)
    if(findbyId.length==0 || findbyPwd.length==0 ){
            res.send("Check your Email and Password")
    }else{
        var findNews=await newsModel.find({}).sort({_id:-1}).exec()
        res.render('StudentPanel',{data:findNews})
    }
});
app.post('/alogin', async(req,res)=>{
    var findbyId=await RegAdminModel.find({enNum:req.body.idNum}).exec();
    var findbyPwd=await RegAdminModel.find({pwd:req.body.pass}).exec();
    console.log(findbyId.length)
    console.log(findbyPwd.length)
    if(findbyId.length==0 || findbyPwd.length==0 ){
            res.send("Check your Email and Password")
    }else{
        res.render('AdminPanel')
    }
    
});

//news submit by admin endpoint

app.post('/notify', (req, res) => {
    let name=req.body.name
    let title=req.body.title
    let desc=req.body.desc

    
    var news= new newsModel(req.body);
    news.save()
    res.render('Result')
});



//Running the App
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
