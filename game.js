var gameState = new Kiwi.State( "gameState" );

gameState.create = function(){

	Kiwi.State.prototype.create.call(this);

    //specify stage color(may be changed to a background image)
	this.game.stage.color = "4488cc";

    //declare mouse input
    this.mouse = this.game.input.mouse;

    //declare a cell group
    this.cellGroup = new Kiwi.Group( this );

    //create cells
    for(var i=0; i<4; i++) {
        var x = Math.random()*(this.game.stage.width - 70),
            y = Math.random()*(this.game.stage.height - 170);
        
    	this.cellGroup.addChild( new cell(this, x, y, i) );
    }

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Roboto, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //variable used to track the order of the timeline
    this.counter = 0;

    //this.addChild(this.background);
    this.addChild(this.cellGroup);
    this.addChild(this.textField);
};

gameState.update = function(){

	Kiwi.State.prototype.update.call( this );

    var cells = this.cellGroup.members;

    //cycle through cells
    for(var i=0; i<4; i++) {

        //if mouse is hovering over cell
        if(cells[i].box.bounds.contains(this.game.input.x,this.game.input.y)){

            //update text field
            this.textField.text = "Cell " + cells[i].number;

            //if clicked
            if(this.game.input.isDown) {

                //if the cell clicked is the next in the timeline
                if(cells[i].number == this.counter) {
                    cells[i].x = this.game.stage.width/4 * i + 50;
                    cells[i].y = this.game.stage.height - 90;
                    this.counter++;
                }
                else {
                }
                console.log(i);
            }
        }
    }//end for

};

var cell = function( state, x, y, number){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.cellImg, x, y, false );

    this.number = number;
    /*
    cell.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
    }
    */
};
//Second - extend the class
Kiwi.extend( cell, Kiwi.GameObjects.Sprite );