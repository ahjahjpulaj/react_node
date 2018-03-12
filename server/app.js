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
    secret: 'keyboard cat 4 ever'
});


// MOCKING DB just for test
let users = [
  {
      id: 1,
      username: 'test',
      password: 'asdf123'
  },
  {
      id: 2,
      username: 'test2',
      password: 'asdf12345'
  }
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
    console.log(req.body);
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodeapp");
    console.log(username);
    console.log(password);
    dbo.collection("users").find({username: username, password: password}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result[0]){
        let user = result[0];
        let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
          res.json({
              sucess: true,
              err: null,
              user: { id: user.id, username: user.username},
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
  
  /*
  for (let user of users) { // I am using a simple array users which i made above
      if (username == user.username && password == user.password) {
          //If all credentials are correct do this
          let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
          res.json({
              sucess: true,
              err: null,
              token
          });
          break;
      }
      else {
          res.status(401).json({
              sucess: false,
              token: null,
              err: 'Username or password is incorrect'
          });
      }
  }
  */
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
 /*
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 */

module.exports = app;
