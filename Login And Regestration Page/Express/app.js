const urlencoded = require("express");
const express = require("express");
const app = express();
const port = 80;
const path = require("path");
var mysql = require('mysql');
app.use(express.urlencoded());



app.set('view engine', 'pug');  //Setting template engine to pug
app.set('views', path.join(__dirname, 'views')); //Setting pug directory to views



//ENDPOINTS OF REGISTRATION PAGE
app.get("/registration", (req, res) => {
  res.status(200).render('registration.pug');
})

//POST REQUEST OF REGESTRATION PAGE
app.post("/registration", (req, res) => {

  //Storing the values of the form in variables 
  let Email = req.body.Email;
  let password = req.body.Password;
  let address = req.body.address;
  let address2 = req.body.address2;
  let city = req.body.city;
  let Zip = req.body.zip;

  // Importing MySql
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "test_db",
    multipleStatements: true,
  });

  // Setting up the connection and sending queries to MySql db
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql =
      `INSERT INTO test_form 
  (customer_id , Email, Password , Address, Address2, City, Zip)
   VALUES (DEFAULT, "${Email}",  "${password}"," ${address}"," ${address2}", "${city}", ${Zip});
   commit; `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");

    });

  });

  res.status(200).redirect('/login');

});



//ENDPOINTS OF LOGIN PAGE
app.get("/login", (req, res) => {
  res.status(200).render('login.pug');
});



//POST REQUEST OF LOGIN PAGE
app.post("/login", (req, res) => {

  let Email = req.body.Email;
  let pass = req.body.Password;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "test_db"
  });

  // Setting up the connection and sending queries to MySql db
  con.connect(function (err) {
    if (err) throw err;

    var sql =
      `SELECT Password FROM test_form WHERE Email='${Email}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;

      process.on('uncaughtException', err => {
        const mes = { 'message': 'Email id not registered ' };
        res.status(200).render('failedlogin.pug', mes);
        process.exit(1); 
      });

      var json = JSON.parse(JSON.stringify(result)); //Converting RowDataPacket object to a normal object

      var res_db = json[0].Password;


      if (res_db == pass) {

        const mes = { 'message': 'Logged in succesfully' };
        res.status(200).render('successlogin.pug', mes);

      }
      else {

        const mes = { 'message': 'Failed to Login..Check your email or password ' };
        res.status(200).render('failedlogin.pug', mes);

      }

    });
  });
});




//Starting the server
app.listen(port, () => {
  console.log(`This website is running on ${port} port`);
});