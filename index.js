const http=require('http');
const express=require('express');
const path=require('path');
const port=8080;

const db=require('./config/mongoose');
const Contact=require('./models/contact');


const app=express();
app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded());
app.use(express.static("assets"));


contactList=[
    {
        name:"Sumant",
        phone:"8529151381"
    },
    {
        name:"Shantanu",
        phone:"8856816073"
    }
];
app.get('/',(req,res)=>{
    Contact.find({},(err,contacts)=>{
        if(err){console.log(err);return }

        return res.render("home",{
            title:"Contacts List",
            contact_list:contacts
        });
    });
})

app.get('/delete-contact/:id',(req,res)=>{
    
    const id=req.params.id;
    Contact.findByIdAndDelete(id,(err)=>{
        if(err){console.log(err);return }
        return res.redirect('back');
    });
});

app.post('/create-contact',(req,res)=>{
    
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, (err,newContact)=>{
        if(err) {console.log(err);return }
        console.log(newContact);
        return res.redirect('back');
    })
})


app.listen(port,(err)=>{
    if(err)console.log(err);
    else console.log("Server up & running!");
})