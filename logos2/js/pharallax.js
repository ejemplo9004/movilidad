	var scrolleando 				= false;
var posicionPersonas 			= 0;
var posicionNPC 				= 0;
var imagenPersonaje 			= 0;
var semaforoVerde 				= 0;
var settimeActivado 			= false;
var siguioCaminandoSett 		= false;
var estaChocado 				= false;
var miScaleFactor 				= true;
var barra 						= 0.0;
var esCarroCarrerasChocado 		= false;
var posScrollLoading 			= 0;
var posScrollLoadingTop			= 0;

// Semaforo que cambia
var posSemaforo = 0;

// Carro de carreras
var posicionInicialCarroCarreras 	=-890;
var alturaInicialCarroCarreras		= 400;
var posicionCarrerasTop				= 0;
var enQueSemaforo					= "verde";
var estaVisibleSemaforo				= false;

// posiciones
var posMetro 	= 0.0;
var posMontanas	= 0.0;

// Cada Letrero
var cualLetrero = 1;
var alphaLetrero= 0.0;
var yaLlamo		= false;
var direccionAlp= 1;

// Booleanos de sonidos
var audioGeneral	= true;
var ysCarro_rapido 	= false;
var ysChoqueTaxi	= false;
var ysBusFrenazo	= false;
var ysMotocaer		= false;
var ysMotoacelerar	= false;
var ysHeaven		= false;
var ysBusAcelerado	= false;
var ysChocado		= false;


function relojLoading(){
	posScrollLoading ++;
    document.getElementById("csroll").style.backgroundPosition 	= -posScrollLoading * 200 + "px " + posScrollLoadingTop + "px";
    var t = setTimeout(function(){relojLoading()},150);
}

function reloj() {
    posSemaforo++;
	document.getElementById("semaforoVerde").style.backgroundPosition 	= -posSemaforo * 170 + "px";

	if (estaVisibleSemaforo)	{
		if (audioGeneral) document.getElementById('semaforo_' + enQueSemaforo).play();
	}
    var t = setTimeout(function(){reloj()},100);
}

function relojSoft() {
    var diferencia = 0.01;
    diferencia =  $(window).scrollTop() - barra;
    if (Math.abs(diferencia) > 0.05) {
    	barra += diferencia / 5
    	moverCosas();
    };
    //barra = $(window).scrollTop();
    if (audioGeneral) document.getElementById("musica_fondo").play();
    if (!audioGeneral) document.getElementById("musica_fondo").pause();
    var t = setTimeout(function(){relojSoft()},100);
}

function relojLetreros(){

	document.getElementById("cuadro" + cualLetrero).style.opacity 	= alphaLetrero;

	alphaLetrero += 0.05 * direccionAlp;

	if (alphaLetrero > 2) {
		direccionAlp = -1;

		if (audioGeneral && (cualLetrero == 1 || cualLetrero== 2 || cualLetrero==5)) document.getElementById('mensaje' + cualLetrero).play();

		if (cualLetrero == 5){
			alphaLetrero= 0.0;
			direccionAlp = 1;
			cualLetrero++;
		}else if (cualLetrero == 6){
			cualLetrero = 7;
		}
	}else if ( alphaLetrero < 0) {
		alphaLetrero= 0.0;
		direccionAlp = 1;
		document.getElementById("cuadro" + cualLetrero).style.opacity 	= 0;
		cualLetrero++;
	};
	if (cualLetrero <7) var t = setTimeout(function(){relojLetreros()},30);
}

function start()
{
	 document.getElementById("csroll").style.width 	= "200px";
	 document.getElementById("csroll").style.height 	= "200px";
	document.getElementById("csroll").style.backgroundImage 	= "url('imagenes/scroll.png')";
	 var t = setTimeout(function(){reloj()},900);
	 var t = setTimeout(function(){relojSoft()},900);
	 var t = setTimeout(function(){relojLoading()},1);
	 document.getElementById("cuadro1").style.backgroundPosition 	= "0px";
	 document.getElementById("cuadro2").style.backgroundPosition 	= "-600px";
	 document.getElementById("cuadro3").style.backgroundPosition 	= "-1200px";
	 document.getElementById("cuadro4").style.backgroundPosition 	= "-1800px";
	 document.getElementById("cuadro5").style.backgroundPosition 	= "-2400px";
	 document.getElementById("cuadro6").style.backgroundPosition 	= "-3000px";
	 
}

function cambiaEsperarVerde(nuevoDato)
{
	if (siguioCaminandoSett == false) semaforoVerde = nuevoDato;
	document.getElementById("semaforo").style.backgroundPosition 	= "0px";
	enQueSemaforo = "verde";

	document.getElementById("semaforoVerde").style.backgroundImage 	= "url('imagenes/esperar_verde2.png')";
}

function posicionCiclista(delay)
{
	var ancho = 90;
	var aRetornar = -ancho * (posicionNPC + delay);
	return aRetornar;
}

$(window).load(function(){
   // PAGE IS FULLY LOADED  
   // FADE OUT YOUR OVERLAYING DIV
   document.title = "Cargado!";
   posScrollLoadingTop = 200;
});

$(document).ready(function(){ 

    $(window).scroll(function(){

        
    	 

    });

});

function PonerMute(){
	audioGeneral = !audioGeneral;
	if (audioGeneral)
	{
		document.getElementById("audio_mute").style.backgroundPosition = "0px";
	}else{
		document.getElementById("audio_mute").style.backgroundPosition = "45px";
	}
}

function moverCosas()
{
		var deltaTime = 0.7;
       // document.title = barra;
        
        //Esta parte es para hacer que el mismo metro pase dos veces de acuerdo a la posicion del Scroll

        var deltaMetro = -1400;
        if (barra>=6000)
        {
        	deltaMetro = -4200;
        }
		document.getElementById("metro").style.left			 			= deltaMetro + barra*(0.58)*deltaTime + "px";
		//----------------------------------------------------------------------


        if (miScaleFactor) {
        	document.getElementById("montanas1").style.backgroundPosition 	= "-" + (barra*0.03*deltaTime) + "px 0px";
        }
        if (miScaleFactor) {
        	document.getElementById("montanas2").style.backgroundPosition 	= "-" + (barra*0.07*deltaTime) + "px 0px";
        	posMontanas = (barra*0.07*deltaTime);
        }
		if (miScaleFactor) {
			document.getElementById("anden").style.backgroundPosition 		= "-" + (barra*0.3*deltaTime) + "px 0px";
			posMetro = (barra*0.3*deltaTime);
		}
		document.getElementById("zebra").style.backgroundPosition 		= 340 + barra*(-0.3)*deltaTime + "px 0px";
		document.getElementById("semaforo").style.left 					= 725 + barra*(-0.3)*deltaTime + "px";
		document.getElementById("carro1").style.left			 		= -20 + barra*(0.4)*deltaTime + "px";
		document.getElementById("carro2").style.left			 		= 830 + barra*(-0.3)*deltaTime + "px";
		document.getElementById("edificios").style.left			 		= 1800 + barra*(-0.3)*deltaTime + "px";
		document.getElementById("metrocable").style.left		 		= 1500 + barra*(-0.3)*deltaTime + "px";
		document.getElementById("moto1").style.left		 				= -200 + barra*(0.4)*deltaTime + "px";
		document.getElementById("carro_parte").style.left		 		= 2300 + barra*(-0.3)*deltaTime + "px";

		document.getElementById("metrocable").style.backgroundPosition 	= "-" + ((Math.floor(barra/100))*1353) + "px 0px";

		// Reiniciador
		if (barra< 1095){
			settimeActivado = false;
			siguioCaminandoSett = false;
			semaforoVerde = 0;
		}

		var opacity = 0.0;
		opacity = (barra/150);
		document.getElementById("csroll").style.opacity 	= 1-opacity;

		opacity = 0.0;
		opacity = ((barra - 500)/150);
		document.getElementById("semaforoVerde").style.opacity 	= opacity;
		if (opacity>=1){
			estaVisibleSemaforo = true;
		}else{
			estaVisibleSemaforo = false;
		}

		// Cambiar color del semaforo
		if (barra>= 1100)
		{
			
			if (settimeActivado == false){
				setTimeout(function(){cambiaEsperarVerde(1)},4000);
				settimeActivado = true;
				document.getElementById("semaforo").style.backgroundPosition 	= "64px";
				enQueSemaforo = "rojo";
				document.getElementById("semaforoVerde").style.backgroundImage 	= "url('imagenes/esperar_verde.png')";

			}

			


		// Carro verde que choca el muñeco
			if (barra < 2000) {
				if (semaforoVerde == 0){
					document.getElementById("carro2").style.top			 	= (-1100 + barra)*(0.07)*deltaTime + "px";
					document.getElementById("carro2").style.left			= 830 + ((-1100 + barra)*(-0.03)) + barra*(-0.3)*deltaTime + "px";
				}else{
					//document.getElementById("carro2").style.top			 	= (-1100 + 1100)*(0.07)*deltaTime + "px";
					document.getElementById("carro2").style.left			= 830 + barra*(-0.3)*deltaTime + "px";
				}
				
			}else{
				if (semaforoVerde == 0) {
					document.getElementById("carro2").style.top			 	= (-1100 + 2000)*(0.07)*deltaTime + "px";
					document.getElementById("carro2").style.left			= 830 + ((-1100 + 2000)*(-0.03)) + barra*(-0.3)*deltaTime + "px";
				}else{
					//document.getElementById("carro2").style.top			 	= (-1100 + 1100)*(0.07)*deltaTime + "px";
					document.getElementById("carro2").style.left			= 830 + barra*(-0.3)*deltaTime + "px";
				}
				
			}
			
		}else{

			document.getElementById("semaforo").style.backgroundPosition 	= "0px";
			enQueSemaforo = "verde";
			if (barra < 500 && barra>1100) document.getElementById("semaforoVerde").style.opacity 	= 0.0;
		}

		var bMaximo = 1600;
		if (barra>= bMaximo){
			var opacity = 0.0;
			opacity = 1-((barra-bMaximo)/150);
			document.getElementById("semaforoVerde").style.opacity 	= opacity;
			if (opacity>=1){
				estaVisibleSemaforo = true;
			}else{
				estaVisibleSemaforo = false;
			}
		}
		//----------------------------------------------------------------------

		// Hacer que el muñequito se detenga en la zebra
		if (barra>= 1990)
		{
			if (semaforoVerde == 0) {
				document.getElementById("personaje").style.left			 	= 400 + (barra-1990)*(-0.3)*deltaTime + "px";
				if (imagenPersonaje == 0 || imagenPersonaje == 1) {
					
					if (imagenPersonaje!=1) document.getElementById("personaje").style.backgroundImage 	= "url('imagenes/persona_chocada.png')";
					siguioCaminandoSett = true;
					imagenPersonaje = 1;
					if( posicionPersonas =Math.floor(barra / 100) < 28) posicionPersonas =Math.floor(barra / 100);
					document.getElementById("personaje").style.backgroundPosition 	= -100 * (posicionPersonas-1) + "px";
					
				}; 
		        if (barra > 2012 && siguioCaminandoSett){
		        	if (!ysChocado){
		        		if (audioGeneral) document.getElementById('atropellado').play();
		        		ysChocado = true;
		        	}
		        }else{
		        	ysChocado = false;
		        }
			}else{
				if (imagenPersonaje == 1 || imagenPersonaje == 2) {
					document.getElementById("personaje").style.backgroundImage 	= "url('imagenes/persona.png')";
					imagenPersonaje = 0;
				}; 
				document.getElementById("personaje").style.backgroundPosition 	= -100 * posicionPersonas + "px";
				posicionPersonas =Math.floor(barra / 100);
				document.getElementById("personaje").style.left			 		= 400 + (barra-1990)*(-0.2)*deltaTime + "px";
			}
		}else{
			if (imagenPersonaje == 1 || imagenPersonaje == 2) {
				document.getElementById("personaje").style.backgroundImage 	= "url('imagenes/persona.png')";
				imagenPersonaje = 0;
			}; 
			
			document.getElementById("personaje").style.backgroundPosition 	= -100 * posicionPersonas + "px";
			posicionPersonas =Math.floor(barra / 100);

		}
		//------------------------------------------------------------------------

		// Globo y motociclista actobata
		var inicioEfecto = 3300;
		var finEfecto = 5700;
		var tiempoMovimiento = 800;
		if (barra >= inicioEfecto)
		{
			if (barra > finEfecto){
				var opacity = 0.0;
				opacity = 1-((barra - finEfecto)/180);
				document.getElementById("moto_acrobacias_globo").style.opacity 	= opacity;	
			}else{
				var opacity = 0.0;
				opacity = (barra - inicioEfecto)/180;
				document.getElementById("moto_acrobacias_globo").style.opacity 	= opacity;
				var nMov;
				nMov = parseInt((barra - inicioEfecto)/tiempoMovimiento);
				document.getElementById("moto_acrobacias_globo").style.backgroundPosition 	= -233 * (nMov) + "px";
				ysMotoacelerar = false;
			}
		}else{
			document.getElementById("moto_acrobacias_globo").style.opacity 	= 0;
			document.getElementById("carro_globo").style.opacity 			= 0;
		}

		var posicionInicialMoto = -600;
		var maximoLeft = 0;
		var posicionMotosiclista =  posicionInicialMoto + barra*(0.3)*deltaTime ;

		if (posicionMotosiclista < maximoLeft)
		{
			document.getElementById("moto_acrobata").style.left = posicionMotosiclista + "px";

		}else{
			var posicionImagen = Math.floor((barra - finEfecto) / 100);
			if (posicionImagen<0) 
			{
				posicionImagen = 0;
				ysMotocaer = false;
			}
			if (posicionImagen>18) {
				posicionImagen = 18;
				if (!ysMotocaer)
				{
					if (audioGeneral) document.getElementById("motocae").play();
					ysMotocaer = true;
				}
				
			}

			if (!ysMotoacelerar && posicionImagen>1)
			{
				if (audioGeneral) document.getElementById("motoacelerando").play();
				ysMotoacelerar = true;
			}
			document.getElementById("moto_acrobata").style.backgroundPosition 	= -274 * posicionImagen + "px";


			var movimientoExtra = 2000;
			if (barra >= finEfecto + movimientoExtra)
			{
				document.getElementById("moto_acrobata").style.left			 	= maximoLeft + (barra-finEfecto - movimientoExtra)*(-0.3)*deltaTime + "px";
			}
		}
		//----------------------------------------------------------------------------

		// Control de los PNJ
		var posInicial = 1200;
		document.getElementById("PNJ1").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ1").style.backgroundPosition 	= -60 * posicionNPC + "px";
		
		posInicial = 1460;
		document.getElementById("PNJ2").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ2").style.backgroundPosition 	= (60+ (-60 * posicionNPC)) + "px";
		
		posInicial = 90;
		document.getElementById("PNJ3").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ3").style.backgroundPosition 	= (120 + (-60 * posicionNPC)) + "px";
		
		posInicial = 2000;
		document.getElementById("PNJ4").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ4").style.backgroundPosition 	= (-60 * posicionNPC) + "px";

		posInicial = 3680;
		document.getElementById("PNJ5").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ5").style.backgroundPosition 	= (-60 * posicionNPC) + "px";

		posInicial = 3180;
		document.getElementById("PNJ6").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ6").style.backgroundPosition 	= (-130 * posicionNPC) + "px";

		posInicial = 3380;
		document.getElementById("PNJ7").style.left	= posInicial + (barra)*(-0.25)*deltaTime + "px";
		document.getElementById("PNJ7").style.backgroundPosition 	= (-50 * posicionNPC) + "px";


		posInicial = 2460;
		document.getElementById("agente").style.left	= posInicial + (barra)*(-0.301)*deltaTime + "px";
		document.getElementById("agente").style.backgroundPosition 	= (-60 * posicionNPC) + "px";

		posInicial = 2430;
		document.getElementById("partido").style.left	= posInicial + (barra)*(-0.301)*deltaTime + "px";
		document.getElementById("partido").style.backgroundPosition 	= (-50 * posicionNPC) + "px";

		posInicial = 2980;
		if (barra<27100){
			document.getElementById("carro_casi_chocan").style.left	= posInicial + (barra)*(-0.15)*deltaTime + "px";
			//document.title =  barra + "/" + (posInicial + (barra)*(-0.15)*deltaTime);
		}else{
			document.getElementById("carro_casi_chocan").style.left	= 134.5 + (barra-27100)*(-0.04)*deltaTime + "px";
		}

		posInicial = 3305;
		if (barra<26950){
			document.getElementById("piedra").style.left				= posInicial + (barra)*(-0.15)*deltaTime + "px";
			
			document.getElementById("piedra").style.backgroundPosition 	= "0px";
		}else{
			//document.getElementById("piedra").style.left	= 134.5 + (barra-27100)*(-0.04)*deltaTime + "px";
			document.getElementById("piedra").style.backgroundPosition 	= "25px";
			document.getElementById("piedra").style.left				= "475.4626726562901px";
			document.getElementById("moto_sobrecupo").style.left		= "271.4484531022954px";
		}
		


		document.getElementById("busRX").style.backgroundPosition 	= -320 * imBus + "px";

		posicionNPC =Math.floor(barra / 100);


		


		// Control de los ciclistas.
		posInicial = 1400;
		document.getElementById("ciclista1").style.left	= posInicial + (barra)*(-0.2)*deltaTime + "px";
		document.getElementById("ciclista1").style.backgroundPosition 	= (posicionCiclista(1)) + "px";
		posInicial = 3300;
		document.getElementById("ciclista2").style.left	= posInicial + (barra)*(-0.2)*deltaTime + "px";
		document.getElementById("ciclista2").style.backgroundPosition 	= (posicionCiclista(1)) + "px";


		// Control Carro de carreras
		
		var deltaAltura 		= 0;
		var inicioDelEfecto1	= 7500;
		var maximoMovTop		= 50;
		var finEfecto1			= 8500;

		
		if (barra < finEfecto1)
		{
			if (barra >= inicioDelEfecto1) 
			{
				deltaAltura = (barra - inicioDelEfecto1) * (0.2) * deltaTime;
				if (deltaAltura > maximoMovTop)
				{
					deltaAltura = maximoMovTop;
					document.getElementById("carro_carreras1").style.backgroundPosition 	= (0) + "px";
				}else{
					document.getElementById("carro_carreras1").style.backgroundPosition 	= (160) + "px";
				}
			}else{
				document.getElementById("carro_carreras1").style.backgroundPosition 	= (0) + "px";
			}
			document.getElementById("carro_carreras1").style.top	= alturaInicialCarroCarreras + deltaAltura + "px";
			document.getElementById("carro_carreras1").style.left	= posicionInicialCarroCarreras + (barra)*(0.2)*deltaTime + "px";

			document.getElementById("carro_carreras2").style.top	= alturaInicialCarroCarreras + deltaAltura + "px";
			document.getElementById("carro_carreras2").style.left	= posicionInicialCarroCarreras + (barra)*(0.2)*deltaTime + "px";
			

		}else{
			// Globo y motociclista actobata
			inicioEfecto 		= 8600;
			finEfecto 			= 9800;
			tiempoMovimiento 	= 800;

			
			if (barra >= inicioEfecto)
			{
				if (barra > finEfecto){
					var opacity = 0.0;
					opacity = 1-((barra - finEfecto)/180);
					document.getElementById("carro_globo").style.opacity 	= opacity;
				}else{
					var opacity = 0.0;
					opacity = (barra - inicioEfecto)/180;
					document.getElementById("carro_globo").style.opacity 	= opacity;

				}
			}else{
				document.getElementById("carro_globo").style.opacity 	= 0;

			}

			if (barra > finEfecto) 
			{
				// Aparecer el globo del carro
				var opacity = 0.0;
				opacity = (barra - finEfecto)/820;

				if (opacity<0.4 && opacity > 0.3) opacity = 0.001;
				if (opacity<0.7 && opacity > 0.6) opacity = 0.001;

				document.getElementById("carro_carreras2").style.backgroundPosition 	= "0px " + posicionCarrerasTop + "px";
				document.getElementById("carro_carreras2").style.opacity 	= opacity;
				

				if (opacity >= 1) {
					document.getElementById("carro_carreras1").style.opacity 	= 0;
					if (!ysCarro_rapido)
					{
						if (audioGeneral) document.getElementById('carro_rapido').play();
						ysCarro_rapido = true;
					}
				}else{
					document.getElementById("carro_carreras1").style.opacity 	= 1;
					document.getElementById("carro_carreras2").style.top	= alturaInicialCarroCarreras + maximoMovTop - deltaAltura + "px";
					ysCarro_rapido = false;
				}

				// Juego de carreras
				if (opacity >= 1){


					inicioEfecto1 		= 10600;
					
					if (barra >= inicioDelEfecto1) 
					{
						deltaAltura = (barra-inicioEfecto1) * (0.2) * deltaTime;
						if (deltaAltura > maximoMovTop){
							deltaAltura = maximoMovTop;
							document.getElementById("carro_carreras2").style.backgroundPosition 	= "0px " + posicionCarrerasTop + "px";
						}else if (deltaAltura<0){
							deltaAltura = 0;
							document.getElementById("carro_carreras2").style.backgroundPosition 	= 0 + "px " + posicionCarrerasTop + "px";
						}else{
							document.getElementById("carro_carreras2").style.backgroundPosition 	= (-160 * 7) + "px " + posicionCarrerasTop + "px";
						}
						document.getElementById("carro_carreras2").style.top	= alturaInicialCarroCarreras + maximoMovTop - deltaAltura + "px";
						if (posicionInicialCarroCarreras + (finEfecto1 - inicioEfecto1 + barra)*(0.2)*deltaTime - ((-inicioEfecto1 + barra)*(0.1)) < 460) {
							document.getElementById("carro_carreras2").style.left	= posicionInicialCarroCarreras + (finEfecto1 - inicioEfecto1 + barra)*(0.2)*deltaTime - ((-inicioEfecto1 + barra)*(0.1)) + "px";
						};
						if (barra > 12710)
						{
							if (barra>12900) {
								document.getElementById("carro_no_carreras").style.backgroundPosition 	= 195*1 + "px";
							}else{
								document.getElementById("carro_no_carreras").style.backgroundPosition 	= 195*2 + "px";
								if (!ysChoqueTaxi){
									if (audioGeneral) document.getElementById("choque_taxi").play();
									ysChoqueTaxi = true;
								} 
							}
						}else{
							document.getElementById("carro_no_carreras").style.backgroundPosition 	= "0px";
							ysChoqueTaxi = false;
						}
						
					}else{
						document.getElementById("carro_carreras2").style.left	= document.getElementById("carro_carreras1").style.left;
					}
					

				}else{
					document.getElementById("carro_carreras2").style.left	= document.getElementById("carro_carreras1").style.left;
				}

			}else{
				document.getElementById("carro_carreras2").style.opacity 	= 0;
			}

		}

		// Control Carro no carreras y bus

		posInicial = 1600;
		document.getElementById("carro_no_carreras").style.left	= posInicial + (barra)*(-0.15)*deltaTime + "px";

		posInicial = 2060;
		if (barra<14190) document.getElementById("bus").style.left	= posInicial + (barra)*(-0.18)*deltaTime + "px";

		// Choque carro

		if (barra >= 12500)
		{
			if (!esCarroCarrerasChocado)
			{
				esCarroCarrerasChocado = true;

				//document.getElementById("carro_carreras2").style.backgroundImage 	= "url('imagenes/carro_veloz_estrellado-11.png')";
				posicionCarrerasTop = 90;
				document.getElementById("carro_carreras2").style.backgroundPosition 	= "0px " + posicionCarrerasTop + "px";
				document.getElementById("bus").style.backgroundPosition	= "320px";
				if (audioGeneral) document.getElementById("bus_choque").play();
			}

			var deltaAltura 		= 0;
			var inicioDelEfecto1	= 12500;
			var maximoMovTop		= 50;

		
			if (barra >= inicioDelEfecto1) 
			{
				deltaAltura = (barra - inicioDelEfecto1) * (0.2) * deltaTime;
				if (deltaAltura > maximoMovTop)
				{
					deltaAltura = maximoMovTop;
				}
			}

			document.getElementById("carro_carreras2").style.top	= alturaInicialCarroCarreras + deltaAltura + "px";
			var imaCarro = 0;
			imaCarro = Math.floor((barra-12500)/100);
			if (imaCarro < 18) {
				document.getElementById("carro_carreras2").style.backgroundPosition 	= -160 * imaCarro + "px " + posicionCarrerasTop + "px";
			}else{
				document.getElementById("carro_carreras2").style.left	= 460 - ((imaCarro-18)*(10)) + "px";
				//document.title = 460 - ((-inicioEfecto1 + barra)*(0.4)) + "px";
			}
		
			var inicioEfecto2 = 13000;
			if (barra >= inicioEfecto2)
			{
				var opacity = 0.0;
				opacity = 1-(-barra + inicioEfecto2 + 500)/820;
				document.getElementById("espiritu").style.opacity 	= opacity;
				document.getElementById("santo").style.opacity 	= opacity;

				var posinicial2 = 360;
				var posinicial3 = -100;
				document.getElementById("espiritu").style.top 		= posinicial2 - (barra-inicioEfecto2)*(0.1)*deltaTime + "px";
				if (barra<16295){
					var posicionDios = posinicial3 + (barra-inicioEfecto2)*(0.1)*deltaTime;
					if (posicionDios>70) posicionDios = 70;
					document.getElementById("santo").style.top 		= posicionDios + "px";
					if (!ysHeaven)
					{
						if (audioGeneral) document.getElementById("heavenlargo").play();
						ysHeaven = true;
					}
					
				}else{
					var posicionDios = (125)- (barra-16295)*(0.1)*deltaTime;
					if (posicionDios>70) posicionDios = 70;
					document.getElementById("santo").style.top 		= posicionDios + "px";
					document.getElementById("busRX").style.top 		= document.getElementById("bus").style.top;
				}
			}else{
				document.getElementById("espiritu").style.opacity 	= 0;
				document.getElementById("santo").style.opacity 	= 0;
				ysHeaven = false;

			}

		}else{
			if (esCarroCarrerasChocado)
			{
				esCarroCarrerasChocado = false;
				//document.getElementById("carro_carreras2").style.backgroundImage 	= "url('imagenes/carro_carreras2.png')";
				posicionCarrerasTop = 0;
				document.getElementById("carro_carreras2").style.backgroundPosition 	= "0px " + posicionCarrerasTop + "px";
				document.getElementById("bus").style.backgroundPosition	= "0px";
			}
		}

		if (barra>=23630){
			if (((barra-23630)*0.09*deltaTime + 400 ) < 460){
				document.getElementById("carro_casi_chocan").style.top 	= (barra-23630)*0.09*deltaTime + 400 + "px";
				document.getElementById("carro_casi_chocan").style.backgroundPosition 	= 160 + "px";
			}else{
				document.getElementById("carro_casi_chocan").style.backgroundPosition 	= "0px";
			}
			
		}else{
			document.getElementById("carro_casi_chocan").style.top 	= 400 + "px";
			document.getElementById("carro_casi_chocan").style.backgroundPosition 	= "0px";
		}

		if (barra>18878){
			var nAncho = (barra-18878)/10;

			if (nAncho > 320) nAncho = 320;
			document.getElementById("busRX").style.width = nAncho + "px";
			document.getElementById("busRX").style.left = document.getElementById("bus").style.left;
			

			var numeroInicial = 22878;
			if (barra>numeroInicial) 
			{
				document.getElementById("bus").style.opacity 	= 0;
				if (!ysBusFrenazo){
					if (audioGeneral) document.getElementById("frenazo").play();
					ysBusFrenazo = true;
				}
				var imBus = Math.floor((barra-numeroInicial)/100);
				if (imBus > 2) {
					if (imBus<5){
						imBus = 2;
					}else{
						imBus = imBus - 3;
					}
				};

				document.getElementById("busRX").style.backgroundPosition 	= -320 * imBus + "px";
				if (imBus < 6) {
					document.getElementById("busRX").style.left = 274 - (barra-numeroInicial)*(0.2)*deltaTime + "px";
					ysBusAcelerado = false;
				}else{
					document.getElementById("busRX").style.left = 274 - (barra-numeroInicial)*(0.2)*deltaTime + ((barra-numeroInicial-1000)*(0.7)*deltaTime) + "px";

			document.getElementById("moto_sobrecupo").style.backgroundPosition 	= "0px";
					if (!ysBusAcelerado) {
						if (audioGeneral) document.getElementById("busacelerando").play();
						ysBusAcelerado = true;
					};
					
				};
			} else{
				document.getElementById("bus").style.opacity 	= 1;
			};
		}else{
			document.getElementById("busRX").style.width = "0px";
			document.getElementById("bus").style.opacity 	= 1;
			document.getElementById("busRX").style.backgroundPosition 	= "0px";
			document.getElementById("moto_sobrecupo").style.backgroundPosition 	= "0px";
			ysBusFrenazo = false;
		}

		//Moto sobre cupo
		posInicial = -3500;
		if((posInicial + (barra)*(0.2)*deltaTime) < 275) {
			document.getElementById("moto_sobrecupo").style.left	= posInicial + (barra)*(0.2)*deltaTime + "px";
			miScaleFactor = true;
		}else{
			var imBus = -75  + Math.floor((barra-numeroInicial - posInicial)/70) - 32;
			//document.title = imBus;
			if (imBus < 0) imBus = 0;
			if (imBus<=49) document.getElementById("moto_sobrecupo").style.backgroundPosition 	= -300 * imBus + "px";
			document.getElementById("anden").style.backgroundPosition 		= 175 + posMetro + ((barra - numeroInicial - posInicial)*-0.03*deltaTime) + "px 0px";
			document.getElementById("montanas2").style.backgroundPosition 	= 120 + posMontanas + (-(barra - numeroInicial - posInicial + 5000)*0.007*deltaTime) + "px 0px";
			document.getElementById("montanas1").style.backgroundPosition 	= -120 + posMontanas + (-(barra - numeroInicial - posInicial+ 100)*0.03*deltaTime) + "px 0px";
			miScaleFactor = false;
		}

		if (barra>27000){
			var opacity = 0.0;
			opacity = ((barra - 27000)/3000);
			if (!yaLlamo) document.getElementById("cuadroBlanco").style.opacity 	= opacity;

			if (opacity >=1 && !yaLlamo) {
				yaLlamo = true;
				relojLetreros();
			};
		}else{
			if (!yaLlamo) document.getElementById("cuadroBlanco").style.opacity 	= 0;
		}
}