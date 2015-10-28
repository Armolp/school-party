function clearMenu(menu) {
	console.log(menu);
	menu.container.parentElement.removeChild(menu.container);
	/*while (menu.container.hasChildNodes()) {   
	    menu.container.removeChild(menu.container.firstChild);
	}*/
}

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 768,
	height: 512
}

var game = new Kiwi.Game('content', 'game', null, gameOptions);

game.states.addState( loadState );
game.states.addState( mainMenuState );
game.states.addState( newCharState );

game.states.switchState( "loadState" );