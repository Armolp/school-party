//Initialise the Kiwi Game. 
var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 600
}
 
var game = new Kiwi.Game('content', 'mygame', null, gameOptions);
 
//Add all the States we are going to use.
game.states.addState( Loading );
game.states.addState( Play );
game.states.switchState( "Loading" );