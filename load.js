var loadState = new Kiwi.State( "loadState" );

loadState.preload = function() {

	Kiwi.State.prototype.preload.call( this );

	//this.addImage( "background", "background.png" );
	//this.addSpriteSheet( "characterSprite", "character.png", 150, 120 );
};


loadState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "gameState" );
}