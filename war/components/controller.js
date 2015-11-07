function Controller (camera, chatbox, callEvent) {
		
	this.lastUpdate = new Date();
	
	var up = false;
	var down = false;
	var left = false;
	var right = false;
	
	var relWorldX = 0;
	var relWorldY = 0;
	
	var self = this;
	
	this.update = function() {
		var now = new Date();
		var dt = now - self.lastUpdate;
		self.lastUpdate = now;
		
		var udlr = up || down || left || right;
		
		var dX = 0;
		var dY = 0;
		
		if (udlr) {
			relWorldX = relWorldY = 0;
			dX = (left ? -1 : 0) + (right ? 1 : 0);
			dY = (up ? 1 : 0) + (down ? -1 : 0);
		} else {
			dX = relWorldX || 0;
			dY = relWorldY || 0;
		}
		
		if (dX == 0 && dY == 0) return;
		
		var theta = Math.atan(dY/dX) - (dX < 0 ? Math.PI : 0);
		var r = Player.SPEED * dt / 1000;
		
		dX = dX != 0 ? Math.cos(theta) * r : 0;
		dY = dY != 0 ? Math.sin(theta) * r : 0;
		
		if (!udlr) {
			dX = Math.abs(dX) < Math.abs(relWorldX) ? dX : relWorldX; 
			dY = Math.abs(dY) < Math.abs(relWorldY) ? dY : relWorldY;
			relWorldX -= dX;
			relWorldY -= dY;
		}
		
		callEvent("move", {deltaX : dX, deltaY : dY});
	}
		
	$(camera.canvas).click(function(e) {
		var offset = $(this).offset();
		relWorldX = (e.pageX - offset.left) - (this.width /2);
		relWorldY = -(e.pageY - offset.top) + (this.height /2);
		self.update();
	});
	
	$(camera.canvas).on("keydown keyup", function(e) {
		var moved = false;
	    switch (e.keyCode) {
	        case 37:
	        	left = (e.type == "keydown");
	        	moved = true;
	            break;
	        case 38:
	        	up = (e.type == "keydown");
	        	moved = true;
	            break;
	        case 39:
	        	right = (e.type == "keydown");
	        	moved = true;
	            break;
	        case 40:
	        	down = (e.type == "keydown");
	        	moved = true;
	            break;
	        case 13:
	        	if (e.type == "keydown") { $("#chatbox").show().focus(); };
	        	break;
	    }
	    if (moved) self.update();
	});
	
	$(chatbox).on("keydown",function (e) {
	    if(e.keyCode == 13) {
	        if ($(this).val() === "") {
	        	$(this).hide();
	        	$(camera.canvas).focus();
	        } else {
	        	callEvent("speak", {line : $(this).val()});
		        $(this).val("");
	        }
	    }
	});
	
	$(window).resize(function() {
		callEvent("window-resize", {width : $(window).width(), height : $(window).height()});
	});
	
	setInterval(this.update, 1000/DRAW_FPS);
};