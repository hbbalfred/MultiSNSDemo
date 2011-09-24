/**
 * DEVELOPMENT Environment settings
 */
exports.configApp = function(app,express) {
	// Database connection
	app.set('db-uri', 'mongodb://1poqgzuv4spsk:g07ur39pktr@127.0.0.1:20088/mqrhzp69a271q');

	// Google Analytics Key
	app.set('google-analytics-key', 'XXXXXXXX');

	// cdn url config
	app.set('cdn-url','http://multisns.cnodejs.net');
	
	// App url config
	app.set('server-url', 'http://multisns.cnodejs.net');
  
	// renren app
	app.set('rr-key', '576ae21a8ee44f48a020dd7c3a8ad04a');
	app.set('rr-secret', 'f98882c139bf4c76867ce5b0cc3793d8');
  
	// sina app
	app.set('sina-key', '971971272');
	app.set('sina-secret', '26a3a814f45b908dd5e3dd819937a19d');
};

// SocketIO Configure
exports.configIO = function(io) {
	io.set('log level', 4);
	io.set('transports', [
		'websocket'	
	  , 'htmlfile'
	  , 'xhr-polling'
	  , 'jsonp-polling'
	]);
};

