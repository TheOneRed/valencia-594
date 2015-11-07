function Player(playerName) {
	
	Creature.call(this);
	this.radius = Player.RADIUS;
	this.resize(this.radius * 2, this.radius * 2);
	
	this.draw = function() {
		if (this.redraw) {
			this.clear();
			
			this.context.fillStyle = Player.COLOR;
			this.context.strokeStyle = "#000";
			this.context.lineWidth = 3;
			
			this.context.beginPath();
			this.context.arc(this.radius, this.radius, this.radius-2, 0, 2*Math.PI);
			this.context.fill();
			this.context.stroke();
			this.redraw = false;
		}
	};
	this.draw();
	
	this.resized = function() {
		this.offX = this.offY = this.radius;		
		this.name.offX = (this.canvas.width / 2) - (this.name.canvas.width /2);
		this.name.offY = this.height + 3;
		this.name.redraw = true;
		this.speech.offX = 0;
		this.speech.offY = -this.speech.height - 3;
		this.speech.redraw = true;
	};	
	this.resized();
	this.setName(playerName);
};

Player.prototype = Object.create(Entity.prototype);
Player.RADIUS = 20;
Player.SPEED = 300;
Player.COLOR = "rgba(100,100,100,1)";
