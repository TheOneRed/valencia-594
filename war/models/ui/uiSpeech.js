function UiSpeech() {
	UiObject.call(this);
	
	this.text = [];
	
	this.draw = function() {
		if (this.redraw) {
			this.show = (this.text != "");
			
			var lines = this.splitLines();
						
			this.context.font = UiSpeech.FONT_SIZE + "px " + UiSpeech.FONT;
			
			var longest = "";
			lines.forEach(function(line){
				if (line.length > longest.length) {
					longest = line;
				}
			});
			
			this.width = this.canvas.width = 
				this.context.measureText(longest).width + UiSpeech.MARGIN * 2;
			this.height = this.canvas.height = 
				(UiSpeech.FONT_SIZE * lines.length) + UiSpeech.MARGIN * 2;
						
			this.context.fillStyle = UiSpeech.FONT_BG;
			this.context.fillRect(0,0,this.width,this.height);
			
			this.context.fillStyle = UiSpeech.FONT_COLOUR;
			this.context.font = UiSpeech.FONT_SIZE + "px " + UiSpeech.FONT;
			this.context.textAlign = "left"; 
			
			for (var i = 0; i < lines.length; i++) {
				this.context.fillText(lines[i], 0, (UiSpeech.FONT_SIZE * (i+1)));
			}
			
			this.offX = 0;
			this.offY = -this.height;
			
			this.redraw = false;
		}
	};
	
	this.splitLines = function() {
		
		var lines = [];
		
		this.text.forEach(function(line) {
			var buffer = "";
			var match;
			while ((match = UiSpeech.REGEX_WORD.exec(line)) != null) {
				
				var word = match[0];
				
				if (word.length <= UiSpeech.LINE_SIZE) {
					if (buffer === "") {
						buffer = word;
					} else {
						if (buffer.length + 1 + word.length < UiSpeech.LINE_SIZE) {
							buffer += " " + word;
						} else {
							lines.push(buffer);
							buffer = word;
						}
					}
				} else {
					var remainder = 0;
					if ((remainder = UiSpeech.LINE_SIZE - (buffer.length + 1 + 1)) <= 0) {
						buffer += " " + word.substring(0,remainder);
						word = word.substring(remainder);
					}
					if (buffer != "") {
						lines.push(buffer);						
					}
					
					var splits = word.match(UiSpeech.REGEX_SPLIT);
					buffer = splits.pop();
					
					splits.forEach(function(split){
						lines.push(split);
					});
				}
			}
			if (buffer != "") {
				lines.push(buffer);
			}
		});
		
		return lines;
	};
};

UiSpeech.prototype = Object.create(UiObject.prototype);
UiSpeech.FONT = "monospace";
UiSpeech.FONT_SIZE = 16;
UiSpeech.FONT_COLOUR = "rgba(0,0,0,1)";
UiSpeech.FONT_BG = "rgba(100,200,100,0.7)";
UiSpeech.MARGIN = 2;
UiSpeech.REGEX_WORD = /[\S]+/g;
UiSpeech.REGEX_SPLIT = /.{1,20}/g;
UiSpeech.LINE_SIZE = 20;
