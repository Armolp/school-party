function clearMenu(element) {
	element.parentElement.removeChild(element);
}

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 768,
	height: 512
}

var game = new Kiwi.Game('content', 'game', null, gameOptions);

game.states.addState( preloader );
game.states.addState( loadState );

game.states.addState( mainMenuState );
game.states.addState( newCharState );
game.states.addState( loadGameState );
game.states.addState( instructionsState );
game.states.addState( creditsState );

game.states.addState( teacherRoomState );
game.states.addState( hallwayState );
game.states.addState( rouletteState );

game.states.addState( timelineGameState );
game.states.addState( catchGameState );
game.states.addState( mazeGameState );
game.states.addState( spaceGameState );

game.states.switchState( "preloader" );