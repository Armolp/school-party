var newCharState = new Kiwi.State( "newCharState" );

newCharState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.backgroundWood, 0, 0);
    this.tempChar = new Kiwi.GameObjects.StaticImage(
            this, this.textures.newCharImg, this.game.stage.width/2 - 171, 50);

    var menuW = 100;
    
    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Temporary new character Header');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnDone = new Kiwi.HUD.Widget.MenuItem( this.game, 'Done', 20, 0 );
    this.bttnDone.style.color = 'white';
    this.bttnDone.style.fontFamily = 'Verdana,sans-serif';
    this.bttnDone.style.display = 'block';
    this.bttnDone.style.boxSizing = 'border-box';
    this.bttnDone.style.width = (menuW * 2).toString() + 'px';
    this.bttnDone.style.textAlign = 'center';
    this.bttnDone.style.cursor = 'pointer';
    this.bttnDone.style.padding = '0.5em 1em';
    this.bttnDone.style.backgroundColor = '#9c0';

    this.bttnBack = new Kiwi.HUD.Widget.MenuItem( this.game, 'Back', -2*menuW-20, 0 );
    this.bttnBack.style.color = 'white';
    this.bttnBack.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBack.style.display = 'block';
    this.bttnBack.style.boxSizing = 'border-box';
    this.bttnBack.style.width = (menuW * 2).toString() + 'px';
    this.bttnBack.style.textAlign = 'center';
    this.bttnBack.style.cursor = 'pointer';
    this.bttnBack.style.padding = '0.5em 1em';
    this.bttnBack.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-50 );

    this.menu.addMenuItem( this.bttnDone );
    this.menu.addMenuItem( this.bttnBack );
    
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.done, this );
    this.menu.getMenuItem(1).input.onDown.add( this.back, this );

    //this.addChild(this.background);
    this.addChild(this.textField);
    this.addChild(this.tempChar);
};

newCharState.update = function(){

    Kiwi.State.prototype.update.call( this );

};

newCharState.done = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "teacherRoomState" );
}
newCharState.back = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "mainMenuState" );
}