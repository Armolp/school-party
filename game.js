var gameState = new Kiwi.State( "gameState" );

gameState.create = function(){

	Kiwi.State.prototype.create.call(this);

    //specify stage color(may be changed to a background image)
	this.game.stage.color = "#74E474";

    //declare mouse input
    this.mouse = this.game.input.mouse;

    //declare a cell group
    this.cellGroup = new Kiwi.Group( this );

    //create cells without overlaping themselves
    for(var i=0; i<5; i++) {

        //variables for the generation of cells
        //x position, y position, cell object, condition bool
        var x,y,c,b=true;

        //cycle until the cell created is not overlaping any other cells
        while(b) {
            b = false;
            x = Math.random()*(this.game.stage.width - 70);
            y = Math.random()*(this.game.stage.height - 170);
            c = new cell(this, x, y, i+1);

            console.log("Trying to create cell "+(i+1)+" in ("+Math.floor(x)+","+Math.floor(y)+")");
            
            //temporal cell array
            var cs = this.cellGroup.members;

            //cycle through the already created cells
            for(var j=0; j<cs.length; j++) {

                //if cell intersects with another cell start again
                if(cs[j].box.bounds.intersects(c.box.bounds)) {
                    b = true;
                    console.log("Cell overlaps cell "+(j+1));
                    break;
                }
            }
        }
    	this.cellGroup.addChild( c );
    }

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Roboto, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //variable used to track the order of the timeline
    this.counter = 1;

    //this.addChild(this.background);
    this.addChild(this.cellGroup);
    this.addChild(this.textField);
};

gameState.update = function(){

	Kiwi.State.prototype.update.call( this );

    //temporal cell array
    var cells = this.cellGroup.members;

    //cycle through cells to check click
    for(var i=0; i<5; i++) {

        //if mouse is hovering over cell
        if(cells[i].box.bounds.contains(this.game.input.x,this.game.input.y)){

            //update text field
            this.textField.text = "Cell " + cells[i].number;

            //if clicked
            if(this.game.input.isDown) {

                //if the cell clicked is the next in the timeline
                if(cells[i].number == this.counter) {
                    //update the position of the cell
                    cells[i].x = this.game.stage.width/5 * i + 30;
                    cells[i].y = this.game.stage.height - 90;
                    this.counter++;
                }
                else {
                    this.textField.text = "Wrong cell!";
                }
            }//end if clicked
        }//end if mouse is hovering
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