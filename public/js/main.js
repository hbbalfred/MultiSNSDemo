/**
 * @author hbb
 */

define(function(require, exports, module){
	
	var map = require("./map");
	var geo = require("./geo");
	
	Ext.setup({onReady:function(){
		/*
		Ext.regModel("User", {
			fields:["id", "name", "imageUrl"]
		});
		
		var list = new Ext.List({
			itemTpl:["<div>",
				"<img src='{imageUrl}' />",
				"<span>{name}</span>",
			"</div>"],
			store: new Ext.data.JsonStore({
				model:"User",
				data:ejs.userdata,
			}),
		});
		*/
		var container = new Ext.Container({
			fullscreen:true,
			layout:"card",
			items:[
				// list,
				map.view
			]
		});
		var view = new Ext.Container({
			fullscreen: true,
			items:container,
		});
	}});
	
	map.loaded(function(){
		geo.startWatch().update( map.update );
	});
	
	
});

// 
	// init: function() {
				// var self = this;
				// this.requires("2D");
// //				this._shakerCount = 0;
				// console.debug('shaker init');
				// /**
				 // * check valid of shake
				 // */
				// var checkValid = function(acc){
					// var abs = Math.abs;
					// return abs( acc.x ) > 10
						// || abs( acc.y ) > 10
						// || abs( acc.z ) > 10;
				// };
				// /**
				 // * hit target (monster)
				 // */
				// var hitTarget = function(){
					// var target = self.gameData.monster;
					// target.hp -= 10;
					// self.trigger("hit",target.hp);
					// self.attr("gameData",{monster:target});
				// };
				// // to start watching accelerometer
				// var onError = function(){ console.warn('accelerometer error in shaker component'); };
				// var onSuccess = function(acc){
					// if( checkValid( acc ) ){
						// console.debug('shaker success');
						// // start play
						// if( self._started !== true){
							// self.startPlay();
						// }
						// hitTarget();
					// }
				// };
				// var accId = navigator.accelerometer.watchAcceleration(
					// onSuccess,
					// onError,
					// { frequency: 500 }
				// );
// 				
				// // clear watch of accelerometer if component is destroied
				// this.bind("Remove", function(){
					// console.debug('shaker destroy');
					// if( accId === undefined ) return;
					// navigator.accelerometer.clearWatch( accId );
				// });
			// },