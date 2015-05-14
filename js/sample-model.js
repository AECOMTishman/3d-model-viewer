// DETECT WebGL
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// GLOBAL VARIABLES

var scene, renderer, container, camera, controls, loader, clock, stats, mesh1, mesh2, mesh3, mesh4, mesh5;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 10,
FAR = 8000;

var camera_cw = false;
var camera_ccw = false;

var lights_cw = true;
var lights_ccw = false;

camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
camera.position.set( 2000, 1500, 2000 );
camera.lookAt(new THREE.Vector3( 0, 400, 0 ));

var myTarget = new THREE.Object3D();
myTarget.position.set( 0, 400, 0 );

controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );
controls.target = myTarget.position;
controls.minDistance = 500;
controls.maxDistance = 5000;
controls.minPolarAngle = 0.3 * Math.PI/2;
controls.maxPolarAngle = 1.0 * Math.PI/2;

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.x = 2820;
spotLight.position.y = 2000;
spotLight.position.z = 0;
spotLight.target = myTarget;
spotLight.castShadow = true;
spotLight.shadowMapWidth = 1500;
spotLight.shadowMapHeight = 1000;
spotLight.shadowCameraNear = 1500;
spotLight.shadowCameraFar = 6000;
spotLight.shadowCameraFov = 45;
spotLight.shadowCameraVisible = true; // Turn this to "true" to see light boundaries.

var sphere = new THREE.SphereGeometry( 100, 16, 8 );
var orb_mesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
orb_mesh.scale.set( 1, 1, 1 );
spotLight.add( orb_mesh );

// BUTTON INITIALIZATIONS

$( 'button#lighta' ).addClass( 'active' );
$( 'button#camerab' ).addClass( 'active' );
$( 'button#controlb' ).addClass( 'active' );
$( 'input#layer1' ).addClass( 'active' );
$( 'input#layer2' ).addClass( 'active' );
$( 'input#layer3' ).addClass( 'active' );
$( 'input#shadows' ).addClass( 'active' );

// MAIN FUNCTION

init();

function init() {
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
	
	scene = new THREE.Scene();

	container = document.getElementById( '3d' );
	container.appendChild( renderer.domElement );

	scene.add(camera);

	light = new THREE.HemisphereLight( 0xffffff, 0xd6e7fb, 1.0 );
	scene.add( light );

	scene.add( myTarget );
 	scene.add( spotLight );

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
	new THREE.CubeGeometry(4000, 10, 4000), new THREE.MeshPhongMaterial({
	    color: 0x46882c
	}));
	terrain.receiveShadow = true;
	terrain.position.set(0, -10, 0);
	terrain.rotation.set(0, 0, 0);
	scene.add(terrain);

    window.addEventListener( 'resize', onWindowResize, false );

    clock = new THREE.Clock();

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.right = '0px';
    container.appendChild( stats.domElement );

    animate();
}

// HELPER FUNCTIONS

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	update();
	render();
	stats.update();
}

function update() {
 	time = clock.getElapsedTime();
 	// delta = clock.getDelta(); // Not using this line of code at the moment.
 	if ( camera_cw ){	
		camera.position.x = 2820 * Math.cos( time/10 );
		camera.position.y = 2000;
		camera.position.z = 2820 * Math.sin( time/10 );
 	}
 	if ( camera_ccw ){
		camera.position.x = 2820 * Math.sin( time/10 );
		camera.position.y = 2000;
		camera.position.z = 2820 * Math.cos( time/10 );
 	}
 	if ( lights_cw ){
		spotLight.position.x = 2820 * Math.cos( time/10 );
		spotLight.position.y = 2000;
		spotLight.position.z = 2820 * Math.sin( time/10 );

 	}
 	if ( lights_ccw ){
		spotLight.position.x = 2820 * Math.sin( time/10 );
		spotLight.position.y = 2000;
		spotLight.position.z = 2820 * Math.cos( time/10 );
 	}
}

function render() {
	renderer.render( scene, camera );
}

function onWindowResize() {
	var win = $( this );
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize( WIDTH, HEIGHT );
}

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

    /* var prevCamera = camera;

    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    camera.position.copy( prevCamera.position );
    camera.rotation.copy( prevCamera.rotation ); */

        var controls = new THREE.FirstPersonControls(camera);
        controls.lookSpeed = 0.4;
        controls.movementSpeed = 20;
        controls.noFly = true;
        controls.lookVertical = true;
        controls.constrainVertical = true;
        controls.verticalMin = 1.0;
        controls.verticalMax = 2.0;
        controls.lon = -150;
        controls.lat = 120;
	}
});

$( 'button#controlb' ).click( function() {
	if( !$( 'button#controlb' ).hasClass( 'active' ) ){
		$( 'button#controla' ).removeClass( 'active' );
		$( 'button#controlb' ).addClass( 'active' );

    /* var prevCamera = camera;

    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    camera.position.copy( prevCamera.position );
    camera.rotation.copy( prevCamera.rotation ); */

		controls = new THREE.OrbitControls( camera );
		controls.addEventListener( 'change', render );
		controls.target = myTarget.position;
		controls.minDistance = 500;
		controls.maxDistance = 5000;
		controls.minPolarAngle = 0.3 * Math.PI/2;
		controls.maxPolarAngle = 1.0 * Math.PI/2;
	}
});

$( 'input#shadows' ).change( function() {
	if( $( 'input#shadows' ).hasClass( 'active' ) ){
		$( 'input#shadows' ).removeClass( 'active' );

	} else {
		$( 'input#shadows' ).addClass( 'active' );

	}
});

$( 'input#vr-mode' ).change( function() {
	if( $( 'input#vr-mode' ).hasClass( 'active' ) ){
		$( 'input#vr-mode' ).removeClass( 'active' );

	} else {
		$( 'input#vr-mode' ).addClass( 'active' );

	}
});