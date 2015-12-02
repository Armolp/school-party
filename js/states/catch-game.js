
var catchGameState = new Kiwi.State('catchGameState');

catchGameState.create = function(){

    Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['backgroundCatch'], 0, 0);

    this.addChild(this.background);

    this.cowboy = new Kiwi.GameObjects.Sprite(this, this.textures['cowboy'], 200, 274);
    this.cowboy.animation.add('idle', [0], 0.1, false);
    this.cowboy.animation.add('move', [1,2,3,4,5,6], 0.1,true);
    this.cowboy.animation.play('idle');
    this.addChild(this.cowboy);
    this.cowboy.box.hitbox = new Kiwi.Geom.Rectangle(48,37,27,75);

    this.cowboy.inventory = Kiwi.Plugins.InventoryManager;
    this.cowboy.inventory.createItem('coin');
    this.cowboy.inventory.createItem('bag');
    this.cowboy.inventory.addVariable('money', 0);
    this.cowboy.inventory.setItemVariable('coin', 'money', 1);
    this.cowboy.inventory.setItemVariable('bag', 'money', 5);



    this.coinGroup = new Kiwi.Group(this);
    this.addChild(this.coinGroup);

    this.bagGroup = new Kiwi.Group(this);
    this.addChild(this.bagGroup);

    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);

    this.coinText = new Kiwi.GameObjects.Textfield(this, 'Dinero recolectado: 0', 10, 10, '#000');
    this.coinText.fontSize = 20;
    this.addChild(this.coinText);
 
	this.counterText = new Kiwi.GameObjects.Textfield( this, "60 sec.", 620, 20, "#FFF", 32, 'normal' );
	this.timer = this.game.time.clock.createTimer('time', 2, 60, true);
	this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_START, this.onTimerStart, this );
	this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_COUNT, this.onTimerCount, this );
	this.timerCount = 1800;
	this.addChild(this.counterText);

}

catchGameState.createCoin = function(){

    this.coinGroup.addChild(new Item(this, Math.random()*650+50, -100, this.textures['coin'], true));

}

catchGameState.createBag = function(){

    this.bagGroup.addChild(new Item(this, Math.random()*650+50, -100, this.textures['coinsack'], true));

}

catchGameState.createItem = function(){

    var n = Math.random();
    if( n < 0.2 )
        this.createBag();
    else
        this.createCoin();
}

catchGameState.checkCollisions = function(){

    for(var i = 0; i < this.coinGroup.members.length; i++){
        var c = this.coinGroup.members[i];
        if(c.alpha == 1){
            if(this.cowboy.box.hitbox.intersects(c.box.hitbox)){
                this.cowboy.inventory.changeItemCount('coin', 1);
                this.createSparkle(c.x, c.y);
                c.tween(100);
            }
        }
    }
    for(var i = 0; i < this.bagGroup.members.length; i++){
        var c = this.bagGroup.members[i];
        if(c.alpha == 1){
            if(this.cowboy.box.hitbox.intersects(c.box.hitbox)){
                this.cowboy.inventory.changeItemCount('bag', 1);
                this.createSparkle(c.x, c.y);
                c.tween(100);
            }
        }
    }
}


catchGameState.createSparkle = function(x, y){

    var t = new Item(this, x+5, y+10, this.textures['sparkle'], true);
    t.tween(800);
    t.physics.velocity = new Kiwi.Geom.Point(0,-20);
    this.addChild(t);
}


catchGameState.update = function(){
    Kiwi.State.prototype.update.call(this);
   
	if (this.timerCount!=0){
	    var n = Math.random();
	    if(n < 0.01)
	        this.createItem();

	    if(this.leftKey.isDown){
	        if(this.cowboy.x >= -45){
	            this.cowboy.scaleX = -1;
	            this.cowboy.x-=7;
	            if(this.cowboy.animation.currentAnimation.name!='move')
	                this.cowboy.animation.switchTo('move', true);
	        }
	    }
	    else if(this.rightKey.isDown){
	        if(this.cowboy.x <= 665) {
	            this.cowboy.scaleX = 1;
	            this.cowboy.x+=7;
	            if(this.cowboy.animation.currentAnimation.name!='move')
	                this.cowboy.animation.switchTo('move', true);
	        }
	    }
	    else
	        this.cowboy.animation.switchTo('idle');

	    this.checkCollisions();

	    var totalMoney = this.cowboy.inventory.returnItemCount('coin') * this.cowboy.inventory.returnItemVariable('coin', 'money') +
	                        this.cowboy.inventory.returnItemCount('bag') * this.cowboy.inventory.returnItemVariable('bag', 'money');
	    this.coinText.text = 'Dinero recolectado: $' + totalMoney;

		this.timerCount -= 1;

		this.counterText.text = Math.floor (this.timerCount/60) + " sec.";
	}
}