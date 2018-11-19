var path = require('path');
var fs = require('fs');
var https = require('https');
var certOptions = {
	key:fs.readFileSync(path.resolve('server.key')),
	cert:fs.readFileSync(path.resolve('server.crt'))
}


var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-With');
	console.log("Got a / GET request");  
	res.sendFile( __dirname + "/" + "index.html" ); 
	//res.send('Hello World'); 
});


app.get('/rtc', function (req, res) { 
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-With'); 
	console.log("Got a /rtc GET request");  
	res.sendFile( __dirname + "/public/" + "rtc.html" ); 
  //res.send('Hello World'); 
});


/* http server 
var server = app.listen(8081, function () {
  var host = server.address().address;  
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
*/

var https_server = https.createServer(certOptions,app).listen(443);
