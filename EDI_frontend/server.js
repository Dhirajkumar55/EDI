// BASE SETUP
// ==============================================

var express = require('express');
var app 	= express();
var router	= express.Router();
//var port    = process.env.PORT || 3001;

  var fs=require('fs');
  var url = require('url');
  var port = 3000;
 //const key = fs.readFileSync('../../key.pem');
 // const cert = fs.readFileSync('../../cert.pem');
var server = require('http').createServer(app);
server.listen(port);


// Middlewares
var morgan 			= require('morgan');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var cookieParser 	= require('cookie-parser');
var session 		= require('express-session');
// var favicon			= require('serve-favicon');
var errorhandler	= require('errorhandler');
var ejs				= require('ejs');

// var dbconnection 	= require('./config/database.js')
// var sessionConfig	= require('./config/session.js')
var index = require('./index');
// var routes 			= require('./routes');
// var http 			= require('http');
// var path 			= require('path');
// var api 			= require('./api');
var multer 			= require('multer');
var MongoStore		= require('connect-mongo')(session);
//var material_icon 	= require('material-design-icons');

// CONFIGURATION
// ==============================================

app.set('view engine', 'ejs');
app.engine('html',ejs.renderFile);

// app.use(favicon('./app/favicon.ico'));				// Use the favicon
app.use('/fonts',express.static(__dirname+'/node_modules/material-design-icons/iconfont'));   // set the static | files location /app/img will be /img for users
app.use(express.static(__dirname + '/app'));		// set the static | files location /app/img will be /img for users
app.use(morgan('dev'));								// log every request to the console
app.use(bodyParser.json());							// parse application/json
app.use(methodOverride());							// simulate DELETE and PUT
app.use(cookieParser());							// parse cookies
app.use(session({
	secret: '4qewWLlCpAB8T2K',
	saveUninitialized : true,
	resave : true,
	// store : new MongoStore({ 	//using mongo-connect features
	// 	url: dbconnection.url,
	// 	ttl: sessionConfig.ttl,
	// //	autoRemove: 'disabled',
	// 	clear_interval: -1
	// })
}))

app.use(bodyParser.urlencoded({						// parse application/x-www-form-urlencoded
  extended: true,
  uploadDir: './EDIFiles/temp'
}));
//app.use(multer({ dest: './EDIFiles/'})) 				// For handling multipart/form-data

app.use(multer({dest:'./EDIFiles/'}).single('file'));		//For handing multipart/form-data

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}



// app.post('/api/user/session/',(req,res)=>{
// 	// console.log(req.session);
// 	if(req.session.user)
// 	{
// 		console.log("name :"+req.session.name)
// 		res.send({ status:true , privilege : req.session.privilege,name : req.session.name });
// 	}
// 	else
// 	{
// 		res.send({ status:false , privilege : -1 });
// 	}
// });

// app.post('/api/user/authenticate',(req,res) =>{
// 	var params=req.body;
// 	var username=params.user;
// 	var password=params.password;
// 	var userFound=false;
// 	console.log(params);
// 	console.log(username);
// 	console.log(password);
// 	if(username==null||username==''||password==null||password=='')
// 	{
// 		res.send({status:false,message:'Parameter Problem'});
// 	}
// 	else
// 	{
// 		req.session.user=username;
// 		req.session.privilege=0;
// 		req.session.name="admin";
// 		res.send({status:true,message:'Authentication Success'});
// 	}
// }
// );
// START THE SERVER
// ==============================================

//server.listen(port, () => { console.log('listening on 3000') });
console.log('Magic happens on port ' + port);