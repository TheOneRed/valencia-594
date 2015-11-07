function Creature() {
	
	Entity.call(this);	
	this.name = new UiName("creature");
	this.speech = new UiSpeech();	
	this.uiObjects.push(this.name);
	this.uiObjects.push(this.speech);
	
	var self = this;
	
	this.say = function(text) {
		if (text === "" || text.length > Creature.TEXT_LIMIT) return;
		
		this.speech.text.push(text);
		if (this.speech.text.length > Creature.LINES_LIMIT) this.speech.text.shift();
		
		this.speech.redraw = true;
		
		setTimeout(function(){
			self.speech.text.shift();
			self.speech.redraw = true;
		}, Creature.TEXT_DURATION);
	};
	
	this.setName = function(newName) {
		this.name.setName(newName);
		this.resized();
	}
};

Creature.prototype = Object.create(Entity.prototype);
Creature.TEXT_DURATION = 3000;
Creature.LINES_LIMIT = 10;
Creature.TEXT_LIMIT = 100;