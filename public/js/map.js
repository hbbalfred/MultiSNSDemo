/**
 * @author hbb
 */

define(function(require, exports, module){
	
	var view = new Ext.BaiduMap({
		zoom:15,
		listeners:{
			added: function(){
				view.loadMap();
			},
			loaded: function(){
				defineCustomeOverlay();
				
				_loadedCallback.apply(this, null);
			}
		}
	});
	
	
	var _loadedCallback = null;
	
	
	exports.view = view;
	exports.update = update;
	exports.loaded = loaded;
	
	
	function loaded(callback)
	{
		_loadedCallback = callback || function(){};
		return this;
	}
	function update(position)
	{
		if(view.isLoaded)
		{
			view.update( position.coords );
			
			createAvatar( position.coords );
		}
		return this;
	}
	
	function createAvatar( coords )
	{
		var pt = new BMap.Point( coords.longitude, coords.latitude );
		var overlay = new CustomOverlay( pt, "./cloud.jpg" );
		view.map.addOverlay( overlay );
	}
	
	
	var CustomOverlay;
	function defineCustomeOverlay()
	{
		
		// Define Overlay Component
		CustomOverlay = function( baiduMapPoint, imageUri ){
			BMap.Overlay.call(this);
			
			this._pt = baiduMapPoint;
			this._img = document.createElement("img");
			this._img.src = imageUri;
		}
		CustomOverlay.prototype.__proto__ = BMap.Overlay.prototype;
		CustomOverlay.prototype.initialize = function(map){
			this._map = map;
			// create container
			var div = this._div = document.createElement("div");
			div.style.position = "absolute";
			div.style.zIndex = BMap.Overlay.getZIndex(this._pt.lat);
			div.appendChild( this._img );
			map.getPanes().labelPane.appendChild(div);
			return div;
		}
		CustomOverlay.prototype.draw = function(){
			var map = this._map;
			var pixel = map.pointToOverlayPixel(this._pt);
			this._div.style.left = pixel.x + "px";
			this._div.style.top = pixel.y + "px";
		}
		
		
	}
});
