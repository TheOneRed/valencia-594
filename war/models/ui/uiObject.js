function UiObject() {
	GameObject.call(this);
	
	this.offX = 0;	// offset from the host
	this.offY = 0;	// set by host
	
	this.show = true;
};

UiObject.prototype = Object.create(GameObject.prototype);