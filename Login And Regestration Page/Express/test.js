const mysql = require('mysql')
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
    `SELECT Password FROM test_form WHERE Email='abcd'`;
  con.query(sql, function (err, result) {
    if (err) throw err;


    process.on('uncaughtException', err => {
      console.error('There was an uncaught error')
      process.exit(1) //mandatory (as per the Node.js docs)
    })

    var json = JSON.parse(JSON.stringify(result)); //Converting RowDataPacket object to a normal object

    var res_db = json[0].Password;

    console.log(res_db);

  });
});