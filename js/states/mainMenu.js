var mainMenuState = new Kiwi.State( "mainMenuState" );

mainMenuState.create = function(){

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundMainMenu, 0, 0);

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Temporary Title Header');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 50;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    
    var menuW = 100;

    // Adds a menu widget to the defaultHUD of the game.
    /*
    this.bttnNew = new Kiwi.HUD.Widget.MenuItem( this.game, 'New Game', -menuW, 0 );
    this.bttnNew.style.color = 'rgb(255,226,130)';
    this.bttnNew.style.fontFamily = 'Verdana,sans-serif';
    this.bttnNew.style.display = 'block';
    this.bttnNew.style.boxSizing = 'border-box';
    this.bttnNew.style.width = (menuW * 2).toString() + 'px';
    this.bttnNew.style.textAlign = 'center';
    this.bttnNew.style.cursor = 'pointer';
    this.bttnNew.style.padding = '0.5em 1em';
    this.bttnNew.style.backgroundColor = 'transparent';
    this.bttnNew.style.border = "solid 2px rgb(255,226,130)";
    */

    this.bttnLoad = new Kiwi.HUD.Widget.MenuItem( this.game, 'Load Game', -menuW, 20 );
    this.bttnLoad.style.color = 'rgb(255,226,130)';
    this.bttnLoad.style.fontFamily = 'Verdana,sans-serif';
    this.bttnLoad.style.display = 'block';
    this.bttnLoad.style.boxSizing = 'border-box';
    this.bttnLoad.style.width = (menuW * 2).toString() + 'px';
    this.bttnLoad.style.textAlign = 'center';
    this.bttnLoad.style.cursor = 'pointer';
    this.bttnLoad.style.padding = '0.5em 1em';
    this.bttnLoad.style.backgroundColor = 'transparent';
    this.bttnLoad.style.border = "solid 2px rgb(255,226,130)";

    this.bttnInstructions = new Kiwi.HUD.Widget.MenuItem( this.game, 'Instructions', -menuW, 110 );
    this.bttnInstructions.style.color = 'rgb(255,226,130)';
    this.bttnInstructions.style.fontFamily = 'Verdana,sans-serif';
    this.bttnInstructions.style.display = 'block';
    this.bttnInstructions.style.boxSizing = 'border-box';
    this.bttnInstructions.style.width = (menuW * 2).toString() + 'px';
    this.bttnInstructions.style.textAlign = 'center';
    this.bttnInstructions.style.cursor = 'pointer';
    this.bttnInstructions.style.padding = '0.5em 1em';
    this.bttnInstructions.style.backgroundColor = 'transparent';
    this.bttnInstructions.style.border = "solid 2px rgb(255,226,130)";

    this.bttnCredits = new Kiwi.HUD.Widget.MenuItem( this.game, 'Credits', -menuW, 200 );
    this.bttnCredits.style.color = 'rgb(255,226,130)';
    this.bttnCredits.style.fontFamily = 'Verdana,sans-serif';
    this.bttnCredits.style.display = 'block';
    this.bttnCredits.style.boxSizing = 'border-box';
    this.bttnCredits.style.width = (menuW * 2).toString() + 'px';
    this.bttnCredits.style.textAlign = 'center';
    this.bttnCredits.style.cursor = 'pointer';
    this.bttnCredits.style.padding = '0.5em 1em';
    this.bttnCredits.style.backgroundColor = 'transparent';
    this.bttnCredits.style.border = "solid 2px rgb(255,226,130)";

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, 200 );
    //this.menu.addMenuItem( this.bttnNew );
    this.menu.addMenuItem( this.bttnLoad );
    this.menu.addMenuItem( this.bttnInstructions );
    this.menu.addMenuItem( this.bttnCredits );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    //this.menu.getMenuItem(0).input.onDown.add( this.newButton, this );
    this.menu.getMenuItem(0).input.onDown.add( this.loadButton, this );
    this.menu.getMenuItem(1).input.onDown.add( this.instructionsButton, this );
    this.menu.getMenuItem(2).input.onDown.add( this.creditsButton, this );

    

    this.addChild(this.background);
    //this.addChild(this.textField);
};

mainMenuState.update = function(){

    Kiwi.State.prototype.update.call( this );

};
/*
mainMenuState.newButton = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "newCharState" );
}
*/
mainMenuState.loadButton = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "loadGameState" );
}
mainMenuState.instructionsButton = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "instructionsState" );
}
mainMenuState.creditsButton = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "creditsState" );
}

