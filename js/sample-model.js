/* INDEX

1. Global variables, seetings, and buttons.
2. Animate loop

*/

// GLOBAL VARIABLES

var renderer, container, scene, loader, mesh1, mesh2, mesh3, mesh4, mesh5, terrain, myTarget, camera, cam1, cam2, con1, con2, whiteLight, yellowLight, redLight, clock, stats;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 10,
FAR = 10000;

var camera_cw = false;
var camera_ccw = false;

var lights_cw = true;
var lights_ccw = false;

// BUTTON INITIALIZATIONS

$( 'input#light1' ).addClass( 'active' );
$( 'input#light2' ).bootstrapToggle('off');
$( 'input#light3' ).bootstrapToggle('off');

$( 'button#lighta' ).addClass( 'active' );

$( 'button#camerab' ).addClass( 'active' );

$( 'input#layer1' ).addClass( 'active' );
$( 'input#layer2' ).addClass( 'active' );
$( 'input#layer3' ).addClass( 'active' );

$( 'button#controlb' ).addClass( 'active' );

$( 'input#vr-mode' ).bootstrapToggle('off');

// FUNCTIONS

function render() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

var axis = new THREE.Vector3( 0, 1, 0 );
var camRadIncrement = 0;
var lightRadIncrement = 0;
var rad = 1000*(2*Math.PI/360);

function update() {
 	delta = clock.getDelta();

 	if ( camera_cw ){
 		camRadIncrement += delta * rad;

		camera.position.x = 2820 * Math.cos( camRadIncrement );
		camera.position.y = 2000;
		camera.position.z = 2820 * Math.sin( camRadIncrement );
 	}
 	if ( camera_ccw ){
 		camRadIncrement -= delta * rad;

		camera.position.x = 2820 * Math.cos( camRadIncrement );
		camera.position.y = 2000;
		camera.position.z = 2820 * Math.sin( camRadIncrement );
 	}
 	if ( lights_cw ){
 		lightRadIncrement += delta * rad;
 		updateLights();

 	}
 	if ( lights_ccw ){
		lightRadIncrement -= delta * rad;
		updateLights();
 	}
}

function updateLights() {
	whiteLight.position.x = 2820 * Math.cos( lightRadIncrement );
	whiteLight.position.y = 2000;
	whiteLight.position.z = 2820 * Math.sin( lightRadIncrement );

	yellowLight.position.x = 2820 * Math.cos( lightRadIncrement + 1000*120*2*Math.PI/360 );
	yellowLight.position.y = 2000;
	yellowLight.position.z = 2820 * Math.sin( lightRadIncrement + 1000*120*2*Math.PI/360 );

	redLight.position.x = 2820 * Math.cos( lightRadIncrement + 1000*240*2*Math.PI/360 );
	redLight.position.y = 2000;
	redLight.position.z = 2820 * Math.sin( lightRadIncrement + 1000*240*2*Math.PI/360 );
}

function animate() {
	//requestAnimationFrame( animate );
	controls.update( clock.getDelta() );
	render();
	update();
	stats.update();
}

function toggleControls() {
	if ( $( 'button#controla' ).hasClass( 'active' ) ) {
		setControlsOrbit();
		$( 'div#instructions p' ).replaceWith("<p>left mouse: rotate<br>middle mouse: zoom<br>right mouse: pan</p>");
	}
	if ( $( 'button#controlb' ).hasClass( 'active' ) ) {
		setControlsFirstPerson();
		$( 'div#instructions p' ).replaceWith("<p>left mouse: forward<br>right mouse: back<br>WASD: forward/left/back/right<br>RF: up/down</p>");
	}
}

function setControlsFirstPerson() {
	var prevCamera = camera;
	cam1.position.copy( prevCamera.position );
    camera = cam1;
    con1.lon = 180 + 360*prevCamera.rotation.y/(2*Math.PI);
    controls = con1;
}

function setControlsOrbit() {
	var prevCamera = camera;
	cam2.position.copy( prevCamera.position );
    cam2.rotation.copy( prevCamera.rotation );
    camera = cam2;

    controls = con2;
}

function onWindowResize() {
	var win = $( this );
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize( WIDTH, HEIGHT );
}

// MAIN PROGRAM

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
if( Detector.webgl ){
	renderer = new THREE.WebGLRenderer({
		antialias: true,				// to get smoother output
		preserveDrawingBuffer: true		// to allow screenshot
	});
	renderer.setClearColor( 0xd6e7fb, 1.0 );
} else {
	renderer = new THREE.CanvasRenderer();
}
renderer.setSize( WIDTH, HEIGHT );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.shadowMapEnabled = true;

container = document.getElementById( '3d' );
container.appendChild( renderer.domElement );

scene = new THREE.Scene();

loader = new THREE.JSONLoader();

loader.load('sample-model-json/sample-concrete.js', function ( geometry, materials ) {
	mesh1 = new THREE.Mesh(
		geometry, new THREE.MeshFaceMaterial( materials )
	);

	mesh1.rotation.x = -Math.PI / 2;
	mesh1.castShadow = true;
	mesh1.receiveShadow = true;
	scene.add( mesh1 );
});

loader.load('sample-model-json/sample-facade-windows.js', function ( geometry, materials ) {
	mesh2 = new THREE.Mesh(
		geometry, new THREE.MeshFaceMaterial( materials )
	);

	mesh2.rotation.x = -Math.PI / 2;
	mesh2.castShadow = false;
	mesh2.receiveShadow = true;
	scene.add( mesh2 );
});

loader.load('sample-model-json/sample-facade-mullion.js', function ( geometry, materials ) {
	mesh3 = new THREE.Mesh(
		geometry, new THREE.MeshFaceMaterial( materials )
	);

	mesh3.rotation.x = -Math.PI / 2;
	mesh3.castShadow = true;
	mesh3.receiveShadow = true;
	scene.add( mesh3 );
});

loader.load('sample-model-json/sample-steel-beams.js', function ( geometry, materials ) {
	mesh4 = new THREE.Mesh(
		geometry, new THREE.MeshFaceMaterial( materials )
	);

	mesh4.rotation.x = -Math.PI / 2;
	mesh4.castShadow = false;
	mesh4.receiveShadow = true;
	scene.add( mesh4 );
});

loader.load('sample-model-json/sample-steel-columns.js', function ( geometry, materials ) {
	mesh5 = new THREE.Mesh(
		geometry, new THREE.MeshFaceMaterial( materials )
	);

	mesh5.rotation.x = -Math.PI / 2;
	mesh5.castShadow = true;
	mesh5.receiveShadow = true;
	scene.add( mesh5 );

	render();
});

terrain = new THREE.Mesh(
new THREE.BoxGeometry(4000, 10, 4000), new THREE.MeshPhongMaterial({
    color: 0x46882c
}));
terrain.receiveShadow = true;
terrain.position.set(0, -10, 0);
terrain.rotation.set(0, 0, 0);
scene.add(terrain);

var myTarget = new THREE.Object3D();
myTarget.position.set( 0, 400, 0 );

light = new THREE.HemisphereLight( 0xffffff, 0xd6e7fb, 1.0 );
scene.add( light );

var whiteLight = new THREE.SpotLight( 0xffffff, 1.0 );
whiteLight.position.x = 2820;
whiteLight.position.y = 2000;
whiteLight.position.z = 0;
whiteLight.target = myTarget;
whiteLight.castShadow = true;
whiteLight.shadowDarkness = 0.5;
whiteLight.shadowMapWidth = 1500;
whiteLight.shadowMapHeight = 1000;
whiteLight.shadowCameraNear = 1500;
whiteLight.shadowCameraFar = 6000;
whiteLight.shadowCameraFov = 45;
whiteLight.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

var orb_mesh1 = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
whiteLight.add( orb_mesh1 );

var yellowLight = new THREE.SpotLight( 0xffff00, 0.0 );
yellowLight.position.x = 2820;
yellowLight.position.y = 2000;
yellowLight.position.z = 0;
yellowLight.target = myTarget;
yellowLight.castShadow = true;
yellowLight.shadowDarkness = 0.0;
yellowLight.shadowMapWidth = 1500;
yellowLight.shadowMapHeight = 1000;
yellowLight.shadowCameraNear = 1500;
yellowLight.shadowCameraFar = 6000;
yellowLight.shadowCameraFov = 45;
yellowLight.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

var orb_mesh2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );

var redLight = new THREE.SpotLight( 0xff0000, 0.0 );
redLight.position.x = 2820;
redLight.position.y = 2000;
redLight.position.z = 0;
redLight.target = myTarget;
redLight.castShadow = true;
redLight.shadowDarkness = 0.0;
redLight.shadowMapWidth = 1500;
redLight.shadowMapHeight = 1000;
redLight.shadowCameraNear = 1500;
redLight.shadowCameraFar = 6000;
redLight.shadowCameraFov = 45;
redLight.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

var orb_mesh3 = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );

cam1 = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
con1 = new THREE.FirstPersonControls( cam1 );
con1.lookSpeed = 0.10;
con1.movementSpeed = 1000;

cam2 = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
cam2.position.set( 2000, 1500, 2000 );
cam2.lookAt( myTarget.position );
con2 = new THREE.OrbitControls( cam2 );
con2.minDistance = 50;
con2.maxDistance = 6000;
con2.minPolarAngle = Math.PI/8;
con2.maxPolarAngle = 5*Math.PI/8;
camera = cam2;
controls = con2;
$( 'div#instructions p' ).replaceWith("<p>left mouse: rotate<br>middle mouse: zoom<br>right mouse: pan</p>");

scene.add( myTarget );
scene.add( camera );
scene.add( whiteLight );
scene.add( yellowLight );
scene.add( redLight );

window.addEventListener( 'resize', onWindowResize, false );

clock = new THREE.Clock();

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.right = '0px';
container.appendChild( stats.domElement );

// BUTTONS

$( 'button#lighta' ).click( function() {
	if( !$( 'button#lighta' ).hasClass( 'active' ) ){
		$( 'button#lighta' ).addClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );
		lights_cw = true;
		lights_ccw = false;
	}
});

$( 'button#lightb' ).click( function() {
	if( !$( 'button#lightb' ).hasClass( 'active' ) ){
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).addClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );
		lights_cw = false;
		lights_ccw = false;
	}
});

$( 'button#lightc' ).click( function() {
	if( !$( 'button#lightc' ).hasClass( 'active' ) ){
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).addClass( 'active' );
		lights_cw = false;
		lights_ccw = true;
	}
});

$( 'button#cameraa' ).click( function() {
	if( !$( 'button#cameraa' ).hasClass( 'active' ) ){
		$( 'button#cameraa' ).addClass( 'active' );
		$( 'button#camerab' ).removeClass( 'active' );
		$( 'button#camerac' ).removeClass( 'active' );
		camera_cw = true;
		camera_ccw = false;
	}
});

$( 'button#camerab' ).click( function() {
	if( !$( 'button#camerab' ).hasClass( 'active' ) ){
		$( 'button#cameraa' ).removeClass( 'active' );
		$( 'button#camerab' ).addClass( 'active' );
		$( 'button#camerac' ).removeClass( 'active' );
		camera_cw = false;
		camera_ccw = false;
	}
});

$( 'button#camerac' ).click( function() {
	if( !$( 'button#camerac' ).hasClass( 'active' ) ){
		$( 'button#cameraa' ).removeClass( 'active' );
		$( 'button#camerab' ).removeClass( 'active' );
		$( 'button#camerac' ).addClass( 'active' );
		camera_cw = false;
		camera_ccw = true;
	}
});

$( 'a#view1' ).click( function() {
	camera.position.set( 0, 1000, 2000 );
	myTarget.position.set( 0, 400, 0 );
	camera.lookAt( myTarget.position );
	controls.target = myTarget.position;
	$( 'button#cameraa' ).removeClass( 'active' );
	$( 'button#camerab' ).addClass( 'active' );
	$( 'button#camerac' ).removeClass( 'active' );
	camera_cw = false;
	camera_ccw = false;
});

$( 'a#view2' ).click( function() {
	camera.position.set( 600, 800, 600 );
	myTarget.position.set( 600, 800, 0 );
	camera.lookAt( myTarget.position );
	controls.target = myTarget.position;
	$( 'button#cameraa' ).removeClass( 'active' );
	$( 'button#camerab' ).addClass( 'active' );
	$( 'button#camerac' ).removeClass( 'active' );
	camera_cw = false;
	camera_ccw = false;
});

$( 'a#view3' ).click( function() {
	camera.position.set( 2000, 1500, 2000 );
	myTarget.position.set( 0, 400, 0 );
	camera.lookAt( myTarget.position );
	controls.target = myTarget.position;
	$( 'button#cameraa' ).removeClass( 'active' );
	$( 'button#camerab' ).addClass( 'active' );
	$( 'button#camerac' ).removeClass( 'active' );
	camera_cw = false;
	camera_ccw = false;
});

$( 'input#layer1' ).change( function() {
	if( $( 'input#layer1' ).hasClass( 'active' ) ){
		$( 'input#layer1' ).removeClass( 'active' );
		scene.remove( mesh1 );
		mesh4.castShadow = true;
	} else {
		$( 'input#layer1' ).addClass( 'active' );
		scene.add( mesh1 );
		mesh4.castShadow = false;
	}
});

$( 'input#layer2' ).change( function() {
	if( $( 'input#layer2' ).hasClass( 'active' ) ){
		$( 'input#layer2' ).removeClass( 'active' );
		scene.remove( mesh2 );
		scene.remove( mesh3 );
	} else {
		$( 'input#layer2' ).addClass( 'active' );
		scene.add( mesh2 );
		scene.add( mesh3 );
	}
});

$( 'input#layer3' ).change( function() {
	if( $( 'input#layer3' ).hasClass( 'active' ) ){
		$( 'input#layer3' ).removeClass( 'active' );
		scene.remove( mesh4 );
		scene.remove( mesh5 );
	} else {
		$( 'input#layer3' ).addClass( 'active' );
		scene.add( mesh4 );
		scene.add( mesh5 );
	}
});

$( 'button#controla' ).click( function() {
	if( !$( 'button#controla' ).hasClass( 'active' ) ){
		toggleControls();
		$( 'button#controla' ).addClass( 'active' );
		$( 'button#controlb' ).removeClass( 'active' );
	}
});

$( 'button#controlb' ).click( function() {
	if( !$( 'button#controlb' ).hasClass( 'active' ) ){
		toggleControls();
		$( 'button#controla' ).removeClass( 'active' );
		$( 'button#controlb' ).addClass( 'active' );
	}
});

$( 'input#light1' ).change( function() {
	if( $( 'input#light1' ).hasClass( 'active' ) ){
		$( 'input#light1' ).removeClass( 'active' );
		whiteLight.intensity = 0.0;
		whiteLight.shadowDarkness = 0.0;
		whiteLight.remove(orb_mesh1);
	} else {
		$( 'input#light1' ).addClass( 'active' );
		whiteLight.intensity = 1.0;
		whiteLight.shadowDarkness = 0.5;
		whiteLight.add(orb_mesh1);
	}
});

$( 'input#light2' ).change( function() {
	if( $( 'input#light2' ).hasClass( 'active' ) ){
		$( 'input#light2' ).removeClass( 'active' );
		yellowLight.intensity = 0.0;
		yellowLight.shadowDarkness = 0.0;
		yellowLight.remove(orb_mesh2);
	} else {
		$( 'input#light2' ).addClass( 'active' );
		yellowLight.intensity = 1.0;
		yellowLight.shadowDarkness = 0.5;
		yellowLight.add(orb_mesh2);
	}
});

$( 'input#light3' ).change( function() {
	if( $( 'input#light3' ).hasClass( 'active' ) ){
		$( 'input#light3' ).removeClass( 'active' );
		redLight.intensity = 0.0;
		redLight.shadowDarkness = 0.0;
		redLight.remove(orb_mesh3);
	} else {
		$( 'input#light3' ).addClass( 'active' );
		redLight.intensity = 1.0;
		redLight.shadowDarkness = 0.5;
		redLight.add(orb_mesh3);
	}
});

$( 'input#vr-mode' ).change( function() {
	if( $( 'input#vr-mode' ).hasClass( 'active' ) ){
		$( 'input#vr-mode' ).removeClass( 'active' );
	} else {
		$( 'input#vr-mode' ).addClass( 'active' );
	}
});

$( 'div#LightsMenu' ).click( function() {
	$( 'div#cameramenu' ).collapse('hide');
	$( 'div#layersmenu' ).collapse('hide');
	$( 'div#controlsmenu' ).collapse('hide');
});

$( 'div#CameraMenu' ).click( function() {
	$( 'div#lightsmenu' ).collapse('hide');
	$( 'div#layersmenu' ).collapse('hide');
	$( 'div#controlsmenu' ).collapse('hide');
});

$( 'div#LayersMenu' ).click( function() {
	$( 'div#cameramenu' ).collapse('hide');
	$( 'div#lightsmenu' ).collapse('hide');
	$( 'div#controlsmenu' ).collapse('hide');
});

$( 'div#ControlsMenu' ).click( function() {
	$( 'div#cameramenu' ).collapse('hide');
	$( 'div#layersmenu' ).collapse('hide');
	$( 'div#lightsmenu' ).collapse('hide');
});
