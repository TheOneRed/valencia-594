function Scenery() {
	Entity.call(this);
	
	this.draw = function() { throw "Override Scene.draw"; };
	
	this.resized = function() {
		this.offX = this.width / 2;
		this.offY = this.height / 2;
	}
};

Scenery.prototype = Object.create(Entity.prototype);
