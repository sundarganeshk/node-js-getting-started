charset="utf-8"
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
const pg = require('pg');
var config = require('./config.json');

var dbConnectionConfig = { host:config.host, user:config.username, password:config.password, database:config.database, ssl:config.ssl };
  
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
	
	pg.connect(dbConnectionConfig, function(err, client) {
		
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
//});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

