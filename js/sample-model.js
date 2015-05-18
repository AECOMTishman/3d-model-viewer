// DETECT WebGL

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// GLOBAL VARIABLES

var renderer, container, scene, loader, mesh1, mesh2, mesh3, mesh4, mesh5, terrain, myTarget, camera, cam1, cam2, con1, con2, spotLight1, spotLight2, spotLight3, clock, stats;
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
$( 'input#light2' ).addClass( 'active' );
$( 'input#light3' ).addClass( 'active' );

$( 'button#lighta' ).addClass( 'active' );

$( 'button#camerab' ).addClass( 'active' );

$( 'input#layer1' ).addClass( 'active' );
$( 'input#layer2' ).addClass( 'active' );
$( 'input#layer3' ).addClass( 'active' );

$( 'button#controlb' ).addClass( 'active' );

//$( 'input#vr-mode' ).addClass( 'active' );
$( 'input#vr-mode' ).bootstrapToggle('off');

// FUNCTIONS

function render() {
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
	spotLight1.position.x = 2820 * Math.cos( lightRadIncrement );
	spotLight1.position.y = 2000;
	spotLight1.position.z = 2820 * Math.sin( lightRadIncrement );

	spotLight2.position.x = 2820 * Math.cos( lightRadIncrement + 1000*120*2*Math.PI/360 );
	spotLight2.position.y = 2000;
	spotLight2.position.z = 2820 * Math.sin( lightRadIncrement + 1000*120*2*Math.PI/360 );

	spotLight3.position.x = 2820 * Math.cos( lightRadIncrement + 1000*240*2*Math.PI/360 );
	spotLight3.position.y = 2000;
	spotLight3.position.z = 2820 * Math.sin( lightRadIncrement + 1000*240*2*Math.PI/360 );
}

function animate() {
	requestAnimationFrame( animate );
	controls.update( clock.getDelta() );
	update();
	render();
	stats.update();
}

function setupControls() {
    cam1 = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
	con1 = new THREE.FirstPersonControls( cam1 );
	con1.dragToLook = true;
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
}

function setControlsFirstPerson() {
	var prevCamera = camera;
	cam1.position.copy( prevCamera.position );
    camera = cam1;
    con1.lon = 180+360*prevCamera.rotation.y/(2*Math.PI);
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

var spotLight1 = new THREE.SpotLight( 0xffffff, 1.0 );
spotLight1.position.x = 2820;
spotLight1.position.y = 2000;
spotLight1.position.z = 0;
spotLight1.target = myTarget;
spotLight1.castShadow = true;
spotLight1.shadowMapWidth = 1500;
spotLight1.shadowMapHeight = 1000;
spotLight1.shadowCameraNear = 1500;
spotLight1.shadowCameraFar = 6000;
spotLight1.shadowCameraFov = 45;
spotLight1.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

var orb_mesh1 = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
spotLight1.add( orb_mesh1 );

var spotLight2 = new THREE.SpotLight( 0xffffff, 1.0 );
spotLight2.position.x = 2820;
spotLight2.position.y = 2000;
spotLight2.position.z = 0;
spotLight2.target = myTarget;
spotLight2.castShadow = true;
spotLight2.shadowMapWidth = 1500;
spotLight2.shadowMapHeight = 1000;
spotLight2.shadowCameraNear = 1500;
spotLight2.shadowCameraFar = 6000;
spotLight2.shadowCameraFov = 45;
spotLight2.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

var orb_mesh2 = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
spotLight2.add( orb_mesh2 );

var spotLight3 = new THREE.SpotLight( 0xffffff, 1.0 );
spotLight3.position.x = 2820;
spotLight3.position.y = 2000;
spotLight3.position.z = 0;
spotLight3.target = myTarget;
spotLight3.castShadow = true;
spotLight3.shadowMapWidth = 1500;
spotLight3.shadowMapHeight = 1000;
spotLight3.shadowCameraNear = 1500;
spotLight3.shadowCameraFar = 6000;
spotLight3.shadowCameraFov = 45;
spotLight3.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

var orb_mesh3 = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
spotLight3.add( orb_mesh3 );

setupControls();
camera = cam2;
controls = con2;

scene.add( myTarget );
scene.add( camera );
scene.add( spotLight1 );
scene.add( spotLight2 );
scene.add( spotLight3 );

window.addEventListener( 'resize', onWindowResize, false );

clock = new THREE.Clock();

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.right = '0px';
container.appendChild( stats.domElement );

animate();

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
		$( 'button#controla' ).addClass( 'active' );
		$( 'button#controlb' ).removeClass( 'active' );
		setControlsFirstPerson();
	}
});

$( 'button#controlb' ).click( function() {
	if( !$( 'button#controlb' ).hasClass( 'active' ) ){
		$( 'button#controla' ).removeClass( 'active' );
		$( 'button#controlb' ).addClass( 'active' );

		setControlsOrbit();
	}
});

$( 'input#light1' ).change( function() {
	if( $( 'input#light1' ).hasClass( 'active' ) ){
		$( 'input#light1' ).removeClass( 'active' );
		spotLight1.intensity = 0.1;
	} else {
		$( 'input#light1' ).addClass( 'active' );
		spotLight1.intensity = 1.0;
	}
});

$( 'input#light2' ).change( function() {
	if( $( 'input#light2' ).hasClass( 'active' ) ){
		$( 'input#light2' ).removeClass( 'active' );
		spotLight2.intensity = 0.1;
	} else {
		$( 'input#light2' ).addClass( 'active' );
		spotLight2.intensity = 1.0;
	}
});

$( 'input#light3' ).change( function() {
	if( $( 'input#light3' ).hasClass( 'active' ) ){
		$( 'input#light3' ).removeClass( 'active' );
		spotLight3.intensity = 0.1;
	} else {
		$( 'input#light3' ).addClass( 'active' );
		spotLight3.intensity = 1.0;
	}
});

$( 'input#vr-mode' ).change( function() {
	if( $( 'input#vr-mode' ).hasClass( 'active' ) ){
		$( 'input#vr-mode' ).removeClass( 'active' );
	} else {
		$( 'input#vr-mode' ).addClass( 'active' );
	}
});