function Entity() {
	
	GameObject.call(this);
	this.id = "entity";
	this.worldX = 0;	// world coordinates
	this.worldY = 0;
	this.offX = 0;	// offset from center of object on canvas
	this.offY = 0;
	
	this.uiObjects = [];
	
	
	this.move = function(newX, newY) {
		this.worldX = newX;
		this.worldY = newY;
		this.redraw = true;
		this.moved();
	}
	
	this.moved = function() { };
};

Entity.prototype = Object.create(GameObject.prototype);
