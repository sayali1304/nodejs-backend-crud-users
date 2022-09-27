const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { application } = require('express');

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(3000,()=>{

    console.log("app running on 3000")
    
})

// connect Mysql Database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userinfo',
    port:'3306'
});

// check.database connection

db.connect(err => {
    if(err)
    {
        console.log(err ,'err')
    }else {
    console.log('Database Connected Successful!!!')
    }
})

// get All data
app.get('/users',(req,res)=>{
    // console.log('Get All Users');
    let qrr= 'SELECT * FROM users';
    db.query(qrr,(err,results)=>{
        if(err){
           console.log(err,'errs');
     }
     else if(results.length>0)
     {
        res.send({
            message:'All users  Data',
            data:results
        });
     } else{
        console.log('in else');
     }
});

});

//  get single data by ID 
         app.get('/user/:id',(req,res)=>{
    // console.log(req.params.id);
        let qrId = req.params.id;
        let qr = `SELECT * FROM users where id = ${qrId}`;
        db.query(qr,(err,results)=>{
        console.log(results.length , 'test')
        if(err){
            console.log(err);
        }
        if(results.length >0){
            console.log(results.length ,'testinside')
            res.send({
                messege:"Get data by ID",
                data:results
            })

        }else{
            res.send({
                message:"Data not found dear!"
            });
        };
      });
   });

//   post data
app.post('/user',(req,res)=>{
    console.log(req.body,'post data success');
    let Fullname = req.body.Fullname;
    let Email = req.body.Email;
    let Mobile = req.body.Mobile;
    let City = req.body.City;

    let qr =`insert into users(Fullname,Email,Mobile,City)
    value('${Fullname}','${Email}','${Mobile}','${City}')`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
       res.send({
        message:"Data added successfull!",
        data:results
       })
    })
})
// // update data
app.put('/user/:id',(req,res)=>{
    // console.log(req.body,"updated data")
    let uID =req.params.id;
    let Fullname = req.body.Fullname;
    let Email = req.body.Email;
    let Mobile = req.body.Mobile;
    let City = req.body.City;

    let qr = `update users set Fullname = '${Fullname}', Email = '${Email}',
    Mobile = '${Mobile}' , City = '${City}' where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
            res.status(500).send({
                error:"Problem In update",
                // data:results
            })
        }else{
        res.send({
            message:"Data Updated successfull",
            // data:results
        })
    }
    })
})
// delete data
app.delete('/user/:id',(req,res)=>{
    let uID = req.params.id;
    let qr= `delete from users where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message: "Data deleted successfull"
        })
    })
})


