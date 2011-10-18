/**
 * @author hbb
 */

define(function(require, exports, module){
	var defaultWatchOptions = { frequency: 3000 };
	var emptyFn = function(){};
	
	var _watchID = null;
	var _updateCallback = null;
	var _errorCallback = null; 
	
	exports.startWatch = function( options )
	{
		start( options );
		return this;
	};
	exports.stopWatch = function()
	{
		stop();
		return this;
	};
	exports.update = function(callback)
	{
		_updateCallback = callback || emptyFn;
		return this;
	};
	exports.error = function(callback)
	{
		_errorCallback = callback || emptyFn;
		return this;
	};
	
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	function onSuccess(position) {
		_updateCallback.apply( this, arguments );
	}
	
	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    _errorCallback.apply( this, arguments );
	}
	
	function start( options )
	{
		stop();
		_watchID = navigator.geolocation.watchPosition(onSuccess, onError, options || defaultWatchOptions);
	}
	
	function stop()
	{
		if( null === _watchID ) return;
		
		navigator.geolocation.clearWatch( _watchID );
	}
});