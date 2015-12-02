

var spaceGameState = new Kiwi.State("spaceGameState");

spaceGameState.create = function() {
	this.width = game.stage.width;
	this.height = game.stage.height;
	this.mouse = this.game.input.mouse;
	this.speed = 3;
	this.currentlyShooting = false;

	this.game.stage.color = "#000000";

	//stop old music, declare new music and start it
	this.backgroundMusic = new Kiwi.Sound.Audio(this.game, 'spaceTheme', 1, true);
	loadState.backgroundMusic.stop();
	this.backgroundMusic.play();

	// Particle Effect Creation
	this.backgroundStars = new Kiwi.GameObjects.StatelessParticles(
		this,
		this.textures.particle,
		this.width * 0.5,
		this.width * 0.5,
		stars);
	this.backgroundStars.rotation += Math.PI / 2;
	this.backgroundStars.startEmitting(true, false, 200);

	this.ran = Math.floor(Math.random()*questions.length);
	//QUESTION VARIABLES
	//question extracted from parse
	this.question = questions[this.ran].question;
	//answer opctions
	this.op = [questions[this.ran].a, questions[this.ran].b, questions[this.ran].c];
	//correct answer
	this.ans = questions[this.ran].answer;
	console.log(questions[this.ran].answer);

	this.bandera = false;
	// Nave 1
	this.Nave = new Kiwi.GameObjects.Sprite(
		this, this.textures.Nave, 200, 350, true);
	this.Nave.x = this.width / 2 - this.Nave.width / 2;
	this.Nave.transform.scaleX = 0.75;
	this.Nave.transform.scaleY = 0.75;
	//Enemigos correcto
	this.Enemigos = new Kiwi.GameObjects.Sprite(
		this, this.textures.enemigos, this.width / 2 - 470, this.height / 2 - 380, true);
	this.Enemigos.transform.scaleX = 0.15;
	this.Enemigos.transform.scaleY = 0.15;

	//Enemigo Incorecto 1
	this.Enemigos1 = new Kiwi.GameObjects.Sprite(
		this, this.textures.enemigos, this.width / 2 - 750, this.height / 2 - 350, true);
	this.Enemigos1.transform.scaleX = 0.15;
	this.Enemigos1.transform.scaleY = 0.15;

	//Enemigo Incorrecto 2
	this.Enemigos2 = new Kiwi.GameObjects.Sprite(
		this, this.textures.enemigos, this.width / 2 - 190, this.height / 2 - 350, true);
	this.Enemigos2.transform.scaleX = 0.15;
	this.Enemigos2.transform.scaleY = 0.15;

	//laser
	this.laser = new Kiwi.GameObjects.Sprite(
		this, this.textures.Laser, 0, 0, false);
	this.laser.visible = false;


	//Explosion
	this.exp = new Kiwi.GameObjects.Sprite(this, this.textures.Exp, 275, this.Enemigos.y + this.Enemigos.height / 3);
	this.exp.animation.add('exp', [1, 2, 3, 4, 5, 6, 7, 8], 0.05, false);
	this.exp.visible = false;



	// movimiento 
	this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
	this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
	this.midKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);

	//Pregunta
	this.textField0 = new Kiwi.GameObjects.Textfield(this, this.question);
	this.textField0.x = this.game.stage.width / 2 - this.textField0.width / 2;
	this.textField0.y = 10;
	this.textField0.color = '#FFFFFF';
	this.textField0.fontFamily = 'Verdana, sans-serif';
	this.textField0.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.textField0.visible = true;

	//Respuesta
	this.textField = new Kiwi.GameObjects.Textfield(this, this.op[0]);
	this.textField.x = this.game.stage.width / 2 - this.textField.width / 2 - 10;
	this.textField.y = this.width / 2 - 300;
	this.textField.color = '#FFFFFF';
	this.textField.fontFamily = 'Verdana, sans-serif';
	this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.textField.visible = false;

	//Respuesta
	this.textField1 = new Kiwi.GameObjects.Textfield(this, this.op[1]);
	this.textField1.x = this.game.stage.width / 2 - this.textField.width / 2 - 280;
	this.textField1.y = this.width / 2 - 275;
	this.textField1.color = '#FFFFFF';
	this.textField1.fontFamily = 'Verdana, sans-serif';
	this.textField1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.textField1.visible = false;

	//Respuesta
	this.textField2 = new Kiwi.GameObjects.Textfield(this, this.op[2]);
	this.textField2.x = this.game.stage.width / 2 - this.textField.width / 2 + 282;
	this.textField2.y = this.width / 2 - 275;
	this.textField2.color = '#FFFFFF';
	this.textField2.fontFamily = 'Verdana, sans-serif';
	this.textField2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.textField2.visible = false;

	// You can call the createTimer method on any clock to attach a timer to the clock.
	/**
	 * Param 1 - Name of Timer.
	 * Param 2 - Delay Between Counts.
	 * Param 3 - Repeat amount. If set to -1 will repeat infinitely.
	 * Param 4 - If the timer should start.
	 */
	// timer 
	this.counterText = new Kiwi.GameObjects.Textfield(this, "60 sec.", 620, 20, "#FFF", 32, 'normal');
	this.timer = this.game.time.clock.createTimer('time', 2, 60, true);
	this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_START, this.onTimerStart, this);
	this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.onTimerCount, this);
	this.timerCount = 3600;

	//score 

	this.score = 0;
	this.scoreT = new Kiwi.GameObjects.Textfield(this, "Puntos: " + this.score);
	this.scoreT.x = 80;
	this.scoreT.y = 20;
	this.scoreT.color = '#FFFFFF';
	this.scoreT.fontFamily = 'Verdana, sans-serif';
	this.scoreT.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	//declare a text field to display thescore
	this.scoreP = new Kiwi.GameObjects.Textfield(this, 'Puntuacion: ' + this.score);
	this.scoreP.x = this.game.stage.width - 10;
	this.scoreP.y = 10;
	this.scoreP.color = '#FFFFFF';
	this.scoreP.fontFamily = 'Roboto, sans-serif';
	this.scoreP.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT;

	this.scoreP.text = "Puntos: " + this.score;


	//CREATE END GAME SUMMARY
	this.scoreUI = new Kiwi.GameObjects.StaticImage(this, this.textures.scoreImg, 184, 106);
	this.scoreUI.alpha = 0.95;
	this.scoreUI.visible = false;

	this.scoreUITextField1 = new Kiwi.GameObjects.Textfield(this, "Puntaje conseguido: ");
	this.scoreUITextField1.x = this.game.stage.width / 2;
	this.scoreUITextField1.y = 210;
	this.scoreUITextField1.fontSize = 13;
	this.scoreUITextField1.fontWeight = "bold";
	this.scoreUITextField1.color = '#FFFFFF';
	this.scoreUITextField1.fontFamily = 'Verdana, sans-serif';
	this.scoreUITextField1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.scoreUITextField1.visible = false;

	this.scoreUITextField2 = new Kiwi.GameObjects.Textfield(this, "Monedas conseguidas: 1");
	this.scoreUITextField2.x = this.game.stage.width / 2;
	this.scoreUITextField2.y = 240;
	this.scoreUITextField2.fontSize = 13;
	this.scoreUITextField2.fontWeight = "bold";
	this.scoreUITextField2.color = '#FFFFFF';
	this.scoreUITextField2.fontFamily = 'Verdana, sans-serif';
	this.scoreUITextField2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.scoreUITextField2.visible = false;

	this.scoreUITextField3 = new Kiwi.GameObjects.Textfield(this, "Presiona la barra espaciadora para continuar");
	this.scoreUITextField3.x = this.game.stage.width / 2;
	this.scoreUITextField3.y = 350;
	this.scoreUITextField3.fontSize = 13;
	this.scoreUITextField3.fontWeight = "bold";
	this.scoreUITextField3.color = '#FFFFFF';
	this.scoreUITextField3.fontFamily = 'Verdana, sans-serif';
	this.scoreUITextField3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.scoreUITextField3.visible = false;
	// Display hierarchy
	this.addChild(this.backgroundStars);
	this.addChild(this.Nave);
	this.addChild(this.laser);
	this.addChild(this.Enemigos);
	this.addChild(this.Enemigos1);
	this.addChild(this.Enemigos2);
	this.addChild(this.textField);
	this.addChild(this.textField0);
	this.addChild(this.exp);
	this.addChild(this.scoreT);
	this.addChild(this.counterText);
	this.addChild(this.textField1);
	this.addChild(this.textField2);
	this.addChild(this.scoreUI);
	this.addChild(this.scoreUITextField1);
	this.addChild(this.scoreUITextField2);
	this.addChild(this.scoreUITextField3);

	console.log(this.textField.x + this.textField.width / 2);

};


spaceGameState.update = function() {
	Kiwi.State.prototype.update.call(this);



	// si el contador no llega a 0
	if (this.timerCount != 0) {

		//movimiento de la Nace
		if (this.leftKey.isDown) {

			if (this.Nave.transform.x > 0) {
				this.Nave.transform.x -= 6;
			}

		} else if (this.rightKey.isDown) {

			if (this.Nave.transform.x < this.width - this.Nave.width) {
				this.Nave.transform.x += 6;
			}

		}

		// Disparo
		if (this.midKey.isDown) {
			this.laser.visible = true;
			this.laser.x = this.Nave.x + this.laser.width / 4;
			this.laser.y = 350;
		}
		//movimiento del disparo
		if (this.laser.visible) {

			this.laser.y -= 15;

		}


		//meciona si la respuesta es correcta o incorecta y activa la bandrea this.bandera si es correcta
		if (this.Enemigos.visible)

			if (this.laser.box.bounds.intersects(this.Enemigos.box.bounds)) {

				if (this.op[0] == this.ans && this.laser.visible) {
					this.ran = Math.floor(Math.random()*questions.length);
					this.question = questions[this.ran].question;
					this.op = [questions[this.ran].a, questions[this.ran].b, questions[this.ran].c];
					this.ans = questions[this.ran].answer;
					this.textField0.text = this.question;
					this.textField.text = this.op[0];
					this.textField1.text = this.op[1];
					this.textField2.text = this.op[2];
					this.Enemigos.visible = false;
					this.exp.y = this.Enemigos.y + this.exp.height;
					this.exp.x = this.Enemigos.x + this.Enemigos.width / 2.5;
					this.exp.visible = true;
					this.exp.animation.play('exp');
					this.laser.visible = false;
					this.score += 5;
					this.scoreT.text = "Puntos:" + this.score;
					this.laser.y = 350;
					this.Enemigos.visible = true;
					this.Enemigos2.visible = true;
					this.Enemigos1.visible = true;
					this.textField.color = '#FFFFFF';
					this.textField2.color = '#FFFFFF';
					this.textField1.color = '#FFFFFF';
					this.Enemigos.y = -350;
					this.bandera = true;


				} else {
					this.laser.visible = false;
					this.textField.color = '#E7003E';

				}
			}

		if (this.Enemigos1.visible)
			if (this.laser.box.bounds.intersects(this.Enemigos1.box.bounds)) {

				if (this.op[1] == this.ans && this.laser.visible) {
					this.ran = Math.floor(Math.random()*questions.length);
					this.question = questions[this.ran].question;
					this.op = [questions[this.ran].a, questions[this.ran].b, questions[this.ran].c];
					this.ans = questions[this.ran].answer;
					this.textField0.text = this.question;
					this.textField.text = this.op[0];
					this.textField1.text = this.op[1];
					this.textField2.text = this.op[2];
					this.Enemigos1.visible = false;
					this.exp.y = this.Enemigos1.y + this.exp.height;
					this.exp.x = this.Enemigos1.x + this.Enemigos1.width / 2.5;
					this.exp.visible = true;
					this.exp.animation.play('exp');
					this.laser.visible = false;
					this.score += 5;
					this.scoreT.text = "Puntos:" + this.score;
					this.laser.y = 350;
					this.Enemigos.visible = true;
					this.Enemigos2.visible = true;
					this.Enemigos1.visible = true;
					this.textField.color = '#FFFFFF';
					this.textField2.color = '#FFFFFF';
					this.textField1.color = '#FFFFFF';
					this.Enemigos1.y = -350;
					this.bandera = true;

				} else {
					this.laser.visible = false;
					this.textField1.color = '#E7003E';

				}
			}
		if (this.Enemigos2.visible)

			if (this.laser.box.bounds.intersects(this.Enemigos2.box.bounds)) {

				if (this.op[2] == this.ans && this.laser.visible) {

					this.ran = Math.floor(Math.random()*questions.length);
					this.question = questions[this.ran].question;
					this.op = [questions[this.ran].a, questions[this.ran].b, questions[this.ran].c];
					this.ans = questions[this.ran].answer;
					this.textField0.text = this.question;
					this.textField.text = this.op[0];
					this.textField1.text = this.op[1];
					this.textField2.text = this.op[2];
					this.Enemigos2.visible = false;
					this.exp.y = this.Enemigos2.y + this.exp.height;
					this.exp.x = this.Enemigos2.x + this.Enemigos1.width / 2.5;
					this.exp.visible = true;
					this.exp.animation.play('exp');
					this.laser.visible = false;
					this.score += 5;
					this.scoreT.text = "Puntos: "+ this.score;
					this.laser.y = 350;
					this.Enemigos.visible = true;
					this.Enemigos2.visible = true;
					this.Enemigos1.visible = true;
					this.textField.color = '#FFFFFF';
					this.textField2.color = '#FFFFFF';
					this.textField1.color = '#FFFFFF';
					this.Enemigos2.y = -350;
					this.bandera = true;



				} else {
					this.laser.visible = false;
					this.textField2.color = '#E7003E';

				}


			}


			//Hace visible las respuestas si pasan por sus respectivas xs 

		if (this.Nave.x >= 0 && this.Nave.x < this.Enemigos2.x + this.Enemigos2.width * .19 - 100) {
			this.textField1.visible = true;


		}

		if (this.Nave.x < this.Enemigos2.x + this.Enemigos2.width * .19 - 100)
			this.textField.visible = false;

		if (this.Nave.x > 250 && this.Nave.x < 400) {
			this.textField.visible = true;
			this.textField2.visible = false;
			this.textField1.visible = false;

		}


		if (this.Nave.x >= 500 && this.Nave.x <= this.width) {
			this.textField2.visible = true;
			this.textField.visible = false;
		}



		this.timerCount -= 1;

		this.counterText.text = Math.floor(this.timerCount / 60) + " sec.";

	}

	if (this.timerCount == 0) {
		this.exp.visible = false;
		this.laser.visible = false;
		this.scoreUI.visible = true;
		this.scoreUITextField1.text = "Puntaje conseguido: " + this.score;
		this.scoreUITextField1.visible = true;
		this.scoreUITextField2.visible = true;
		this.scoreUITextField3.visible = true;

		//cambio de stage 
		if (this.midKey.isDown) {
			this.backgroundMusic.stop();
			loadState.backgroundMusic.play();
			this.game.states.switchState("teacherRoomState");
		}
	}

	if (this.bandera) {
		if (this.Enemigos.y <= this.height / 2 - 385)
			this.Enemigos.y += 10;

		if (this.Enemigos1.y <= this.height / 2 - 355)
			this.Enemigos1.y += 10;
		if (this.Enemigos2.y <= this.height / 2 - 355)
			this.Enemigos2.y += 10;
	}
};