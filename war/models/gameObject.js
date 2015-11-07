function GameObject() {
	
	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.width = 1;
	this.height = 1;
	
	
	this.redraw = true;
	
	this.clear = function() { this.context.clearRect(0,0,this.canvas.width,this.canvas.height); };
	
	this.draw = function() { throw "Override GameObject.draw"; };
	
	
	this.registerEvents = function(engine) { };
	
	this.resize = function(newWidth, newHeight) {
		this.canvas.width = this.width = newWidth;
		this.canvas.height = this.height = newHeight;
		this.context.imageSmoothingEnabled = 
			this.context.mozImageSmoothingEnabled = 
				this.context.webkitImageSmoothingEnabled = 
					this.context.msImageSmoothingEnabled = false;
		this.redraw = true;
		this.resized();
	};
	
	this.resized = function() { };
	
	/*Object.observe(this, function(changes) {
		changes.forEach(function(change){
			if (change.name === "width" || change.name === "height") {
				change.object.canvas.width = change.object.width;
				change.object.canvas.height = change.object.height;
				change.object.context.imageSmoothingEnabled = 
					change.object.context.mozImageSmoothingEnabled = 
						change.object.context.webkitImageSmoothingEnabled = 
							change.object.context.msImageSmoothingEnabled = false;
				change.object.redraw = true;
				
				change.object.resized();
			}
		});
	},["update"]);*/
};
