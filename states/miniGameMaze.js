var mazeGameState = new Kiwi.State( "mazeGameState" );

mazeGameState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.dimension = 6;

	this.game.stage.color = "4488cc";

	//this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundWood, 0, 0 );
	//this.character = new Kiwi.GameObjects.StaticImage();
	this.goalGroup = new Kiwi.Group( this );
    this.cellGroup = new Kiwi.Group( this );

    for(var i=0; i<this.dimension; i++) {
        for(var j=0; j<this.dimension; j++) {

    		//var temp = new Kiwi.GameObjects.Sprite( this, this.textures.mazeSprite, j*36 + 168, i*36 + 40)
    		var temp = new mazeCell( this, (j*36 + 168), (i*36 + 40));
    		
		    temp.animation.add("UDLR", [ 0 ], 0.1, false );
		    
		    temp.animation.add("uDLR", [ 1 ], 0.1, false );
		    temp.animation.add("uDlR", [ 2 ], 0.1, false );
		    temp.animation.add("UdLR", [ 3 ], 0.1, false );
		    temp.animation.add("UDlR", [ 4 ], 0.1, false );

		    temp.animation.add("uDLr", [ 5 ], 0.1, false );
		    temp.animation.add("uDlR", [ 6 ], 0.1, false );
		    temp.animation.add("UdLr", [ 7 ], 0.1, false );
		    temp.animation.add("UdlR", [ 8 ], 0.1, false );
		    temp.animation.add("udLR", [ 9 ], 0.1, false );
		    temp.animation.add("UDlr", [ 10 ], 0.1, false );

		    temp.animation.add("udLr", [ 11 ], 0.1, false );
		    temp.animation.add("udlR", [ 12 ], 0.1, false );
		    temp.animation.add("Udlr", [ 13 ], 0.1, false );
		    temp.animation.add("uDlr", [ 14 ], 0.1, false );

		    temp.animation.add("udlr", [ 15 ], 0.1, false );

		    /*var s = ((Math.floor(Math.random()*2))?("u"):("U")) +
				    ((Math.floor(Math.random()*2))?("d"):("D")) +
				    ((Math.floor(Math.random()*2))?("l"):("L")) +
				    ((Math.floor(Math.random()*2))?("r"):("R"));*/

		    temp.animation.play( "UDLR" );

			//console.log(s+","+temp.animation.currentAnimation.name);

    		this.cellGroup.addChild( temp );
        }
    }

    this.mazeGenerator(0, 0);

    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //this.addChild(this.background);
    //this.addChild(this.character);
    this.addChild(this.cellGroup);
    this.addChild(this.textField);

};

mazeGameState.mazeGenerator = function(r,c){
	console.log("Entered new cell");
    var cell = this.cellGroup.members[r*this.dimension + c];
    var list = [1];

    while(list.length != 0) {

    	list = [];
    	
    	if(r > 0) {
    		if(this.cellGroup.members[(r-1)*this.dimension + c].walls == "UDLR") {
    			list.push(0);
    		}
    	}
    	if(r < this.dimension - 1) {
    		if(this.cellGroup.members[(r+1)*this.dimension + c].walls == "UDLR") {
    			list.push(1);
    		}
    	}
    	if(c > 0) {
    		if(this.cellGroup.members[r*this.dimension + (c-1)].walls == "UDLR") {
    			list.push(2);
    		}
    	}
    	if(c < this.dimension - 1) {
    		if(this.cellGroup.members[r*this.dimension + (c+1)].walls == "UDLR") {
    			list.push(3);
    		}
    	}

    	console.log(list);

    	var rnd = Math.floor(Math.random()*list.length);

        if(list[rnd] == 0) {
        	//up
        	console.log("Moved up from ("+r+","+c+")");
        	cell.walls = "u"+cell.walls[1]+cell.walls[2]+cell.walls[3];
        	cell.animation.play(cell.walls);
        	this.mazeGenerator(r-1, c);
        }
        else if(list[rnd] == 1) {
	        //down
        	console.log("Moved down from ("+r+","+c+")");
	        cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
        	cell.animation.play(cell.walls);
    	    this.mazeGenerator(r+1, c);
        }
        else if(list[rnd] == 2) {
        	//left
        	console.log("Moved left from ("+r+","+c+")");
        	cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
        	cell.animation.play(cell.walls);
        	this.mazeGenerator(r, c-1);
        }
        else if(list[rnd] == 3) {
	        //right
        	console.log("Moved right from ("+r+","+c+")");
	        cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
        	cell.animation.play(cell.walls);
	        this.mazeGenerator(r, c+1);
        }

    }//end while
}

mazeGameState.update = function(){

	Kiwi.State.prototype.update.call( this );

};

var mazeCell = function( state, x, y){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.mazeSprite, x, y, false );

    this.walls = "UDLR";
};
//extend the class
Kiwi.extend( mazeCell, Kiwi.GameObjects.Sprite );