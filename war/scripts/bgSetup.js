var makeBackground = function(width, height) {
	var background = new Scenery();
	background.move(0,0);
	background.resize(width, height);
	
	background.gradient = background.context.createLinearGradient(0,0,background.width,background.height);
	background.gradient.addColorStop(0,"blue");
	background.gradient.addColorStop(1,"cyan");
	
	background.draw = function() {
		if (background.redraw) {
			background.context.fillStyle = background.gradient;
			background.context.fillRect(0,0,background.width,background.height);
			background.redraw = false;
		}
	};
	
	return background;
}

var makeBackgrid = function(width, height) {
	var backgrid = new Scenery();
	backgrid.move(0,0);
	backgrid.resize(width, height);		
	backgrid.gridSize = 1000;
	backgrid.context.fontSize = 50;
	
	backgrid.draw = function() {
		if (backgrid.redraw) {
			backgrid.clear();
			var halfWidth = backgrid.canvas.width / 2;
			var halfHeight = backgrid.canvas.height / 2;
			var leftEdge = this.worldX -  halfWidth;
			var rightEdge = this.worldX + halfWidth;
			var topEdge = this.worldY + halfHeight;
			var bottomEdge = this.worldY - halfHeight;
			
			var vPoses = [];
			
			backgrid.context.beginPath();
			backgrid.context.strokeStyle = backgrid.context.fillStyle = "rgba(100,100,100,1)";
			backgrid.context.lineWidth = 3;
			backgrid.context.font = backgrid.context.fontSize + "px monospace";
			
			for (var vPos = (leftEdge - (leftEdge % backgrid.gridSize) - backgrid.gridSize); vPos < rightEdge + backgrid.gridSize; vPos += backgrid.gridSize) {
				var vLine = vPos - leftEdge;
				backgrid.context.moveTo(vLine, 0);
				backgrid.context.lineTo(vLine, this.height);
				
				vPoses.push(vPos);
			}
			
			for (var hPos = (bottomEdge - (bottomEdge % backgrid.gridSize) - backgrid.gridSize); hPos < topEdge + backgrid.gridSize; hPos += backgrid.gridSize) {
				var hLine = backgrid.height - hPos + bottomEdge;
				backgrid.context.moveTo(0, hLine);
				backgrid.context.lineTo(this.width, hLine);
				
				var hSteps = ~~(hPos / backgrid.gridSize);
				var hStr = (hSteps == 0 ? "-0" : (hSteps < 0 ? "S" : "N") + Math.abs(hSteps));
				vPoses.forEach(function(vPos) {
					var vSteps = ~~(vPos / backgrid.gridSize);
					var vStr = (vSteps == 0 ? ":0" : (vSteps > 0 ? "E" : "W") + Math.abs(vSteps));
					backgrid.context.fillText(hStr, vPos-leftEdge+2, backgrid.height - hPos + bottomEdge + backgrid.context.fontSize);
					backgrid.context.fillText(vStr, vPos-leftEdge+2, backgrid.height - hPos + bottomEdge + backgrid.context.fontSize * 2);
				});
			}
			backgrid.context.stroke();
			backgrid.redraw = false;
		}
	};
	
	return backgrid;
}