/**
 * Module dependencies.
 */
var express = require('express'),
	snsclient = require('../');

var app = module.exports = express.createServer();
app.path = __dirname;

var port = process.env.PORT || 3000;
// Configuration

app.configure(function(){
	//temp 
	app.set('views', app.path + '/views');
	app.register('.html', require('ejs'));
	app.set('view engine', 'html');
	// Static Router, Render static at beginning
	app.use(express["static"](app.path + '/public'));
	// temp -end
	
  app.use(express.bodyParser());
  app.use(express.cookieParser());
	app.use(express.session({ 
		secret: 'sns-client_2hhxSfs2fh0asa'
	}));
  app.use(express.methodOverride());
  app.use(app.router);
});	

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

//set sns app info
var appInfos = {
	sina:{
		key: '{your sina key}',
		secret: '{your sina secret}',
	},
	wyx : {
		key: '{your wyx key}',
		secret: '{your wyx secret}',
	},
	renren : {
		key: '08abb4597fa546349ea8e2cc2a5bdac4',
		secret: '70af0efe35064d56b6ceec62650a00ab',
	}
}
snsclient.setDefaultAppinfo(appInfos.renren);

/**
 * Query middleware
 */
function queryCheck(req, res, next){
	var user = req.session.authorized_user;
	if(user && (!user.expire || user.expire > (new Date()).getTime() )){
		next('route');
	}else{
		// try check platform
		var info = snsclient.getInfoFromQuery(req.query);
		if(info.type){
			req.session.platform = info;
		}
		next();
	}	
};

app.get('/', queryCheck, function(req, res, next){
	var session = req.session,
		client;
		
	var platform = session.platform;
	if(platform){
		client = snsclient.createClient(platform.type, appInfos[platform.type]);
	}else{
		client = snsclient.createClient('sina'); // using default
	}
	client.authorize(req, res, function(err, user){
		if(err) next(new Error(JSON.stringify(err) ));
		else{
			req.session.authorized_user = user;
			next();	
		}
	});
});

/**
 * Account Check middleware
 */
function dataCheck(req, res, next){
	if(req.session.userdata) next('route');
	else next();
};
app.get('/', dataCheck, function(req, res, next){
	var user = req.session.authorized_user;
	var userid = req.session.platform.userid;
	userid = userid.substr( userid.lastIndexOf(".") + 1 );
	var type = user.platform;
	var	client = snsclient.createClient(type, appInfos[type], user);
	
	client.appfriends_ids(null, function(err, ids){
		if(err) next(new Error(JSON.stringify(err) ));
		else{
			ids.push(userid);
			console.log("userid=",ids.join(","));
			// next();	
			
			client.account_info({uids:ids.join(",")}, function(err, data){
				if(err) next(new Error(JSON.stringify(err) ));
				else{
					req.session.userdata = data;
					console.log(data);
					next();	
				}
			});
		}
	});
	
	
});

app.get('/', function(req, res){
	var txt = 'SNS Client! <br /><br /><br />'+ JSON.stringify(req.session.userdata);
	// res.send(txt);
	// temporary
	res.render("map", {layout:false, userdata: req.session.userdata });
});

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
