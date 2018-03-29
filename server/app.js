const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const mongo = require('mongodb');
/*
* DB TEST
*
*/
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/nodeapp";

const app = express();

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: 'strawberry fields 4 ever'
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodeapp");
    dbo.collection("users").find({username: username, password: password}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result[0]){
        let user = result[0];
        let token = jwt.sign({ id: user.id, username: user.username }, 'strawberry fileds 4 ever', { expiresIn: 129600 }); // Sigining the token
          res.json({
              sucess: true,
              err: null,
              user: { id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname, list: user.list},
              token
          });
      }else {
        res.status(401).json({
            sucess: false,
            token: null,
            err: 'Username or password is incorrect'
        });
    }
      db.close();
    });
  });
});

// REGISTER ROUTE
app.post('/register', (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodeapp");
    dbo.collection("users").find({username: username}).toArray(function(err, result) {
      if (err) throw err;
      console.log('Username already in use');
      if(result[0]){
        res.status(202).json({
            sucess: false,
            err: 'Username already in use'
        });
        db.close();
      }else {
        dbo.collection("users").find({email: email}).toArray(function(err, result) {
            if (err) throw err;
            console.log('Email already in use');
            if(result[0]){
              res.status(202).json({
                  sucess: false,
                  err: 'Email already in use'
              });
              db.close();
            }else{
                console.log("insert");
                dbo.collection("users").insert( { username, email , password, firstname, lastname } ).then(function(result) {
                    // process result
                    res.json({
                        sucess: true,
                        err: null,
                    });
                    db.close();
                  });
            }
        });
    }
    });
  });
});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling 
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
      res.status(401).send(err);
  }
  else {
      next(err);
  }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Magic happens on port ${PORT}`);
});

module.exports = app;
