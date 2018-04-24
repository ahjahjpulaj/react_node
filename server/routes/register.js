const passport = require("passport");
const app = require("../app");
const MongoClient = require("mongodb").MongoClient;
const keys = require("./config/keys");

module.exports = app => {
  // REGISTER ROUTE
  app.post("/register", (req, res) => {
    const { username, email, password, firstname, lastname } = req.body;
    MongoClient.connect(keys.databaseUrl, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nodeapp");
      dbo
        .collection("users")
        .find({ username: username })
        .toArray(function(err, result) {
          if (err) throw err;
          console.log("Username already in use");
          if (result[0]) {
            res.status(202).json({
              sucess: false,
              err: "Username already in use"
            });
            db.close();
          } else {
            dbo
              .collection("users")
              .find({ email: email })
              .toArray(function(err, result) {
                if (err) throw err;
                console.log("Email already in use");
                if (result[0]) {
                  res.status(202).json({
                    sucess: false,
                    err: "Email already in use"
                  });
                  db.close();
                } else {
                  console.log("insert");
                  dbo
                    .collection("users")
                    .insert({ username, email, password, firstname, lastname })
                    .then(function(result) {
                      // process result
                      res.json({
                        sucess: true,
                        err: null
                      });
                      db.close();
                    });
                }
              });
          }
        });
    });
  });
};
