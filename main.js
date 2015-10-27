var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 400,
	height: 600
}

var game = new Kiwi.Game('content', 'game', null, gameOptions);

game.states.addState( loadState );
game.states.addState( gameState );

game.states.switchState( "loadState" );