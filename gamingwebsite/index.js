const express = require('express');

const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
 
app.use(bodyParser.json());
const dburi = process.env["MONGO_URI"]
mongoose.connect(dburi,({useNewUrlParser:true, useUnifiedTopology:true}));

const gameSchema = new mongoose.Schema({name: {type:String, required: true}, rank: Number});
let Game = mongoose.model("Game",gameSchema);

let num;
let gamedict = {}

app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000,()=>{
  console.log('listening')
})
app.use(express.static('public'));

app.get('/', function(req, res){
  absulotePath = __dirname + '/views/index.html';
  res.sendFile(absulotePath);
})
let number;
app.post('/gamelist', (req,res)=>{
  let userinput = req.body.favoriteGame
  let newlyranked = new Game({name: userinput, rank:1});
  newlyranked.save((err, data)=>{
    if(err) return console.error(err)
    res.json(data)
  })
      
})

app.post('/biglist', (req,res)=>{
  gamesarr = req.body.gameslist.split(' ');
  
  console.log(gamesarr)
  Game.create(gamesarr,(err,data)=>{
    if(err) return console.error(err)
    res.json(data)
  })
  

})









module.exports= app;
