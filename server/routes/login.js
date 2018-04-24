const passport = require("passport");
const app = require("../app");
const MongoClient = require("mongodb").MongoClient;
const keys = require("./config/keys");

module.exports = app => {
  // LOGIN ROUTE
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Use your DB ORM logic here to find user and compare password

    MongoClient.connect(keys.databaseUrl, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nodeapp");
      dbo
        .collection("users")
        .find({ username: username, password: password })
        .project({ _id: 1, username: 1 })
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          if (result[0]) {
            let user = result[0];
            let token = jwt.sign(
              { id: user.id, username: user.username },
              "strawberry fileds 4 ever",
              { expiresIn: 129600 }
            ); // Sigining the token
            res.json({
              sucess: true,
              err: null,
              user: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                list: user.list
              },
              token
            });
          } else {
            res.status(401).json({
              sucess: false,
              token: null,
              err: "Username or password is incorrect"
            });
          }
          db.close();
        });
    });
  });
};
