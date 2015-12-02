/*
var myGame = new Kiwi.Game();


//Se cargan las imagenes que se van a utilizar:
//el fondo, la carta boca-abajo, la carta boca-arriba

memoryGameState.preload = function () {

    Kiwi.State.prototype.preload.call(this);

    this.addImage( "carta1",        "assets/memory/carta1.png");
    this.addImage( "carta2",        "assets/memory/carta2.png");
    this.addImage( "backgroundWood","assets/wood-background.png" );
    this.addImage( "scoreImg",    "assets/puntuacion.png");
}
*/


var memoryGameState = new Kiwi.State("memoryGameState");

/*Se crean y se inicializan todas las variables que 
se van a utilizar durante el juego*/

memoryGameState.create = function() {


    Kiwi.State.prototype.create.call(this);

    this.preguntas = []; // arreglo que contiene las preguntas y luego las respuestas del momorama
    this.texto = []; // arreglo donde se guardaran las preguntas en el orden de las cartas
    this.respuestas = []; // arreglo que contiene las parejas equivalentes de las cartas
    this.gameOver = []; // arreglo que contiene las cartas que ya fueron seleccionadas correctamente
    this.iCont = 0; // contador para saber cuantas cartas se han seleccionado por turno
    this.par1 = 0; // posicion de la primera carta seleccionada
    this.par2 = 0; // posicion de la segunda carta seleccionada
    this.par = []; // arreglo que guardas posiciones para luego dar valor a las variables anteriores
    this.cont = 0; // contados para ajustar el orden la las respuestas con los textos que se despliegan
    this.mouse = this.game.input.mouse; // se define la variable que toma el input del mouse        
    this.bool = false; // variable que dice si ya se seleccionaron las 2 cartas
    this.score = 30; // puntos extra que se pueden ganar inicialmente al pasar el juego en menor turnos
    this.done = false; // dice si ya se acabo el juego


    // se declaran las imagenes
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.backgroundWood, 0, 0);
    this.puntuacion = new Kiwi.GameObjects.StaticImage(this, this.textures.scoreImg, 185, 100);
    this.carta1Group = new Kiwi.Group(this);
    this.carta2Group = new Kiwi.Group(this);

    this.puntuacion.alpha = .95;

    //e declaran los textos que se muestran:

    // texto de la primera carta seleccionada
    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = 100;
    this.textField.y = 10;
    this.textField.color = '#000000';
    this.textField.fontFamily = 'Verdana, sans-serif';

    // texto de la segunda carta seleccionada
    this.textField2 = new Kiwi.GameObjects.Textfield(this, '');
    this.textField2.x = 200;
    this.textField2.y = 10;
    this.textField2.color = '#000000';
    this.textField2.fontFamily = 'Verdana, sans-serif';

    // texto de los puntos extra
    this.textField3 = new Kiwi.GameObjects.Textfield(this, '');
    this.textField3.x = 90;
    this.textField3.y = 20;
    this.textField3.color = '#000000';
    this.textField3.fontFamily = 'Verdana, sans-serif';

    // se agregan los objetos al estado
    this.addChild(this.background);
    this.addChild(this.puntuacion);
    this.addChild(this.carta1Group);
    this.addChild(this.carta2Group);
    this.addChild(this.textField);
    this.addChild(this.textField2);
    this.addChild(this.textField3);



    // se agregan las 18 cartas del tablero a sus grupos
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 90, 100));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 190, 100));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 290, 100));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 390, 100));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 490, 100));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 590, 100));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 90, 210));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 190, 210));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 290, 210));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 390, 210));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 490, 210));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 590, 210));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 90, 320));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 190, 320));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 290, 320));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 390, 320));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 490, 320));
    this.carta1Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta1"], 590, 320));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 90, 100));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 190, 100));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 290, 100));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 390, 100));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 490, 100));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 590, 100));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 90, 210));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 190, 210));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 290, 210));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 390, 210));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 490, 210));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 590, 210));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 90, 320));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 190, 320));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 290, 320));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 390, 320));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 490, 320));
    this.carta2Group.addChild(new Kiwi.GameObjects.Sprite(this, this.textures["carta2"], 590, 320));

    carta2visible = this.carta2Group.members;
    carta1visible = this.carta1Group.members;

    //se quita la visibilidad de las cartas volteadas
    carta2visible[0].visible = false;
    carta2visible[1].visible = false;
    carta2visible[2].visible = false;
    carta2visible[3].visible = false;
    carta2visible[4].visible = false;
    carta2visible[5].visible = false;
    carta2visible[6].visible = false;
    carta2visible[7].visible = false;
    carta2visible[8].visible = false;
    carta2visible[9].visible = false;
    carta2visible[10].visible = false;
    carta2visible[11].visible = false;
    carta2visible[12].visible = false;
    carta2visible[13].visible = false;
    carta2visible[14].visible = false;
    carta2visible[15].visible = false;
    carta2visible[16].visible = false;
    carta2visible[17].visible = false;
    this.puntuacion.visible = false;

    //se ponen las preguntas y respuestas

    this.ran = Math.floor(Math.random()*questionsM.length);
    this.preguntas[0] = questionsM[this.ran].p1;
    this.preguntas[1] = questionsM[this.ran].p2;
    this.preguntas[2] = questionsM[this.ran].p3;
    this.preguntas[3] = questionsM[this.ran].p4;
    this.preguntas[4] = questionsM[this.ran].p5;
    this.preguntas[5] = questionsM[this.ran].p6;
    this.preguntas[6] = questionsM[this.ran].p7;
    this.preguntas[7] = questionsM[this.ran].p8;
    this.preguntas[8] = questionsM[this.ran].p9;
    this.preguntas[9] = questionsM[this.ran].r1;
    this.preguntas[10] = questionsM[this.ran].r2;
    this.preguntas[11] = questionsM[this.ran].r3;
    this.preguntas[12] = questionsM[this.ran].r4;
    this.preguntas[13] = questionsM[this.ran].r5;
    this.preguntas[14] = questionsM[this.ran].r6;
    this.preguntas[15] = questionsM[this.ran].r7;
    this.preguntas[16] = questionsM[this.ran].r8;
    this.preguntas[17] = questionsM[this.ran].r9;



    // se declara que ningun par ha sido encontrado
    for (var i = 0; i < 18; i++) {
        this.gameOver[i] = true;
    }

    // se inicializa el arreglo con las parejas
    for (var i = 0; i < 9; i++) {
        this.respuestas[i] = i;
        this.respuestas[i + 9] = i;
    }

    // se revuelve el arreglo
    //this.respuestas.memory_tile_shuffle();
    this.shuffle(this.respuestas);

    // se sincronizan las respuestas con los textos
    for (var i = 0; i < 9; i++) {
        this.cont = 0;
        for (var j = 0; j < 18; j++) {
            if (this.respuestas[j] == i) {
                if (this.cont == 0) {
                    this.texto[j] = this.preguntas[i];
                    this.cont++;
                } else {
                    this.texto[j] = this.preguntas[i + 9];
                }

            }
        }
    }

}

// se actualiza el juego

memoryGameState.update = function() {

    Kiwi.State.prototype.update.call(this);

    if (!this.done) {

        //se declaran los miembros de los grupos de cartas para simplificar la variable 
        var cartas1 = this.carta1Group.members;
        var cartas2 = this.carta2Group.members;

        //se escriben los puntos extras que todavia se pueden ganar 
        this.textField3.text = "Puntos Extra: " + this.score;

        //se inicializa como si el juego ya hubiera terminado
        this.done = true;


        if (!this.bool) { //si ya se seleccionaron 2 cartas se espera a que vuelvan a dar click para voltear de nuevo las cartas

            // checa si se selcciona una carta
            if (this.mouse.isDown) {
                this.game.input.mouse.reset();
                for (var j = 0; j < cartas1.length; j++) {
                    if (cartas1[j].box.bounds.contains(this.mouse.x, this.mouse.y) && carta2visible[j].visible == false && carta1visible[j].visible == true) {
                        carta2visible[j].visible = true;
                        if (this.iCont != 0) {
                            this.textField2.text = "Carta 2: " +this.texto[j];
                            this.textField2.x = 90;
                            this.textField2.y = 460;
                            this.textField2.visible = true;
                        } else {
                            this.textField.text = "Carta 1: " +this.texto[j];
                            this.textField.x = 90;
                            this.textField.y = 430;
                            this.textField.visible = true;
                        }

                        this.par[this.iCont] = j;
                        this.iCont++;
                    }
                }

            }
        }


        // checa si las cartas sonn iguales
        if (this.iCont == 2) {
            this.bool = true;
            this.par1 = this.par[0];
            this.par2 = this.par[1];
            if (this.mouse.isDown) {
                this.game.input.mouse.reset();

                // si no son iguales se vuelven a voltear
                if (this.respuestas[this.par1] != this.respuestas[this.par2]) {
                    carta2visible[this.par1].visible = false;
                    carta2visible[this.par2].visible = false;
                    this.textField.visible = false;
                    this.textField2.visible = false;
                    this.score--;

                }
                // si son iguales desaparecen
                else {
                    this.gameOver[this.par1] = false;
                    this.gameOver[this.par2] = false;
                    carta2visible[this.par1].visible = false;
                    carta2visible[this.par2].visible = false;
                    carta1visible[this.par1].visible = false;
                    carta1visible[this.par2].visible = false;
                    this.textField.visible = false;
                    this.textField2.visible = false;

                }
                this.bool = false;
                this.iCont = 0;
            }


        }

        //checa si ya todos los pares fueron encontrados
        for (var i = 0; i < 18; i++) {
            if (this.gameOver[i]) {
                this.done = false;
            }
        }
    }
    if (this.done) {
        this.puntuacion.visible = true;
        this.textField3.x = 330;
        this.textField3.y = 245;
        this.textField2.fontSize = 15;
        this.textField3.fontSize = 15;
        this.textField3.color = '#FFFFFF';
        this.textField3.text = "puntuacion: " + (this.score + 15);
        this.textField2.text = "Da click al mouse para continuar.";
        this.textField2.x = 270;
        this.textField2.y = 340;
        this.textField2.fontWeight = "bold";
        this.textField2.color = '#FFFFFF';
        this.textField2.visible = true;



        if (this.mouse.isDown) {
            this.game.input.mouse.reset();
            this.game.states.switchState( "rouletteState" );
        }
    }



}

/*
Array.prototype.memory_tile_shuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
*/
//funcion para revolver el arreglo
memoryGameState.shuffle = function(arr) {
	var i = arr.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}


//myGame.states.addState( memoryGameState );
//myGame.states.switchState( "memoryGameState" );