var timelineTutorialState = new Kiwi.State( "timelineTutorialState" );

timelineTutorialState.create = function() {

	Kiwi.State.prototype.create.call(this);

	//create background immage
    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.timeTut, 0, 0);

    //create input to read the Spacebar key
    this.sKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR );

    //create a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Presiona la barra espaciadora para continuar');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 420;
    this.textField.fontSize = 17;
    //this.textField.fontWeight = "bold";
    this.textField.color = 'rgb(255,226,130)';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.addChild( this.background );
    this.addChild( this.textField );

}

timelineTutorialState.update = function() {

	Kiwi.State.prototype.update.call( this );

	if(this.sKey.isDown) {
        this.game.states.switchState( "timelineGameState" );
	}

}
