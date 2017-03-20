charset="utf-8"
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

 
var Client = require('pg').Client;
//var pool = new Pool({ Client: Client }); USER_VAL PWD_VAL DB_VAL HOST_VAL
var config= {
    user: process.env.USER_VAL,
    password: process.env.PWD_VAL,
	database: process.env.DB_VAL,
	port: 5432,
	host: process.env.HOST_VAL,
    ssl: true,
	max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
}





app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});
app.get('/db', function (req, res){
	
	 var client = new Client(config);
     client.connect(function (err) {
	if (err) throw err;

	// execute a query on our database
  
	client.query('SELECT * FROM test_table', function (err, result){
	if(err){
		res.status(500).send(err.toString());
		   } 
    else   {
        res.send(JSON.stringify(result.rows));
	       }
	client.end(function (err) {
    if (err) throw err;
    });
	});
	});
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

