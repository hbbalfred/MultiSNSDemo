/**
 * DEVELOPMENT Environment settings
 */
exports.configApp = function(app,express) {
	// Database connection
	app.set('db-uri', 'mongodb://localhost/axegang-dev');

	// Google Analytics Key
	app.set('google-analytics-key', 'XXXXXXXX');

	// cdn url config
	app.set('cdn-url','http://axedomain.bois.com');
	
	// App url config
	app.set('server-url', 'http://axedomain.bois.com');
  
	// renren app
	app.set('rr-key', '{key}');
	app.set('rr-secret', '{secret}');
  
	// sina app
	app.set('sina-key', '{key}');
	app.set('sina-secret', '{secret}');
};

// SocketIO Configure
exports.configIO = function(io) {
	io.set('log level', 4);
	io.set('transports', ['websocket']);
};

