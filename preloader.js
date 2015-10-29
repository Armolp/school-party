var preloader = new Kiwi.State( "preloader" );

// Loading assets
preloader.preload = function() {

	Kiwi.State.prototype.preload.call( this );

	this.addImage( "loadingImg", "assets/loadingImage.png", true );
};


preloader.create = function() {

	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "loadState" );
};