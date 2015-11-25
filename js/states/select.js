var selectState = new Kiwi.State( "selectState" );

selectState.create = function() {

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    this.choice;

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Elige tu Personaje');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 50;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //declare the character object
    this.susy = new Kiwi.GameObjects.Sprite( this, this.textures.susySprite, 470, 174 );

    this.susy.animation.add("idleRight", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 0.1, true );
    this.susy.animation.add("idleLeft", [43,42,41,40,39,38,37,36,35,34,33,54,53,52,51,50,49,48,47,46,45,44], 0.1, true );
    this.susy.animation.add("walkRight", [22,23,24,25,26,27,28,29], 0.1, true );
    this.susy.animation.add("walkLeft", [65,64,63,62,61,60,59,58], 0.1, true );
    this.susy.animation.add("crouchRight", [30,31,32], 0.1, false );
    this.susy.animation.add("crouchLeft", [57,56,55], 0.1, false );

    this.susy.animation.play( "idleRight" );

    this.daniel = new Kiwi.GameObjects.Sprite( this, this.textures.danielSprite, 230, 192 );

    this.daniel.animation.add("idleRight", [0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,6,5,4,3,2,1], 0.1, true );
    this.daniel.animation.add("idleLeft", [24,24,24,24,24,24,24,24,23,22,21,20,29,28,28,28,29,20,21,22,23], 0.1, true );
    this.daniel.animation.add("walkRight", [7,8,9,10,11,12,13,14], 0.1, true );
    this.daniel.animation.add("walkLeft", [27,26,25,34,33,32,31,30], 0.1, true );
    this.daniel.animation.add("crouchRight", [15,16,17,18], 0.1, false );
    this.daniel.animation.add("crouchLeft", [39,38,37,36], 0.1, false );

    this.daniel.animation.play( "idleLeft" );

    var menuW = 100;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnGirl = new Kiwi.HUD.Widget.MenuItem( this.game, 'Niña', 20, 0 );
    this.bttnGirl.style.color = 'white';
    this.bttnGirl.style.fontFamily = 'Verdana,sans-serif';
    this.bttnGirl.style.display = 'block';
    this.bttnGirl.style.boxSizing = 'border-box';
    this.bttnGirl.style.width = (menuW * 2).toString() + 'px';
    this.bttnGirl.style.textAlign = 'center';
    this.bttnGirl.style.cursor = 'pointer';
    this.bttnGirl.style.padding = '0.5em 1em';
    this.bttnGirl.style.backgroundColor = '#9c0';

    this.bttnBoy = new Kiwi.HUD.Widget.MenuItem( this.game, 'Niño', -2*menuW-20, 0 );
    this.bttnBoy.style.color = 'white';
    this.bttnBoy.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBoy.style.display = 'block';
    this.bttnBoy.style.boxSizing = 'border-box';
    this.bttnBoy.style.width = (menuW * 2).toString() + 'px';
    this.bttnBoy.style.textAlign = 'center';
    this.bttnBoy.style.cursor = 'pointer';
    this.bttnBoy.style.padding = '0.5em 1em';
    this.bttnBoy.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-90 );
    this.menu.addMenuItem( this.bttnGirl );
    this.menu.addMenuItem( this.bttnBoy );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.girl, this );
    this.menu.getMenuItem(1).input.onDown.add( this.boy, this );
    

    this.addChild( this.textField );
    this.addChild( this.susy );
    this.addChild( this.daniel );

}

selectState.girl = function () {
    this.choice = true;
    clearMenu(this.menu.container);
    this.game.states.switchState( "teacherRoomState" );
}

selectState.boy = function () {
    this.choice = false;
    clearMenu(this.menu.container);
    this.game.states.switchState( "teacherRoomState" );
}

selectState.update = function() {

    Kiwi.State.prototype.update.call( this );

}