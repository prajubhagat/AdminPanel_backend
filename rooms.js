
var express = require('express');
const mysql = require('mysql2');
var router = express.Router();
var app = express();
const ObjectId = require("mongodb").ObjectId;

var MongoClient = require("mongodb").MongoClient;

const uri =
"mongodb+srv://prajubhagat10:E8Oqv5DIGZpFkwEL@praju.pnnbnzy.mongodb.net/paradoredb?retryWrites=true&w=majority&appName=Praju";

const client = new MongoClient(uri);

// const DB_NAME = "paradoredb";
// const   COLLECTION_ROOM = "rooms";

  router.get('/', async function (req, res){

    let dbo = await client.db("paradoredb");
    let data = await dbo.collection("rooms").find({}).sort({ name: 1}).toArray();
    console.log("data >> ", data);
    res.json(data);
   });


router.post('/', async function(req, res){

  let dbo = await client.db("paradoredb");
  var myobj = req.body;
  let data = await dbo.collection("rooms").insertOne(myobj);
  console.log(data);

  
  console.log(req.body);
  const user= req.body;
  res.json({message:"1 record inserted"});
});


 router.get('/:id', async function(req, res){
  console.log("I am id = " + req.params.id);

  let dbo = await client.db("paradoredb");
  let data = await dbo.collection("rooms").find({_id: new ObjectId("" + req.params.id + "")}).toArray();
  // console.log("data >> ", data);
  res.json(data[0]);

});


router.put('/:id', async function(req, res){
  console.log("I am id = " + req.params.id);
  console.log(req.body);

  // let dbo = await client.db("paradoredb");

  var myquery = { _id: new ObjectId(req.params.id) };
  var newvalues = { $set: req.body };

  let dbo = await client.db("paradoredb");
  let data = await dbo.collection("rooms").updateOne(myquery, newvalues);
  console.log("data >> ", data);
  res.json({message:"1 record inserted"});
 
  // console.log(req.body);
  // const user= req.body;
  
 
 });


 router.delete('/:id', function(req, res){
  console.log ("I am id=" + req.params.id);

  var con = mysql.createConnection({
    host:"localhost",
    user :"react",
    password: "praju@1234",
    database:"cart_app",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `Delete FROM users where id =${req.params.id}`,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({message: "user Deleted"});
      }
    )
  })

 });

//Routes will go here
module.exports = router;