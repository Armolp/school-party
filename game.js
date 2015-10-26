var gameState = new Kiwi.State( "gameState" );

gameState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.game.stage.color = "4488cc";

	//this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.background, 0, 0 );
	this.character = new Kiwi.GameObjects.Sprite(
		this, this.textures.characterImg, 0, 0 );
    this.enemyGroup = new Kiwi.Group( this );

    for(var i=0; i<4; i++) {
    	this.enemyGroup.addChild( new Kiwi.GameObjects.Sprite(
    		this, this.textures.enemy1Img, this.game.stage.width / 2, i*(-100)));
    }

    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Roboto, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //this.addChild(this.background);
    this.addChild(this.character);
    this.addChild(this.enemyGroup);
    this.addChild(this.textField);
};

gameState.update = function(){

	Kiwi.State.prototype.update.call( this );

};