var DRAW_FPS = 60;

//requestAnimationFrame layer by Paul Irish
window.requestAnimationFrame = (function(){
	return  window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function(callback, element){
		window.setTimeout(callback, 1000 / DRAW_FPS);
	};
})();

function Engine(parentId) {
	
	var camera = new Camera();
	var player;
	var players = {};
	var backgrounds = [];
	var controller;
	var networker;
	
	var moveListeners = [];
   	var speakListeners = [];
   	var winResizeListener = [];
   	
   	var self = this;
   	
	var animate = function() {
		requestAnimationFrame(animate);
		draw();
	};
   	
	var draw = function() {
		
		// optimizing
		var redraw = false;
		backgrounds.forEach(function(background){
			redraw = redraw || background.redraw;
		});
		for (var id in self.players) {
			var otherPlayer = self.players[id];
			redraw = redraw || otherPlayer.redraw;
			otherPlayer.uiObjects.forEach(function(uiObj) {
				redraw = redraw || uiObj.redraw;				
			});
		};
		redraw = redraw || player.redraw;
		player.uiObjects.forEach(function(uiObj) {
			redraw = redraw || uiObj.redraw;				
		});
		if (!redraw) return;
		
		// drawing
		camera.clear();
				
		backgrounds.forEach(function(background){
			background.draw();
			camera.drawEntity(background);
		});
		
		// draw others
		for (var id in players) {
			var otherPlayer = players[id];
			otherPlayer.draw();
			camera.drawEntity(otherPlayer);
		};
		
		player.draw();
		camera.drawEntity(player);
		
		// draw others
		for (var id in players) {
			var otherPlayer = players[id];
			otherPlayer.uiObjects.forEach(function(uiObj) {
				uiObj.draw();
			});
			camera.drawUiObjects(otherPlayer);
		};
		
		// draw self
		player.uiObjects.forEach(function(uiObj) {
			uiObj.draw();
		});
		camera.drawUiObjects(player);
	};
	
   	var addListener = function(event, listener, callback) {
   		
   		if (!event || !listener || !callback) return;
   		
   		var listeners;   		
   		switch (event) {
   		case "move": 
   			listeners = moveListeners;
   			break;
   		case "speak":
   			listeners = speakListeners;
   			break;
   		case "window-resize":
   			listeners = winResizeListener;
   			break;
   		}
   		
   		if (listeners) {
   			listeners.push([listener, callback]);
   		}
   	};
   	
   	var callEvent = function(event, obj) {
   		
   		var listeners;   		
   		switch (event) {
   		case "move": 
   			listeners = moveListeners;
   			break;
   		case "speak":
   			listeners = speakListeners;
   			break;
   		case "window-resize":
   			listeners = winResizeListener;
   			break;
   		}
   		
   		if (listeners) {
   			listeners.forEach(function(listener) {
   	   			listener[1](obj);
   	   		});
   		}   		
   	}
		
	var init = function() {
		document.getElementById(parentId).appendChild(camera.canvas);
		$(camera.canvas).attr("tabindex", "0");
		$(camera.canvas).focus();
		camera.move(0,0);
		camera.resize($(window).width() - 2, $(window).height() - 2);
		
		var chatbox = document.createElement("input");
		document.getElementById(parentId).appendChild(chatbox);
		chatbox.setAttribute("id", "chatbox");
		chatbox.setAttribute("type", "text");
		$(chatbox).hide();
		
		player = new Player("lost soul");
		player.move(0,0);
		
		var background = makeBackground(camera.width, camera.height);		
		backgrounds.push(background);
		
		var backgrid = makeBackgrid(camera.width, camera.height);
		backgrounds.push(backgrid);
		
		
		controller = new Controller(camera, chatbox, callEvent);
		networker = new Networker(player, players);
		
		
		addListener("move", player, function(e) {
			player.move(player.worldX + e.deltaX, player.worldY + e.deltaY);
		});
		addListener("move", camera, function() {
			camera.move(player.worldX, player.worldY);
		});
		backgrounds.forEach(function(background) {
			addListener("move", background, function() {
				background.move(player.worldX, player.worldY);
			});
		});
		
		addListener("speak", player, function(e) {
			player.say(e.line);
		});
		addListener("speak", networker, function(e) {
			networker.updateSpeech(e.line);
		});
		
		addListener("window-resize", camera, function(e) {
			camera.resize(e.width, e.height);
		});
		backgrounds.forEach(function(background) {
			addListener("window-resize", background, function(e) {
				background.resize(e.width, e.height);
			});
		});
	};
	
	init();
   	animate();
};
