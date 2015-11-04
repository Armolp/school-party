/*
Create the basic game framework
*/

var game = new Kiwi.Game(
	"content",
	"MyGame",
	null,
	{
		renderer: Kiwi.RENDERER_WEBGL,
		width: 768,
		height: 512,
		// NEW
		plugins: [ "ParticlesGL" ]
	} );

// Add all the States we are going to use.
game.states.addState( LoadingState );
game.states.addState( PlayState );

game.states.switchState( "LoadingState" );
