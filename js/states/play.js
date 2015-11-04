/*
* Space 
*/

var PlayState = new Kiwi.State( "PlayState" );

PlayState.create = function () {
	this.width = game.stage.width;
	this.height = game.stage.height;
	this.mouse = this.game.input.mouse;
	this.speed = 3;
	this.currentlyShooting = false;


	// Particle Effect Creation
	this.backgroundStars = new Kiwi.GameObjects.StatelessParticles(
		this,
		this.textures.particle,
		this.width * 0.5,
		this.width * 0.5,
		stars);
	this.backgroundStars.rotation += Math.PI / 2;
	this.backgroundStars.startEmitting( true, false, 200 );

	// Display hierarchy
	this.addChild( this.backgroundStars );

};


PlayState.update = function () {

	Kiwi.State.prototype.update.call( this );


};


