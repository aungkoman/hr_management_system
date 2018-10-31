var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', function (req, res) { 
	console.log("Got a / GET request");  
	res.sendFile( __dirname + "/" + "index.html" ); 
	//res.send('Hello World'); 
});

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format   
   var user = {       
   	id:req.query.id,       
   	password:req.query.password   
   };   

   // check login credential
   console.log(user);   
   res.end(JSON.stringify(user)); 
})

// This responds a POST request for the homepage 
app.post('/', function (req, res) {   
	console.log("Got a POST request for the homepage");   
	res.send('Hello POST'); 
})


app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format   
   var user = {       
   	first_name:req.body.id,       
   	last_name:req.body.password   
   };   
   console.log(user);   
   res.end(JSON.stringify(user)); 
})

var server = app.listen(8081, function () {
  var host = server.address().address;  
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
