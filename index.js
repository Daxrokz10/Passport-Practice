const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const db = require('./config/db');
const port = process.env.PORT || 3000;
const initializePassport = require('./middleware/passport');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

initializePassport(passport);   // ✅ Call once here
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/', router);

app.listen(port, () => {
  db;
  console.log("Server online on http://localhost:" + port);
});
