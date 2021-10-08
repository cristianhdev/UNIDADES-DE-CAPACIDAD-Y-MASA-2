

let sliders = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6','slide-7']
let audios_sond = ['Audio1', 'Audio2','Audio2','Audio2','Audio2','Audio2','Audio2']
let arrayBotonesResultados = [
	'resultado-1', 'resultado-2'
];




let mensajesActividad = document.querySelectorAll('.mensajeActividad')


let presentacion_slide = 0
let audio;
let audioOvers;
let audiosBotonesOver;
let path_sound = './assets/sounds/'
let fila=0



function init() {
	document.body.addEventListener('keyup', presentacionteclado, false)
	document.getElementById('siguiente').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('siguiente').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('atras').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('atras').addEventListener('mouseout', btnSoundOut, false)
	/* document.getElementById('repetir2').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('repetir2').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('btnComprobar').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('btnComprobar').addEventListener('mouseout', btnSoundOut, false) */
	cargarAudio(true);
}



function btnSoundOver() {
	audioOvers = new Audio(`${path_sound}61.mp3`);
	audioOvers.play();
}

function btnSoundOut() {
	audioOvers.pause();
}

function presentacionteclado(e) {
	if (e.keyCode == 39) {

		siguiente()
	}

	if (e.keyCode == 37) {
		if (getCurrentSlider() == 0) {

		} else {
			atras()
		}

	}


	if (e.keyCode == 13 && presentacion_slide == sliders.length - 1) {
		comprobar()
	}


}

function cargarAudio(loop = false) {

	if (audios_sond[presentacion_slide] != null || audios_sond[presentacion_slide] != undefined) {
		audio = new Audio(`${path_sound}${audios_sond[presentacion_slide]}.mp3`);
		audio.loop = loop
		audio.play();
		audio.onloadeddata = function () {


		};
		audio.addEventListener('ended', function () {

		});
	}

}

function changeSound(new_sond) {
	audio.src = `${path_sound}${new_sond}.mp3`;
	audio.pause();
	audio.load();
	audio.play();
	/* audio.addEventListener("timeupdate", function () {
		
	}, false); */
	audio.addEventListener('canplaythrough', function () {
		/* document.getElementById('contenedor-explicacion-paralelogramo') */
		//videoEscenas[getCurrentSlider() - 1].play()
	}, false);
	audio.addEventListener('ended', function () {
		cambiotexto = false
	});
}


function presentacion() {
	if (presentacion_slide == 0) {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "hidden"
		//document.getElementById('visubility').style.display = "inline-block"

	} else if (presentacion_slide == sliders.length - 1) {
		document.getElementById('siguiente').style.display = "none"
		//document.getElementById('atras').style.display = "none"

		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('atras').style.display = "inline-block"
		/*document.getElementById('atras').style.visibility = "visible" */

	} else {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('siguiente').style.visibility = "visible"

		/* document.getElementById('actividad').style.display = "none" */

	}
	/* console.log(`slide-${presentacion_slide}`);*/
}


function siguiente() {
	if (presentacion_slide == sliders.length - 1) {
	} else {
		presentacion_slide++
		document.getElementById(sliders[presentacion_slide - 1]).style.display = "none"
		document.getElementById(sliders[presentacion_slide]).style.display = "block"
		audioOvers = new Audio(`${path_sound}60.mp3`);
		audioOvers.play();
		limpiarResultados()
		changeSound(audios_sond[presentacion_slide])
		presentacion()
	}
}

function atras() {
	presentacion_slide--
	document.getElementById(sliders[presentacion_slide + 1]).style.display = "none"
	document.getElementById(sliders[presentacion_slide]).style.display = "block"
	audioOvers = new Audio(`${path_sound}60.mp3`);
	audioOvers.play();
	limpiarResultados()
	changeSound(audios_sond[presentacion_slide])
	presentacion()
}

function getCurrentSlider() {
	return presentacion_slide
}


function comprobar() {
	switch (getCurrentSlider()) {
		case 4:
			Actividad1()

			break;
		case 5:
			Actividad2();

			break;
		case 6:
			Actividad3();
				break;
		default:
			break;
	}


}


function Actividad1(){

			let valoresRespuesta = [
				['64', 'x', '10.000', '640.000'],
				['235', 'x', '100', '23.500'],
				['567', ':', '10', '56,7'],
				['0,0543', 'x', '100.000', '5.430'],
				['25,3', ':', '10', '2,53']
			];


			let inputsT = document.querySelectorAll(
				`${"#tabla-" +  + getCurrentSlider()}  td > .input`
			);
			let cajascheck = document.querySelectorAll(
				`${"#tabla-" +  + getCurrentSlider()}  td > .recuadro`
			);
			let resultado = []
			let resultadosTabla=[]
			
		
			
			inputsT.forEach((element) => {
				resultadosTabla.push(element.value)
			});

			
			let tablero_inputs = new Array(4);

			for (let j = 0; j < 5; j++) {
				tablero_inputs[j] = new Array(4)
			}
		
		
			let numeros = 0;
			let inputFilas = 4;
			let inputColumnas = 5;
			for (let j = 0; j < inputColumnas; j++) {
				for (let i = 0; i < inputFilas; i++) {		
					try {
					tablero_inputs[j][i] = resultadosTabla[numeros]
					} catch (error) {
					console.log(error);
					}
					numeros++
				}
			}
			
			
			
	

			tablero_inputs.forEach((valuetablafila,index)=>{
				
				/* console.log(valuetabla,valoresRespuesta[index]) */
				if (JSON.stringify(tablero_inputs[index]) === JSON.stringify(valoresRespuesta[index])) {
					//inputsT[index].style.border = "1px solid green";
					resultado.push(true)
					mensajesActividad[0].style.visibility="hidden"
					cajascheck[index].classList.remove('imagen-correcta-resultado')
					cajascheck[index].classList.remove('imagen-incorrecta-resultado')
					cajascheck[index].classList.add('imagen-correcta-resultado')
				} else {
					//inputsT[index].style.border = "2px solid red";
					mensajesActividad[0].style.visibility="visible"
					cajascheck[index].classList.remove('imagen-correcta-resultado')
					cajascheck[index].classList.remove('imagen-incorrecta-resultado')
					cajascheck[index].classList.add('imagen-incorrecta-resultado')
				}
				
			})
}

function Actividad2() {

	//Actividad 2 tabla A
	let valoresRespuestaTablaA = [
		['6', 'x', '100', '600'],
		['505', ':', '10', '50,5'],
		['2.556', ':', '1.000', '2.556'],
		['15,6', ':', '100', '0,156'],
		['5,5', 'x', '100', '550']
	];


	let inputsTA = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'a'}  td > .input`
	);
	let cajascheckA = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'a'}  td > .recuadro`
	);
	let resultadoA = []
	let resultadosTablaA=[]
	

	
	inputsTA.forEach((element) => {
		resultadosTablaA.push(element.value)
	});

	
	let tablero_inputsA = new Array(4);

	for (let j = 0; j < 5; j++) {
		tablero_inputsA[j] = new Array(4)
	}



	let numerosA = 0;
	let inputFilasA = 4;
	let inputColumnasA = 5;
	for (let j = 0; j < inputColumnasA; j++) {
		for (let i = 0; i < inputFilasA; i++) {		
			try {
			tablero_inputsA[j][i] = resultadosTablaA[numerosA]
			} catch (error) {
			console.log(error);
			}
			numerosA++
		}
	}
	

	tablero_inputsA.forEach((valuetablafilaA,indexA)=>{
		
		/* console.log(valuetabla,valoresRespuesta[index]) */
		if (JSON.stringify(tablero_inputsA[indexA]) === JSON.stringify(valoresRespuestaTablaA[indexA])) {
			//inputsT[index].style.border = "1px solid green";
			resultadoA.push(true)
			mensajesActividad[1].style.visibility="hidden"
			cajascheckA[indexA].classList.remove('imagen-correcta-resultado')
			cajascheckA[indexA].classList.remove('imagen-incorrecta-resultado')
			cajascheckA[indexA].classList.add('imagen-correcta-resultado')
		} else {
			//inputsT[index].style.border = "2px solid red";
			mensajesActividad[1].style.visibility="visible"
			cajascheckA[indexA].classList.remove('imagen-correcta-resultado')
			cajascheckA[indexA].classList.remove('imagen-incorrecta-resultado')
			cajascheckA[indexA].classList.add('imagen-incorrecta-resultado')
		}
		
	})

	//Actividad 2 tabla B
	let valoresRespuestaTablaB = [
		['7', ':', '10', '0,7'],
		['253', 'x', '100', '25.300'],
		['8', ':', '10.000', '0,0008'],
		['25,3', 'x', '100', '2.530']
	];


	let inputsTB = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'b'}  td > .input`
	);
	let cajascheckB = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'b'}  td > .recuadro`
	);
	let resultadoB = []
	let resultadosTablaB=[]
	

	
	inputsTB.forEach((element) => {
		resultadosTablaB.push(element.value)
	});

	
	let tablero_inputsB = new Array(4);

	for (let j = 0; j < 4; j++) {
		tablero_inputsB[j] = new Array(4)
	}



	let numerosB = 0;
	let inputFilasB = 4;
	let inputColumnasB = 4;
	for (let j = 0; j < inputColumnasB; j++) {
		for (let i = 0; i < inputFilasB; i++) {		
			try {
			tablero_inputsB[j][i] = resultadosTablaB[numerosB]
			} catch (error) {
			console.log(error);
			}
			numerosB++
		}
	}
	

	tablero_inputsB.forEach((valuetablafilaB,indexB)=>{
		
	
		if (JSON.stringify(tablero_inputsB[indexB]) === JSON.stringify(valoresRespuestaTablaB[indexB])) {
			//inputsT[index].style.border = "1px solid green";
			resultadoB.push(true)
			mensajesActividad[1].style.visibility="hidden"
			cajascheckB[indexB].classList.remove('imagen-correcta-resultado')
			cajascheckB[indexB].classList.remove('imagen-incorrecta-resultado')
			cajascheckB[indexB].classList.add('imagen-correcta-resultado')
		} else {
			//inputsT[index].style.border = "2px solid red";
			mensajesActividad[1].style.visibility="visible"
			cajascheckB[indexB].classList.remove('imagen-correcta-resultado')
			cajascheckB[indexB].classList.remove('imagen-incorrecta-resultado')
			cajascheckB[indexB].classList.add('imagen-incorrecta-resultado')
		}
		
	})

}

function Actividad3() {

	//Actividad 3 tabla A
	let valoresRespuestaTablaA = [
		['0,014', 'x', '1000', '14'],
		['5', 'x', '1.000.000', '5.000.000'],
		['0,0056', 'x', '10.000', '56'],
		['85', ':', '10', '850']
	];


	let inputsTA = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'a'}  td > .input`
	);
	let cajascheckA = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'a'}  td > .recuadro`
	);
	let resultadoA = []
	let resultadosTablaA=[]
	

	
	inputsTA.forEach((element) => {
		resultadosTablaA.push(element.value)
	});

	
	let tablero_inputsA = new Array(4);

	for (let j = 0; j < 4; j++) {
		tablero_inputsA[j] = new Array(4)
	}



	let numerosA = 0;
	let inputFilasA = 4;
	let inputColumnasA = 4;
	for (let j = 0; j < inputColumnasA; j++) {
		for (let i = 0; i < inputFilasA; i++) {		
			try {
			tablero_inputsA[j][i] = resultadosTablaA[numerosA]
			} catch (error) {
			console.log(error);
			}
			numerosA++
		}
	}
	

	tablero_inputsA.forEach((valuetablafilaA,indexA)=>{
		

		if (JSON.stringify(tablero_inputsA[indexA]) === JSON.stringify(valoresRespuestaTablaA[indexA])) {
			//inputsT[index].style.border = "1px solid green";
			resultadoA.push(true)
			mensajesActividad[1].style.visibility="hidden"
			cajascheckA[indexA].classList.remove('imagen-correcta-resultado')
			cajascheckA[indexA].classList.remove('imagen-incorrecta-resultado')
			cajascheckA[indexA].classList.add('imagen-correcta-resultado')
		} else {
			//inputsT[index].style.border = "2px solid red";
			mensajesActividad[1].style.visibility="visible"
			cajascheckA[indexA].classList.remove('imagen-correcta-resultado')
			cajascheckA[indexA].classList.remove('imagen-incorrecta-resultado')
			cajascheckA[indexA].classList.add('imagen-incorrecta-resultado')
		}
		
	})

	//Actividad 2 tabla B
	let valoresRespuestaTablaB = [
		['3', ':', '10', '0,3'],
		['535', ':', '100', '5,35'],
		['45', ':', '1.000', '0,045'],
		['86', ':', '100', '0,86']
	];


	let inputsTB = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'b'}  td > .input`
	);
	let cajascheckB = document.querySelectorAll(
		`${"#tabla-" +  + getCurrentSlider()+'b'}  td > .recuadro`
	);
	let resultadoB = []
	let resultadosTablaB=[]
	

	
	inputsTB.forEach((element) => {
		resultadosTablaB.push(element.value)
	});

	
	let tablero_inputsB = new Array(4);

	for (let j = 0; j < 4; j++) {
		tablero_inputsB[j] = new Array(4)
	}



	let numerosB = 0;
	let inputFilasB = 4;
	let inputColumnasB = 4;
	for (let j = 0; j < inputColumnasB; j++) {
		for (let i = 0; i < inputFilasB; i++) {		
			try {
			tablero_inputsB[j][i] = resultadosTablaB[numerosB]
			} catch (error) {
			console.log(error);
			}
			numerosB++
		}
	}


	tablero_inputsB.forEach((valuetablafilaB,indexB)=>{
		
		if (JSON.stringify(tablero_inputsB[indexB]) === JSON.stringify(valoresRespuestaTablaB[indexB])) {
			//inputsT[index].style.border = "1px solid green";
			resultadoB.push(true)
			mensajesActividad[2].style.visibility="hidden"
			cajascheckB[indexB].classList.remove('imagen-correcta-resultado')
			cajascheckB[indexB].classList.remove('imagen-incorrecta-resultado')
			cajascheckB[indexB].classList.add('imagen-correcta-resultado')
		} else {
			//inputsT[index].style.border = "2px solid red";
			mensajesActividad[2].style.visibility="visible"
			cajascheckB[indexB].classList.remove('imagen-correcta-resultado')
			cajascheckB[indexB].classList.remove('imagen-incorrecta-resultado')
			cajascheckB[indexB].classList.add('imagen-incorrecta-resultado')
		}
		
	})

}

function limpiarResultados(){
	mensajesActividad.forEach((element) =>{
		element.style.visibility="hidden"
	})

	let inputs=document.querySelectorAll('.input')
	inputs.forEach((element) =>{
		element.value=""
	})

	let recuadrosRespuesta=document.querySelectorAll('.recuadro')
	recuadrosRespuesta.forEach((element) =>{
		element.classList.remove('imagen-correcta-resultado')
		element.classList.remove('imagen-incorrecta-resultado')
	})
}