var loadState = new Kiwi.State( "loadState" );

loadState.preload = function() {

	Kiwi.State.prototype.preload.call( this );

	this.addImage( "backgroundWood", "wood-background.png" );
	this.addImage( "newCharImg", "newChar.png" );
	this.addImage( "saveCharImg", "saveChar.png" );
	this.addImage( "instructionsImg", "instructions.png" );
	//this.addSpriteSheet( "characterSprite", "character.png", 150, 120 );
};


loadState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "mainMenuState" );
}