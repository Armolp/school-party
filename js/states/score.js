var scoreState = new Kiwi.State( "scoreState" );

scoreState.create = function(){

	Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.BG1, 0, 0);

    //half the width of the button 
    var menuW = 100;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnBack = new Kiwi.HUD.Widget.MenuItem( this.game, 'Regresar', -menuW, 0);
    this.bttnBack.style.color = 'white';
    this.bttnBack.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBack.style.display = 'block';
    this.bttnBack.style.boxSizing = 'border-box';
    this.bttnBack.style.width = (menuW * 2).toString() + 'px';
    this.bttnBack.style.textAlign = 'center';
    this.bttnBack.style.cursor = 'pointer';
    this.bttnBack.style.padding = '0.5em 1em';
    this.bttnBack.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-60 );
    this.menu.addMenuItem( this.bttnBack );
    this.game.huds.defaultHUD.addWidget( this.menu );

    this.menu.getMenuItem(0).input.onDown.add( this.back, this );

    this.addChild( this.background );

    document.getElementById("input").innerHTML = "<canvas id='scoreCanvas'>";

    var canvas = document.getElementById("scoreCanvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width = 600;
    var ch = canvas.height = 350;

    var arr = [130,120,120,530,230];

   	var stepX = cw/(arr.length+1);

    var max = 0;
    for(var i=0; i<arr.length; i++){
    	if(arr[i] > max) {
    		max = arr[i];
    	}
    }
    console.log(stepX);

    ctx.fillStyle = "#FFFFFF";
    for(var i=0; i<arr.length; i++) {

    	var h = (arr[i]/max)*200;

    	ctx.fillRect(stepX*(i+1)-25, 275-h, 50, h);
    	ctx.fillText(arr[i],stepX*(i+1)-10,270-h);
	}

	ctx.fillText("Timeline",stepX-21,  300);
	ctx.fillText("Maze",	stepX*2-13,300);
	ctx.fillText("Space",	stepX*3-15,300);
	ctx.fillText("Catch",	stepX*4-14,300);
	ctx.fillText("Memory",	stepX*5-18,300);


}

scoreState.update = function() {

	Kiwi.State.prototype.update.call(this);

}

scoreState.back = function () {
    document.getElementById("input").innerHTML = "";
    clearMenu(this.menu.container);
    this.game.states.switchState( "hallwayState" );
}