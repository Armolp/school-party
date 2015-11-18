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
        this, this.textures.Nave, 200, 350, true );
     this.Nave.x=this.width/2-this.Nave.width/2;    
    //Enemigos correcto
     this.Enemigos = new Kiwi.GameObjects.Sprite(
        this, this.textures.enemigos, this.width/2-470, this.height/2-450, true);
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
   
    //laser
    this.laser= new Kiwi.GameObjects.Sprite(
        this, this.textures.Laser, this.width/2, this.height/2,false);
    this.laser.visible=false;
    
    //Explosion
     this.exp = new Kiwi.GameObjects.Sprite(this, this.textures.Exp, 275, 150);
     this.exp.animation.add( 'exp', [ 1, 2, 3, 4, 5, 6 ], 0.1, false, true);
     this.exp.visible=false;
    // movimiento 
    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.A );
    this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.D );
    this.midKey = this.game.input.keyboard.addKey (Kiwi.Input.Keycodes.SPACEBAR);
    
    //Respuesta
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Respuesta 1');
    this.textField.x = this.game.stage.width / 2-this.textField.width/2;
    this.textField.y = this.width/2-275;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.textField.visible=false;

    //Respuesta
    this.textField1 = new Kiwi.GameObjects.Textfield(this, 'Respuesta 2');
    this.textField1.x = this.game.stage.width / 2-this.textField.width/2-280;
    this.textField1.y = this.width/2-275;
    this.textField1.color = '#FFFFFF';
    this.textField1.fontFamily = 'Helvetica, sans-serif';
    this.textField1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.textField1.visible=false;

      //Respuesta
    this.textField2 = new Kiwi.GameObjects.Textfield(this, 'Respuesta 3');
    this.textField2.x = this.game.stage.width / 2-this.textField.width/2+282;
    this.textField2.y = this.width/2-275;
    this.textField2.color = '#FFFFFF';
    this.textField2.fontFamily = 'Helvetica, sans-serif';
    this.textField2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.textField2.visible=false;

console.log(this.exp.visible ); 
 console.log(this.textField.x + this.textField.width/2 );
    // Display hierarchy
    this.addChild( this.backgroundStars );
    this.addChild (this.Nave);
    this.addChild (this.laser);
    this.addChild (this.Enemigos);
    this.addChild (this.Enemigos1);
    this.addChild (this.Enemigos2);
    this.addChild(this.textField);
    this.addChild(this.exp);
    this.addChild(this.textField1);
    this.addChild(this.textField2);
};
 

PlayState.update = function () {

    Kiwi.State.prototype.update.call( this );
      // Moviemiento de la nave izquierda


   

          if ( this.leftKey.isDown ) {

        if ( this.Nave.transform.x >0) {
            this.Nave.transform.x-=3;
        }

        }else if ( this.rightKey.isDown ) {
        
        if ( this.Nave.transform.x < this.width-this.Nave.width) {
            this.Nave.transform.x += 3;
        }

    }
  
  if (this.midKey.isDown)
  {
    this.laser.visible= true;
    this.laser.x=this.Nave.x+ this.laser.width/4 ;
    this.laser.y=350;
  }
  if(this.laser.visible)
  {

    this.laser.y-=15;

  }
  if (this.laser.box.bounds.intersects(this.Enemigos.box.bounds))
  {

    this.Enemigos.visible=false;
    this.exp.visible=true;
    this.exp.animation.play
  }

  if (this.laser.box.bounds.intersects(this.Enemigos1.box.bounds))
  {

    this.Enemigos1.visible=false;
  }

  if (this.laser.box.bounds.intersects(this.Enemigos2.box.bounds))
  {

    this.Enemigos2.visible=false;
  }

     if ( this.Nave.x >=0 && this.Nave.x<this.Enemigos2.x +this.Enemigos2.width*.19-100)
     {
        this.textField1.visible=true;
     }

     if (this.Nave.x<this.Enemigos2.x +this.Enemigos2.width*.19-100)
        this.textField.visible=false;

    if (this.Nave.x >250 && this.Nave.x <400 )
    {
        this.textField.visible=true;
        this.textField2.visible=false;
        this.textField1.visible=false;
      
    }

     if (this.Nave.x>=500 && this.Nave.x <=this.width)
    {
        this.textField2.visible=true;
        this.textField.visible=false;
    }
};