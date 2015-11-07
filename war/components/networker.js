function Networker(player, players) {
	
	var channel, socket, token;
	
	$.ajax({
		url: "/mmo/join", 
		// method: "GET",
		type: "GET",
		dataType : "json",
		success: function(result){
			
			$.each(result, function(key,val) {
				switch(key) {
					case "userName":
						player.setName(val);
						break;
					case "token":
						token = val;
						break;
					default:
				}
			});
			
			channel = new goog.appengine.Channel(token);
			socket = channel.open();
			socket.onopen = onOpened;
			socket.onmessage = onMessage;
			socket.onerror = onError;
			socket.onclose = onClose;
		}
	});
	
	var onOpened = function() {
		console.log("opened");
	};
	var onMessage = function(msg) {
		// update game state
		var jsonMsg = jQuery.parseJSON(msg["data"]);
		
		jsonMsg.players.forEach(function(player) {
			// if not exist in players
			if (players[player["userId"]] === undefined) {
				// make new player
				players[player["userId"]] = new Player(player["userName"]);
			}
			
			// find player
			var updPlayer = players[player["userId"]];
			
			// set updates
			if (player["worldX"] != undefined) {
				updPlayer.worldX = parseFloat(player["worldX"]);
			}
			if (player["worldY"] != undefined) {
				updPlayer.worldY = parseFloat(player["worldY"]);
			}
			if (player["message"] != undefined) {
				updPlayer.say(player["message"]);
			}
			
			players[player["userId"]] = updPlayer;
		});
	};
	var onError = function(err) {
		console.log(err);
	};
	var onClose = function() {
		console.log("close");
	};
	
	this.update = function() {
		$.ajax({
			url: "/mmo/update", 
			type: "POST",
			data : {"worldX" : player.worldX, "worldY" : player.worldY}
		});
	};
	
	this.updateSpeech = function(message) {
		$.ajax({
			url: "/mmo/update", 
			type: "POST",
			data : {"message" : message}
		});
	};
	
	setInterval(this.update, 500);
}