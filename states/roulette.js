var rouletteState = new Kiwi.State( "rouletteState" );

rouletteState.create = function(){

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundWood, 0, 0);

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Roulette Room');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 50;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    
    var menuW = 100;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnSpace = new Kiwi.HUD.Widget.MenuItem( this.game, 'Space', -menuW, 0 );
    this.bttnSpace.style.color = 'white';
    this.bttnSpace.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnSpace.style.display = 'block';
    this.bttnSpace.style.boxSizing = 'border-box';
    this.bttnSpace.style.width = (menuW * 2).toString() + 'px';
    this.bttnSpace.style.textAlign = 'center';
    this.bttnSpace.style.cursor = 'pointer';
    this.bttnSpace.style.padding = '0.5em 1em';
    this.bttnSpace.style.backgroundColor = '#9c0';

    this.bttnTimeline = new Kiwi.HUD.Widget.MenuItem( this.game, 'Timeline', -menuW, 60 );
    this.bttnTimeline.style.color = 'white';
    this.bttnTimeline.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnTimeline.style.display = 'block';
    this.bttnTimeline.style.boxSizing = 'border-box';
    this.bttnTimeline.style.width = (menuW * 2).toString() + 'px';
    this.bttnTimeline.style.textAlign = 'center';
    this.bttnTimeline.style.cursor = 'pointer';
    this.bttnTimeline.style.padding = '0.5em 1em';
    this.bttnTimeline.style.backgroundColor = '#c09';

    this.bttnCatch = new Kiwi.HUD.Widget.MenuItem( this.game, 'Catch', -menuW, 120 );
    this.bttnCatch.style.color = 'white';
    this.bttnCatch.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnCatch.style.display = 'block';
    this.bttnCatch.style.boxSizing = 'border-box';
    this.bttnCatch.style.width = (menuW * 2).toString() + 'px';
    this.bttnCatch.style.textAlign = 'center';
    this.bttnCatch.style.cursor = 'pointer';
    this.bttnCatch.style.padding = '0.5em 1em';
    this.bttnCatch.style.backgroundColor = '#09c';

    this.bttnPairs = new Kiwi.HUD.Widget.MenuItem( this.game, 'Pairs', -menuW, 180 );
    this.bttnPairs.style.color = 'white';
    this.bttnPairs.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnPairs.style.display = 'block';
    this.bttnPairs.style.boxSizing = 'border-box';
    this.bttnPairs.style.width = (menuW * 2).toString() + 'px';
    this.bttnPairs.style.textAlign = 'center';
    this.bttnPairs.style.cursor = 'pointer';
    this.bttnPairs.style.padding = '0.5em 1em';
    this.bttnPairs.style.backgroundColor = '#9c0';

    this.bttnMaze = new Kiwi.HUD.Widget.MenuItem( this.game, 'Maze', -menuW, 240 );
    this.bttnMaze.style.color = 'white';
    this.bttnMaze.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnMaze.style.display = 'block';
    this.bttnMaze.style.boxSizing = 'border-box';
    this.bttnMaze.style.width = (menuW * 2).toString() + 'px';
    this.bttnMaze.style.textAlign = 'center';
    this.bttnMaze.style.cursor = 'pointer';
    this.bttnMaze.style.padding = '0.5em 1em';
    this.bttnMaze.style.backgroundColor = '#c09';

    this.bttnConnect = new Kiwi.HUD.Widget.MenuItem( this.game, 'Connect', -menuW, 300 );
    this.bttnConnect.style.color = 'white';
    this.bttnConnect.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnConnect.style.display = 'block';
    this.bttnConnect.style.boxSizing = 'border-box';
    this.bttnConnect.style.width = (menuW * 2).toString() + 'px';
    this.bttnConnect.style.textAlign = 'center';
    this.bttnConnect.style.cursor = 'pointer';
    this.bttnConnect.style.padding = '0.5em 1em';
    this.bttnConnect.style.backgroundColor = '#09c';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, 120 );
    this.menu.addMenuItem( this.bttnSpace );
    this.menu.addMenuItem( this.bttnTimeline );
    this.menu.addMenuItem( this.bttnCatch );
    this.menu.addMenuItem( this.bttnPairs );
    this.menu.addMenuItem( this.bttnMaze );
    this.menu.addMenuItem( this.bttnConnect );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.swchSpace, this );
    this.menu.getMenuItem(1).input.onDown.add( this.swchTimeline, this );
    this.menu.getMenuItem(2).input.onDown.add( this.swchCatch, this );
    this.menu.getMenuItem(3).input.onDown.add( this.swchPairs, this );
    this.menu.getMenuItem(4).input.onDown.add( this.swchMaze, this );
    this.menu.getMenuItem(5).input.onDown.add( this.swchConnect, this );

    //this.addChild(this.background);
    this.addChild(this.textField);
};

rouletteState.update = function(){

    Kiwi.State.prototype.update.call( this );

};

rouletteState.swchSpace = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "spaceGameState" );
}
rouletteState.swchTimeline = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "timelineGameState" );
}
rouletteState.swchCatch = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "catchGameState" );
}
rouletteState.swchPairs = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "pairsGameState" );
}
rouletteState.swchMaze = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "mazeGameState" );
}
rouletteState.swchConnect = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "connectState" );
}

