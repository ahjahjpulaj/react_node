const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
require('./models/User');
require('./services/passport');
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

const mongo = require("mongodb");
/*
* DB TEST
*
*/
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/nodeapp";
mongoose.connect(keys.databaseUrl);

const app = express();
require('./routes/authRoutes')(app);

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  // res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: "strawberry fields 4 ever"
});



// ORARI ROUTE
app.post("/orari", (req, res) => {
  const { username, week } = req.body;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodeapp");
    // dbo.collection("users").aggregate([{$unwind:"$ingressi"},{$unwind:"$ingressi.weeks"},{$match:{"_id" : userId, "ingressi.week":week}}]).toArray(function(err, result) {
    dbo
      .collection("users")
      .aggregate([
        { $unwind: "$ingressi" },
        { $match: { username: username, "ingressi.week": week } },
        { $project: { "ingressi.days": 1 } }
      ])
      .toArray(function(err, result) {
        // dbo.collection("users").aggregate([{$unwind:"$ingressi"},{$match:{"username":"test","ingressi.week":week}},{$project:{"ingressi":1}}]).toArray(function(err, result) {
        if (err) throw err;
        console.log(result[0]);
        let days = [];
        if (result[0]) {
          days = result[0].ingressi.days;
        } else {
          dbo
            .collection("users")
            .update(
              { username: username },
              { $push: { ingressi: { week: week, days: [] } } }
            );
          let i = 1;
          for (i; i <= 7; i++) {
            dbo
              .collection("users")
              .update(
                { username: username, "ingressi.week": week },
                { $push: { "ingressi.$.days": { day: i, orari: ["", ""] } } }
              );
          }
        }
        res.json({
          sucess: true,
          err: null,
          ingressi: days
        });
        db.close();
      });
  });
});

app.post("/postorari", (req, res) => {
  const { username, week, orari } = req.body;
  // Use your DB ORM logic here to find user and compare password
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodeapp");

    dbo.collection("users").update();
    db.users.update(
      { username: username, "ingressi.week": week },
      { $set: { "ingressi.$.days": orari } }
    );
    if (err) throw err;
    console.log(result[0]);
    let ingressi = result[0];
    //   res.json({
    //     sucess: true,
    //     err: null,
    //     ingressi: ingressi.ingressi,
    // });
    db.close();
  });
});

// TIMESHEET ROUTE
app.post("/timesheet", (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodeapp");
    dbo
      .collection("users")
      .find({ username: username, password: password })
      .toArray(function(err, result) {
        if (err) throw err;

        db.close();
      });
  });
});

app.get("/", jwtMW /* Using the express jwt MW here */, (req, res) => {
  res.send("You are authenticated"); //Sending some response when authenticated
});

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Starting the app on PORT 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Magic happens on port ${PORT}`);
});

module.exports = app;
