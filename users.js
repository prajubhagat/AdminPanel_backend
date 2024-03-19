
var express = require('express');
const mysql = require('mysql2');
var router = express.Router();
var app = express();
const ObjectId = require("mongodb").ObjectId;

var MongoClient = require("mongodb").MongoClient;

const uri =
"mongodb+srv://prajubhagat10:E8Oqv5DIGZpFkwEL@praju.pnnbnzy.mongodb.net/testdb?retryWrites=true&w=majority&appName=Praju";

const client = new MongoClient(uri);


  router.get('/', async function (req, res){

    let dbo = await client.db("testdb");
    let data = await dbo.collection("customers").find({}).sort({ name: 1, age: 1 }).toArray();
    console.log("data >> ", data);
    res.json(data);
   });


router.post('/', async function(req, res){

  let dbo = await client.db("testdb");
  var myobj = req.body;
  let data = await dbo.collection("customers").insertOne(myobj);
  console.log(data);

  
  console.log(req.body);
  const user= req.body;
  res.json({message:"1 record inserted"});
});


 router.get('/:id', async function(req, res){
  console.log("I am id = " + req.params.id);

  let dbo = await client.db("testdb");
  let data = await dbo.collection("customers").find({_id: new ObjectId("" + req.params.id + "")}).toArray();
  console.log("data >> ", data);
  res.json(data[0]);

});


router.put('/:id', async function(req, res){
  console.log("I am id = " + req.params.id);

  let dbo = await client.db("testdb");
  var myquery = { _id: new ObjectId(req.params.id) };
  var newvalues = { $set: req.body };
  let data = await dbo.collection("customers").updateOne(myquery, newvalues);
  console.log("data >> ", data);
  res.json({message:"1 record inserted"});
 
  console.log(req.body);
  const user= req.body;
  
 
 });


 router.delete('/:id', async function(req, res){
  console.log ("I am id=" + req.params.id);

  let dbo = await client.db("testdb");
  //delete one
  let data = await dbo.collection("customers").deleteOne({ username: "praju11"});
  // let data = await dbo.collection("customers").drop();
  console.log("data >> ", data);
 
  console.log(data);
         res.json({message: "User Deleted"});
   
 
 
 
 });

//Routes will go here
module.exports = router;