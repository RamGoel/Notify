const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const bodyParser=require('body-parser');


app.use(express.static(path.join(__dirname,"views")));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
  }));



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



//register details submit endpoint [post]

app.post('/regadmin', (req,res)=>{
    
    let fname=req.body.fname
    let lname=req.body.lname
    let cnum=req.body.cnum
    let id=req.body.id
    let email=req.body.email
    let pass=req.body.pass
    let name=fname+" "+lname
    console.log(req.body)
    if (fname == "" || lname=="" || cnum=="" || id==""||pass==""||email=="" ){
       res.render('Admin',{validate:"All Fields are neccessary", prop:"dn"})
    }
    else{

        res.render('Result',{Role:name,prop:'dn'})
    }
    
});
app.post('/regstudent', (req,res)=>{
    
    let fname=req.body.fname
    let lname=req.body.lname
    let cnum=req.body.cnum
    let ennum=req.body.ennum
    let email=req.body.email
    let pass=req.body.pass
    let name=fname+lname
    console.log(req.body)
    if (fname == "" || lname=="" || cnum=="" || ennum==""||pass==""||email=="" ){
       res.render('Student',{validate:"All Fields are neccessary", prop:"dn"})
    }
    else{

        res.render('Result',{Role:name,prop:'dn'})
    }
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


//Panel endpoint
app.post('/slogin', (req,res)=>{

    if(req.body.ennum =="ram@1234" && req.body.pass=="1234"){

        res.render('StudentPanel', {prop:'db'})
    }else{
        res.send("Wrong Details")
    }
});
app.post('/alogin', (req,res)=>{
    if(req.body.IDnum =="ram@1234" && req.body.pass=="1234"){

        res.render('AdminPanel', {prop:'db'})
    }else{
        res.send("Wrong Details")
    }
    
});

//news submit by admin endpoint

app.post('/notify', (req, res) => {
    let name=req.body.name
    let title=req.body.title
    let desc=req.body.desc

    console.log(req.body)

    res.render('Result',{Role:req.body.name,prop:'dn'})
});



//Running the App
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});