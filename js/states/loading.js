/*
Load assets used in the scene
*/

var LoadingState = new Kiwi.State( "LoadingState" );

LoadingState.preload = function () {

	Kiwi.State.prototype.preload.call( this );

	this.game.stage.color = "000000";

	this.addImage(
		"spaceground",
		"assets/img/spaceground.png" );
	this.addSpriteSheet(
		"FlameSprite",
		"assets/img/FlameSprite.png",
		300,
		300 );

	// NEW
	// Particle sprites
	this.addImage(
		"particle",
		"assets/img/particle_01.png" );
};

LoadingState.create = function() {

	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "PlayState" );
};
