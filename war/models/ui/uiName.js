function UiName(name) {
	UiObject.call(this);
	
	this.name = name;
	
	this.draw = function() {
		if (this.redraw) {			
			this.context.fillStyle = UiName.FONT_BG;
			this.context.fillRect(0,0,this.width,this.height);
			
			this.context.fillStyle = UiName.FONT_COLOUR;
			this.context.font = UiName.FONT_SIZE + "px " + UiName.FONT;
			this.context.textAlign = "center"; 
			this.context.fillText(this.name, this.width / 2, UiName.FONT_SIZE);
			
			this.redraw = false;
		}
	};
	
	this.setName = function(newName) {
		this.name = newName;
		
		this.context.font = UiName.FONT_SIZE + "px " + UiName.FONT;
		
		this.width = this.canvas.width = 
			this.context.measureText(this.name).width + UiName.MARGIN * 2;
		this.height = this.canvas.height = 
			UiName.FONT_SIZE + UiName.MARGIN * 2;
		
		this.redraw = true;
	}
	
	this.draw();
	this.setName(this.name);
};

UiName.prototype = Object.create(UiObject.prototype);
UiName.FONT = "monospace";
UiName.FONT_SIZE = 14;
UiName.FONT_COLOUR = "rgba(0,0,0,1)";
UiName.FONT_BG = "rgba(255,255,0,0.5)";
UiName.MARGIN = 2;
