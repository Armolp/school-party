/*
Load assets used in the scene
*/

var LoadingState = new Kiwi.State( "LoadingState" );

LoadingState.preload = function () {

	Kiwi.State.prototype.preload.call( this );

	this.game.stage.color = "000000";
    
    // Nave 
    this.addImage( 
    	"Nave", 
    	"assets/img/Naveesp.png" );

    //Enemigos
      this.addImage( 
      	"enemigos", 
    	"assets/img/ENE.png" );

    // Particle sprites
	this.addImage(
		"particle",
		"assets/img/particle_01.png" );
//laser
this.addImage(
    "Laser",
    "assets/img/laser.png" );
//exp
this.addSpriteSheet(
    "Exp",
    "assets/img/expsp.png",192,207 );
//laser2
this.addImage(
 "laser2",
 "assets/img/lf.png" );
//ui
this.addImage(
"scoreImg",
"assets/img/puntuacion.png");
};
LoadingState.create = function() {

	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "PlayState" );
};
