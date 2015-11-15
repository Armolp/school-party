/*
* Space 
*/

var PlayState = new Kiwi.State( "PlayState" );

PlayState.create = function () {
	this.width = game.stage.width;
	this.height = game.stage.height;
	this.mouse = this.game.input.mouse;
	this.speed = 3;
	this.currentlyShooting = false;
    
     //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Respuesta 1');
    this.textField.x = this.play.stage.width / 2;
    this.textField.y = this.play.stage.height/2;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	// Particle Effect Creation
	this.backgroundStars = new Kiwi.GameObjects.StatelessParticles(
		this,
		this.textures.particle,
		this.width * 0.5,
		this.width * 0.5,
		stars);
	this.backgroundStars.rotation += Math.PI / 2;
	this.backgroundStars.startEmitting( true, false, 200 );

	// Nave 1
     this.Nave = new Kiwi.GameObjects.Sprite(

    
		this, this.textures.Nave, 200, 250, true );

     this.Nave.transform.scaleX=0.45;
     this.Nave.transform.scaleY=0.45;
    
    //Enemigos correcto
     this.Enemigos = new Kiwi.GameObjects.Sprite(
		this, this.textures.enemigos, this.width/2-470 , this.height/2-450, true);
     this.Enemigos.transform.scaleX=0.19;
     this.Enemigos.transform.scaleY=0.19;
    //Enemigo Incorecto 1
     this.Enemigos1 = new Kiwi.GameObjects.Sprite(
		this, this.textures.enemigos, this.width/2-750 , this.height/2-450, true);
     this.Enemigos1.transform.scaleX=0.19;
     this.Enemigos1.transform.scaleY=0.19;
    
    //Enemigo Incorrecto 2
     this.Enemigos2 = new Kiwi.GameObjects.Sprite(
		this, this.textures.enemigos, this.width/2-190 , this.height/2-450, true);
     this.Enemigos2.transform.scaleX=0.19;
     this.Enemigos2.transform.scaleY=0.19;
    

    // movimiento 
    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.A );
	this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.D );


	// Display hierarchy
	this.addChild( this.backgroundStars );
	this.addChild (this.Nave);
    this.addChild (this.Enemigos);
    this.addChild (this.Enemigos1);
    this.addChild (this.Enemigos2);
};
 

PlayState.update = function () {

	Kiwi.State.prototype.update.call( this );
      // Moviemiento de la nave izquierda
      if ( this.leftKey.isDown ) {

		if ( this.Nave.transform.x >= -110) {
			this.Nave.transform.x-=3;
		}

		}else if ( this.rightKey.isDown ) {
		
		if ( this.Nave.transform.x < 550) {
			this.Nave.transform.x += 3;
		}

	}
  
  

};


