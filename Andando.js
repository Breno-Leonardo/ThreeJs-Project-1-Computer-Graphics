// Controle de camera com GUI.

import * as THREE 			from 'three';
import { MTLLoader } 		from '/Assets/scripts/three.js/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } 		from '/Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '/Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls }	from '/Assets/scripts/three.js/examples/jsm/controls/FirstPersonControls.js';

import { CameraControls }	from '/Assets/scripts/three.js/examples/jsm/controls/experimental/CameraControls.js';


var 	scene,
		renderer,
		camera,clock,obj,positionYMax,positionXMax,positionXMin,positionZMax,positionZMin,
		camControl;

const 	rendSize 		= new THREE.Vector2();

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

	scene 	= new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 65.0, window.innerWidth/window.innerHeight, 0.01, 500.0);
	camControl =  new FirstPersonControls( camera, renderer.domElement );
	

	const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1.0 );
	scene.add( ambientLight );

	buildScene();

	render();
};


/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function onProgress( xhr ) {

	if ( xhr.lengthComputable ) {
		const percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
		}
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	var objMTL = new MTLLoader();
	objMTL.setPath( '/Assets/Models/OBJ/sponza/' );
	objMTL.load( 'sponza.mtl', loadMaterials); 
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMaterials( materials ) {

	materials.preload();

	var objLoader = new OBJLoader();

	objLoader.setMaterials( materials )
	objLoader.setPath( '/Assets/Models/OBJ/sponza/' )
	objLoader.load( 'sponza.obj', loadMesh, onProgress) ;

};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh( object ) {

	object.name = "cena";

	scene.add( object );

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
	
	

	camera.position.x = (box.max.x + box.min.x) / 2.0;
	camera.position.y = box.max.y / 7.5;
	positionYMax=camera.position.y;
	positionXMax=box.max.x;
	positionZMax=box.max.z;
	positionZMin=box.min.z;
	positionXMin=box.min.x;
	camera.position.z = 0;

	camera.lookAt(new THREE.Vector3( 0.0, 0.0, 0.0));

	var farPlane = Math.max(	(box.max.x - box.min.x),
								(box.max.y - box.min.y),
								(box.max.z - box.min.z) );

	camera.far 	= farPlane*10.0;
	camera.updateProjectionMatrix();
	camControl.lookSpeed = 0.035;
	camControl.movementSpeed = 200;
	camControl.noFly = false;
	camControl.lookVertical = true;
	camControl.constrainVertical = true;
	
	
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {
	
	//definindo limites do castelo
	camera.position.y =positionYMax;
	var minX=positionXMin-positionXMin*0.1,
	maxX=positionXMax-positionXMax*0.1,
	minZ=positionZMin-positionZMin*0.1,
	maxZ=positionZMax-positionZMax*0.1;// os 10% é para evitar que ele veja a parte preta 
	if(camera.position.x > maxX){
		camera.position.x = maxX;
	}	
	if(camera.position.x < minX){
		camera.position.x = minX;
	}	
	if(camera.position.z >maxZ){
		camera.position.z = maxZ;
	}	
	if(camera.position.z < minZ){
		camera.position.z = minZ;
	}	

	camControl.update(clock.getDelta());
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
