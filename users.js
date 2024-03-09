var express = require('express');
const mysql = require('mysql2');

var router = express.Router();
var app = express();


  router.get('/',function(req, res){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "praju@1234",
      database: "cart_app"
    });  
    
    
    con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
        });
     
   });


router.post('/',function(req, res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "praju@1234",
    database: "cart_app"
  });  
  
  console.log(req.body);

  const user= req.body;
  


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = 
    `INSERT INTO users (username, password, email, first_name, last_name)  
    VALUES ('${user.username}',
    '${user.password}',
    '${user.email}',
    '${user.first_name}',
    '${user.last_name}') `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({message:"1 record inserted"})
    });
   
  })
  // con.connect(function(err) {
  //       if (err) throw err;
  //       con.query("SELECT * FROM users", function (err, result, fields) {
  //         if (err) throw err;
  //         console.log(result);
  //         res.json(result);
  //       });
  //     });
   
 });


 router.get('/:id', function(req, res){
 console.log ("I am id=" + req.params.id);


 var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "praju@1234",
  database: "cart_app"
});  


con.connect(function(err) {
      if (err) throw err;
      con.query(`SELECT * FROM users where id=${req.params.id}`, function (err, result, fields) 
      {
        if (err) throw err;
        console.log(result);
        res.json(result[0]);
      });
    
 
});

});


router.put('/:id',function(req, res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "praju@1234",
    database: "cart_app"
  });  
  
  console.log(req.body);

  const user= req.body;
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `UPDATE users set 
    username='${user.username}',
     password= '${user.password}', 
     email='${user.email}', 
     first_name='${user.first_name}'
     where id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({message:"1 record inserted"})
    });
   
 
  });  
 });


 router.delete('/:id', function(req, res){
  console.log ("I am id=" + req.params.id);
 
 
  var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "praju@1234",
   database: "cart_app"
 });  
 
 
 con.connect(function(err) {
       if (err) throw err;
       con.query(`DELETE FROM users where id=${req.params.id}`, function (err, result, fields) 
       {
         if (err) throw err;
         console.log(result);
         res.json({message: "User Deleted"});
       });
     
  
 });
 
 });

//Routes will go here
module.exports = router;