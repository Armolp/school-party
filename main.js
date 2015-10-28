var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 768,
	height: 512
}

var game = new Kiwi.Game('content', 'game', null, gameOptions);

game.states.addState( loadState );
game.states.addState( mainMenuState );

game.states.switchState( "loadState" );