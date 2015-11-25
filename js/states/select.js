var selectState = new Kiwi.State( "selectState" );

selectState.create = function() {

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Elige tu genero');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 50;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
}

selectState.update = function() {

    Kiwi.State.prototype.update.call( this );

}