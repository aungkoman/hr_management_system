var express = require('express'); 
var app = express();
const mysql = require( 'mysql' );
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var cors = require('cors');
app.use(cors());

// initialize client list array
var client_list = [null];
// we need to splice the first element from array (it's null);
client_list.splice(0, 1);

client_list[client_list.length] = {socket_id:'asdf asd2456asdfs23df4',socket_name:'aung ko man'};

console.log("socket id is "+client_list[0].socket_id);
client_list.splice(0, 1);


/*
client_list.splice(0, 1);
client_list[client_list.length] = {socket_id:'asdf asd2456asdfs23df4',socket_name:'aung ko man'};
console.log("socket id is "+client_list[0].socket_id);
*/


// database configuration
var db_config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hr_management_system',
};



// database class for Promise 
class Database {
    constructor( config ) {
      //console.log("Database is initialized");
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    test(){
      console.log("database class 's test method is calling");
    }
}

// for cross domain policy request
/*
app.all('/*',function(req,res,next){

  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','X-Requested-With');
  next();

})
*/

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

app.post('/delete_soldier', urlencodedParser, function (req, res) {

  console.log("delete_soldier post request => type is "+req.body.type);
  var new_soldier = req.body.data;
  console.log("delete_soldier request body is =>"+JSON.stringify(req.body));
  var new_soldier = JSON.parse(new_soldier);

  var delete_mc = new_soldier.mc;
  console.log("delete soldier mc is "+delete_mc);

  var db = new Database(db_config);
  var query_command ="DELETE FROM `soldiers` WHERE `soldiers`.`mc` = "+delete_mc;
  db.query( query_command)
    .then( rows => {
        console.log("delete soldier response is  "+JSON.stringify(rows)); 
        //res.end(JSON.stringify(rows));
        // message for socket
        var msg = "Deleted soldier "+delete_mc;

        // emit to all client (registred and un authorized client)
        // we need to reconsider
        // we just need to emit delete_mc, m i right??
        io.emit('delete_broadcast',{msg:msg,data:delete_mc});


        console.log("delete broadcast is emitted");
        select_all_soldier(req,res);
        return db.close();
    }, err => {   
        res.end("error in database delete query "+err);
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        res.end("catch error in database delete query "+err);
        console.log("error in database delete query "+err);
    } ) ;

})

// end point for new_soldier (insert)
app.post('/new_soldier', urlencodedParser, function (req, res) {
  console.log("type is "+req.body.type);
  var new_soldier = req.body.data;
  console.log(JSON.stringify(req.body));
  var new_soldier = JSON.parse(new_soldier);

  var new_mc = new_soldier.mc;
  var new_name = new_soldier.name;
  var new_mc_type = new_soldier.mc_type;
  var new_posittion = new_soldier.position;
  var new_current_location = new_soldier.current_location;
  
  console.log("new_soldier mc  is "+new_mc);

  console.log("inner location is "+new_soldier.inner_location);
  /* forget about data and time */
  /*
  var d = new Date();
  var date  = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();
  var full_date = date+"/"+month+"/"+year;
  var inserted_date = new Date(year, month, date);
  */
  var db = new Database(db_config);
  var query_command = "INSERT INTO `soldiers` (`mc_type`, `mc`, `rank`, `name`, `position`, `company`, `current_location`, `inner_location`, `inner_duty`, `ops_location`, `ops_duty`, `outside_location`, `outside_duty_name`, `outside_duty_location`) VALUES ( '"+new_soldier.mc_type+"', '"+new_mc+"', '"+new_soldier.rank+"', '"+new_soldier.name+"','"+new_soldier.position+"','"+new_soldier.company+"', '"+new_soldier.current_location+"','"+new_soldier.inner_location+"','"+new_soldier.inner_duty+"','"+new_soldier.ops_location+"', '"+new_soldier.ops_duty+"', '"+new_soldier.outside_location+"','"+new_soldier.outside_duty_name+"', '"+new_soldier.outside_duty_location+"');";
  db.query( query_command)
    .then( rows => {
        console.log("insert soldier results are "+JSON.stringify(rows)); 
        //console.log("duty distribution is "); 
        //res.end(JSON.stringify(rows));

        var msg = "New Soldier "+ new_mc+ " is inserted into database";
        io.emit('new_soldier_broadcast',{msg:msg,data:new_soldier});
        select_all_soldier(req,res);
        return db.close();
    }, err => {   
        //res.end("error in database query for insert new soldier "+err);

        var error_message = "We faced error in database insertion  query"+err;
        // Prepare output in JSON format   
        var returned_data = {
          status:"fail",
          error_msg:error_message
        } ;
        console.log("error in database query for insert new soldier "+err);   
        res.end(JSON.stringify(returned_data));
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        var error_message = "We catch error in database insertion  query"+err;
        // Prepare output in JSON format   
        var returned_data = {
          status:"fail",
          error_msg:error_message
        } ;
        console.log("error in database query for insert new soldier "+err);   
        res.end(JSON.stringify(returned_data));
        console.log("error in database query "+err);
    } ) ;
 
})



/* update mc type only is closed */
// end point for updating soldier mc type (update)
/*
app.post('/update_soldier_mc_type', urlencodedParser, function (req, res) {

  var old_mc = req.body.mc;
  var new_mc_type = req.body.mc_type;

  var db = new Database(db_config);
  var query_command = "UPDATE `soldiers` SET `mc_type` = '"+new_mc_type+"' WHERE `soldiers`.`mc` = "+old_mc+"";

  db.query( query_command)
    .then( rows => {
        console.log("mc type update result is "+JSON.stringify(rows));  
        res.end(JSON.stringify(rows));
        return db.close();
    }, err => {   
        res.end("error in database mc type update query "+err);
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        res.end("catch error in database mc type update query  "+err);
        console.log("catch error in database mc type update query  "+err);
    } ) ;
 
})

*/

// end point for updating soldier mc type (update)
app.post('/update_soldier', urlencodedParser, function (req, res) {
  console.log("type is "+req.body.type);
  var new_soldier_from_client = req.body.data;
  console.log("request data is "+JSON.stringify(req.body));
  var new_soldier = JSON.parse(new_soldier_from_client);

  var old_mc = new_soldier.mc;
  var new_mc_type = new_soldier.mc_type;
  var new_rank = new_soldier.rank;
  var new_name = new_soldier.name;
  var new_position = new_soldier.position;
  var new_current_location = new_soldier.current_location;
  var new_company = new_soldier.company;
  var new_inner_location = new_soldier.inner_location;
  var new_inner_duty = new_soldier.inner_duty;
  var new_ops_location = new_soldier.ops_location;
  var new_ops_duty = new_soldier.ops_duty;
  var new_outside_location = new_soldier.outside_location;
  var new_outside_duty_name = new_soldier.outside_duty_name;
  var new_outside_duty_location = new_soldier.outside_duty_location;
  var new_outside_duty_start_date = new_soldier.outside_duty_start_date;
  var new_outside_duty_end_date = new_soldier.outside_duty_end_date;
  console.log("outside duty start date is "+new_outside_duty_start_date);
  
  console.log("new_soldier mc  is "+old_mc);

  console.log("inner location is "+new_soldier.inner_location);

  var db = new Database(db_config);
  var query_command = "UPDATE `soldiers` SET `mc_type` = '"+new_mc_type+"',  `rank` = '"+new_rank+"',  `name` = '"+new_name+"',  `company` = '"+new_company+"',  `position` = '"+new_position+"',  `current_location` = '"+new_current_location+"',  `inner_location` = '"+new_inner_location+"',  `inner_duty` = '"+new_inner_duty+"',  `ops_location` = '"+new_ops_location+"',  `ops_duty` = '"+new_ops_duty+"',  `outside_location` = '"+new_outside_location+"',  `outside_duty_name` = '"+new_outside_duty_name+"',  `outside_duty_location` = '"+new_outside_duty_location+"',  `outside_duty_start_date` = '"+new_outside_duty_start_date+"',  `outside_duty_end_date` = '"+new_outside_duty_end_date+"' WHERE `soldiers`.`mc` = "+old_mc+"";

  db.query( query_command)
    .then( rows => {
        console.log(" update result is "+JSON.stringify(rows));  
        //res.end(JSON.stringify(rows));
        var msg = old_mc +"'s updated data is updated by someone :P"; // by someone(:P) we need to add Author Name
        var real_update_obj = JSON.parse(new_soldier_from_client);
        
        // we need to emit pure database data to all client 
        // so , we are quering to database
        var last_update_query = "SELECT * FROM `soldiers` where mc = "+old_mc;
        db.query(last_update_query)
        	.then(single_row=>{
        		io.emit('update_broadcast',{msg:msg,data:real_update_obj});
        		console.log("we are emitting update data to clientss"); 
        		select_all_soldier(req,res);
        		return db.close();
        	},err=>{
        		res.end(" error in database mc type update query  "+err);
        		console.log('error in query '+last_update_query+' on database '+err);
        	})
        	.catch(err=>{
        		res.end("catch error in database mc type update query  "+err);
        		console.log('error catch in query '+last_update_query+' on database '+err);
        	});
    }, err => {   
        res.end("error in database mc type update query "+err);
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        res.end("catch error in database mc type update query  "+err);
        console.log("catch error in database mc type update query  "+err);
    } ) ;
 
})





// end point for user login
app.post('/user_login', urlencodedParser, function (req, res) {
  console.log("type is "+req.body.type);
  var socket_id = req.body.socket_id;
  var user_data = req.body.user_data;

  console.log("request login  data is "+JSON.stringify(req.body));
  var user_data = JSON.parse(user_data);
  if(user_data.login_mc == 63441 || user_data.login_mc == 123 || user_data.login_mc == 55 ){
    // ok, fine
    console.log('auth is ok , let go to data select');


    io.to(socket_id).emit('hello_emit',{msg:'hello emit msg'});
    pos = client_list.map(function(e) { return e.socket_id; }).indexOf(socket_id);
    console.log("the index of socket id in client list is "+pos);

    var msg = user_data.login_mc +" login to system.";
    io.emit('login_broadcast',{msg:msg});

    var returned_data = select_all_soldier_without_arg(req,res,user_data);
    /*
    console.log(" without arg return data is "+returned_data);
    returned_data = JSON.parse(returned_data);
    if(returned_data.status == 'success'){
      returned_data.user_data = user_data;
      res.end(JSON.stringify(returned_data));
    }
    else{
      res.end(JSON.stringify(returned_data));
    }
    */
  }
  else{
    // not auth
    var returned_data = {status:'fail',err_msg:'can not authorized'};
    res.end(JSON.stringify(returned_data));

  }
});




// end point for new_
app.get('/get_soldiers', function (req, res) {
  console.log("get_soldiers get request is accepted");
  var db = new Database(db_config);
  db.test();
  var query_command = "SELECT * FROM soldiers";
  db.query( query_command )
    .then( rows => {
        console.log("soldier rows are "+JSON.stringify(rows));
        // Prepare output in JSON format   
        var returned_data = {
          status:"success",
          data:rows
        } 
        console.log("returned_data is "+returned_data);   
        res.end(JSON.stringify(returned_data));
        return db.close();
    }, err => {   
        res.end("error in getting soldiers database query "+err);
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        res.end("catch error in getting soldiers database query "+err);
        console.log("error in database query "+err);
    } ) ;
 
})


function select_all_soldier(req,res){
  console.log("select_all_soldier function is calling...");
  var query_command = "SELECT * FROM soldiers";
  var db = new Database(db_config);
  db.query( query_command )
    .then( rows => {
        //console.log("soldier rows are "+JSON.stringify(rows));
        // Prepare output in JSON format   
        var returned_data = {
          status:"success",
          data:rows
        } 
        //console.log("returned_data is "+returned_data);   
        res.end(JSON.stringify(returned_data));
        return db.close();
    }, err => {   
        res.end("error in getting soldiers database query "+err);
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        res.end("catch error in getting soldiers database query "+err);
        console.log("error in database query "+err);
    } ) ;
}

function select_all_soldier_without_arg(req,res,user_data){
  console.log("select_all_soldier function without argument is calling...");
  var query_command = "SELECT * FROM soldiers";
  var db = new Database(db_config);
  db.query( query_command )
    .then( rows => {
        //console.log("soldier rows are "+JSON.stringify(rows));
        // Prepare output in JSON format   
        var returned_data = {
          status:"success",
          data:rows,
          user_data:user_data
        };
        console.log("returned_data is "+returned_data);   
        res.end(JSON.stringify(returned_data));
        return db.close();
        //db.close();
        //return JSON.stringify(returned_data);
    }, err => {   
        res.end("error in getting soldiers database query "+err);
        return db.close().then( () => { throw err; } );
        /*   
        var returned_data = {
          status:"fail",
          err_msg:err
        } ;
        db.close();
        return JSON.stringify(returned_data);
        */

    } )
    .catch( err => {
        // handle the error
        res.end("catch error in getting soldiers database query "+err);
        console.log("error in database query "+err);  
        /*
        var returned_data = {
          status:"fail",
          err_msg:err
        } ;
        db.close();
        return JSON.stringify(returned_data);
        */

    } ) ;
}




var server = app.listen(8082, function () {
  var host = server.address().address;  
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});


//var http = require('http').Server(app);
var io = require('socket.io')(server);
//io.set('origins','*:*');
//io.origins('*:*');
//io.set('origins','http://localhost:8081');
var numUsers = 0;
io.on('connection', function(socket){
  console.log('a user connected and it id is '+socket.id);
    socket.emit('assign_id',{
      id:socket.id
    });
  var addedUser = false;

  socket.on('disconnect', function(){
    console.log('a user disconnected');
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

  socket.on('add user',(username)=>{
    console.log("add user event on socket");
    if(addedUser) {
        return;
    }

    console.log('add user =>'+username);
    socket.username = username;
    ++numUsers;
    addedUser = true;
    client_list[client_list.length] = {socket_id:socket.id, socket_name:username};
    socket.emit('login',{
      numUsers:numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });


  });

});




/*
// Database class testing
var db = new Database(db_config);
db.test();

var soldier_rows;
db.query( 'SELECT * FROM soldiers' )
    .then( rows => {
        soldier_rows = rows;
        console.log("soldier rows are "+JSON.stringify(soldier_rows));
        return db.close();
    }, err => {
        return db.close().then( () => { throw err; } )
    } )
    .catch( err => {
        // handle the error
        console.log("error in database query "+err);
    } ) ;
    */