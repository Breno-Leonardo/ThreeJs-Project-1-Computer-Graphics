// Controle de camera com GUI.

import * as THREE from 'three';
import {
	MTLLoader
} from '/Assets/scripts/three.js/examples/jsm/loaders/MTLLoader.js';
import {
	OBJLoader
} from '/Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';
import {
	FirstPersonControls
} from '/Assets/scripts/three.js/examples/jsm/controls/FirstPersonControls.js';
import {
	GUI
} from '../../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';



var scene,
	renderer,
	camera, clock, obj, positionYMax, positionXMax, positionXMin, positionZMax, positionZMin, controls, vx, vy, vz, speed,si=false,
	camControl;
const gui = new GUI();
var l1, l2, l3, l4;
const rendSize = new THREE.Vector2();

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {
	clock = new THREE.Clock(true);

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(65.0, window.innerWidth / window.innerHeight, 0.01, 500.0);
	camControl = new FirstPersonControls(camera, renderer.domElement);
	initGUI();


	const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);
	scene.add(ambientLight);

	buildScene();

	render();
};


/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function onProgress(xhr) {

	if (xhr.lengthComputable) {
		const percentComplete = xhr.loaded / xhr.total * 100;
		console.log(Math.round(percentComplete, 2) + '% downloaded');
	}
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	var objMTL = new MTLLoader();
	objMTL.setPath('/Assets/Models/OBJ/sponza/');
	objMTL.load('sponza.mtl', loadMaterials);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMaterials(materials) {

	materials.preload();

	var objLoader = new OBJLoader();

	objLoader.setMaterials(materials)
	objLoader.setPath('/Assets/Models/OBJ/sponza/')
	objLoader.load('sponza.obj', loadMesh, onProgress);

};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(object) {

	object.name = "cena";

	scene.add(object);

	ajusteCamera();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function ajusteCamera() {

	obj = scene.getObjectByName("cena");

	const helper = new THREE.BoxHelper();
	helper.setFromObject(obj);

	helper.geometry.computeBoundingBox();

	const box = new THREE.Box3().setFromObject(obj);



	camera.position.x = box.min.x + box.max.x * 0.5;
	camera.position.y = box.max.y / 7.5;
	camera.position.z = -box.max.z * 0.4;

	positionYMax = camera.position.y;
	positionXMax = box.max.x;
	positionZMax = box.max.z;
	positionZMin = box.min.z;
	positionXMin = box.min.x;


	var farPlane = Math.max((box.max.x - box.min.x),
		(box.max.y - box.min.y),
		(box.max.z - box.min.z));

	camera.far = farPlane * 10.0;
	speed = 1.5;

	vx = positionXMax * 0.53;
	vy = positionYMax;
	vz = camera.position.z;
	camera.updateProjectionMatrix();

	camControl.lookSpeed = 0.035;
	camControl.movementSpeed = 0;
	camControl.noFly = false;
	camControl.activeLook = true;
	camControl.lookVertical = true;
	camControl.constrainVertical = true;


}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	camera.position.y = positionYMax;
	// primeiro corredor
	if (l1.getValue() == true) {
		camera.activeLook=false;
		l1.disable(true);
		if (camera.position.x < positionXMax * 0.53) {
			camera.position.x += speed;
			vx = positionXMax * 0.53 + (positionXMax * 0.53) * 0.1;

		} else if (camera.position.z < 0) {
			camera.position.z += speed;

			vz += 25;
			vx -= 125;
		} else { //terminou
			l2.disable(false);
			l1.setValue(false);
			camera.activeLook=true;
		}
	}
	//meio das bandeira
	if (l2.getValue() == true) {
		camera.activeLook=false;
		l2.disable(true);
		vz = 0;
		if (camera.position.x > (positionXMin + positionXMax * 1)) {
			camera.position.x -= speed;
			vx = positionXMin + positionXMax * 0.5 + (positionXMin + positionXMax * 0.5) * 0.1;
		} else { //terminou
			l3.disable(false);
			l2.setValue(false);
			camera.activeLook = true;
		}
	}
	// fim das bandeiras
	if (l3.getValue() == true) {
		camera.activeLook=false;
		l3.disable(true);
		vz = 0;
		if (camera.position.x > positionXMin + positionXMax * 0.4) {
			camera.position.x -= speed;
			vx=positionXMin + positionXMax * 0.5+(positionXMin + positionXMax * 0.5)*0.1;
		} else { //terminou
			l4.disable(false);
			l3.setValue(false);
			camera.activeLook = true;
		}
	}
	//janelas
	if (l4.getValue() == true) {
		camera.activeLook=false;
		l4.disable(true);
		
		 if (camera.position.z < positionZMax * 0.33&& si==false) {
			camera.position.z += speed;
			camera.position.x += speed/2;
			vx=positionXMin + positionXMax * 0.5;
			vz=positionZMax * 0.4+(positionZMax * 0.4)*0.1;
		} 
		else if (camera.position.x < 0) {
			si=true;
			camera.position.x += speed;
			camera.position.z -= 0.1;
			vz=positionZMax * 0.4+(positionZMax * 0.4)*0.1;
			vx=positionXMax * 0.43 + positionXMax * 0.43 * 0.1;
			
		}

		else { //terminou
			l4.setValue(false);
			camera.activeLook = true;
		}
	}
	


	camControl.update(clock.getDelta());
	if (camera.activeLook == false)
		camera.lookAt(new THREE.Vector3(vx, vy, vz));
	renderer.render(scene, camera);
	
	requestAnimationFrame(render);
}

function initGUI() {

	controls = {
		Local1: false,
		Local2: false,
		Local3: false,
		Local4: false,

	};

	l1 = gui.add(controls, 'Local1');


	l2 = gui.add(controls, 'Local2');
	l2.disable(true);

	l3 = gui.add(controls, 'Local3');
	l3.disable(true);

	l4 = gui.add(controls, 'Local4');
	l4.disable(true);


	gui.open();
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
