function Camera() {
	Entity.call(this);
	
	this.drawEntity = function(obj) {
		var midX = this.width / 2;
		var midY = this.height / 2;
		var dWorldX = obj.worldX - this.worldX;
		var dWorldY = obj.worldY - this.worldY;
		var dX = dWorldX - obj.offX;
		var dY = -dWorldY - obj.offY;
		
		if (((dX + obj.width < -midX) || (dX > midX)) &&
				((dY + obj.height < -midY) || (dY > midY))) {
			return;
		}
		
		this.context.drawImage(obj.canvas, midX + dX, midY + dY);
	};
	
	this.drawUiObjects = function(obj) {
		var midX = this.width / 2;
		var midY = this.height / 2;
		var dWorldX = obj.worldX - this.worldX;
		var dWorldY = obj.worldY - this.worldY;
		var dX = dWorldX - obj.offX;
		var dY = -dWorldY - obj.offY;
		
		var self = this;
		obj.uiObjects.forEach(function(uiObj) {
			if (!uiObj.show) return; 
			var dX2 = dX + uiObj.offX;
			var dY2 = dY + uiObj.offY
			if (((dX2 + uiObj.width < -midX) || (dX2 > midX)) &&
					((dY2 + uiObj.height < -midY) || (dY2 > midY))) {
				return;
			}
			
			self.context.drawImage(uiObj.canvas, midX + dX2, midY + dY2);
		});
	};
	
};

Camera.prototype = Object.create(GameObject.prototype);
