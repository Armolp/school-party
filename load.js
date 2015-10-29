var loadState = new Kiwi.State( "loadState" );

loadState.preload = function() {

	Kiwi.State.prototype.preload.call( this );

	this.addImage( "backgroundMainMenu", 	"assets/mainMenuBG.png" );
	this.addImage( "backgroundWood", 		"assets/wood-background.png" );
	this.addImage( "newCharImg", 			"assets/newChar.png" );
	this.addImage( "saveCharImg", 			"assets/saveChar.png" );
	this.addImage( "instructionsImg", 		"assets/instructions.png" );
	this.addImage( "creditsImg", 			"assets/credits.png" );
	this.addImage( "teacherRoomImg", 		"assets/teacherRoom.png" );
	this.addImage( "squareImg", 			"assets/red square.png" );
	this.addSpriteSheet( "characterSprite", "assets/character.png", 150, 120 );
};


loadState.create = function(){

	Kiwi.State.prototype.create.call( this );
	this.game.states.switchState( "mainMenuState" );
}