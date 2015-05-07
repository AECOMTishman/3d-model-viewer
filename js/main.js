// WebGL DETECTOR

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// GLOBAL VARIABLES

var scene, renderer, container, camera, controls, loader, clock, stats, mesh1, mesh2, mesh3, mesh4;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 10,
FAR = 15000;

var cw = true;
var ccw = false;
var fc = false;

camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
camera.position.set( 2000, 1500, 2000 );
camera.lookAt(new THREE.Vector3( 0, 400, 0 ));

var myTarget = new THREE.Object3D();
myTarget.position.set( 0, 400, 0 );

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.x = 2820;
spotLight.position.y = 2000;
spotLight.position.z = 0;
spotLight.target = myTarget;
spotLight.castShadow = true;
spotLight.shadowMapWidth = 1500;
spotLight.shadowMapHeight = 1000;
spotLight.shadowCameraNear = 10;
spotLight.shadowCameraFar = 20000;
spotLight.shadowCameraFov = 45;
spotLight.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

// BUTTON INITIALIZATIONS

$( 'input#layer1' ).addClass( 'active' );
$( 'input#layer2' ).addClass( 'active' );
$( 'input#layer3' ).addClass( 'active' );
$( 'button#lighta' ).addClass( 'active' );

// MAIN FUNCTION

init();

function init() {
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( 0xd6e7fb, 1.0 );
	renderer.shadowMapEnabled = true;

	container = document.getElementById( '3d' );
	container.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );
	controls.target = new THREE.Vector3( 0, 400, 0 );
	controls.minDistance = 500;
	controls.maxDistance = 5000;
	controls.minPolarAngle = 0.3 * Math.PI/2;
	controls.maxPolarAngle = 1.0 * Math.PI/2;

	scene.add(camera);

	light = new THREE.HemisphereLight( 0xffffff, 0xd6e7fb, 1.0 );
	scene.add( light );

	scene.add( myTarget );
 	scene.add( spotLight );

	group = new THREE.Object3D();

	loader = new THREE.JSONLoader();

	loader.load('sample-concrete.js', function ( geometry, materials ) {  
		mesh1 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial( materials )
		);

		mesh1.rotation.x = -Math.PI / 2;
		mesh1.castShadow = true;
		mesh1.receiveShadow = true;
		group.add( mesh1 );
		scene.add( mesh1 );
	});

	loader.load('sample-curtain-wall.js', function ( geometry, materials ) {  
		mesh2 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial( materials )
		);

		mesh2.rotation.x = -Math.PI / 2;
		mesh2.castShadow = false;
		mesh2.receiveShadow = true;
		group.add( mesh2 );
		scene.add( mesh2 );
	});

	loader.load('sample-steel-beams.js', function ( geometry, materials ) {  
		mesh3 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial( materials )
		);

		mesh3.rotation.x = -Math.PI / 2;
		mesh3.castShadow = false;
		mesh3.receiveShadow = true;
		group.add( mesh3 );
		scene.add( mesh3 );
	});

	loader.load('sample-steel-columns.js', function ( geometry, materials ) {  
		mesh4 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial( materials )
		);

		mesh4.rotation.x = -Math.PI / 2;
		mesh4.castShadow = true;
		mesh4.receiveShadow = true;
		group.add( mesh4 );
		scene.add( mesh4 );
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
 	// time = clock.getElapsedTime(); // Just keeping this for reference.
 	// delta = clock.getDelta(); // Not using this line of code at the moment.
 	if ( cw ){
		time = clock.getElapsedTime();
		spotLight.position.x = 2820 * Math.cos( time/10 );
		spotLight.position.y = 2000;
		spotLight.position.z = 2820 * Math.sin( time/10 );
		myTarget.position.set( 0, 400, 0 );
		// I want to make this additive, not based on absolute time.
		// spotLight.position.x += 2820 * Math.cos( 1Math.acos(spotLight.position.x/2820) );
 	}
 	if ( ccw ){
		time = clock.getElapsedTime();
		spotLight.position.x = 2820 * Math.sin( time/10 );
		spotLight.position.y = 2000;
		spotLight.position.z = 2820 * Math.cos( time/10 );
		myTarget.position.set( 0, 400, 0 );
 	}
 	if ( fc ){
 		spotLight.position.set( camera.position.x, camera.position.y, camera.position.z );
 		spotLight.applyQuaternion( camera.quaternion );
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

$( 'input#layer1' ).change( function() {
	if( $( 'input#layer1' ).hasClass( 'active' ) ){
		$( 'input#layer1' ).removeClass( 'active' );
		scene.remove( mesh1 );
	} else {
		$( 'input#layer1' ).addClass( 'active' );
		scene.add( mesh1 );
	}
});

$( 'input#layer2' ).change( function() {
	if( $( 'input#layer2' ).hasClass( 'active' ) ){
		$( 'input#layer2' ).removeClass( 'active' );
		scene.remove( mesh2 );
	} else {
		$( 'input#layer2' ).addClass( 'active' );
		scene.add( mesh2 );
	}
});

$( 'input#layer3' ).change( function() {
	if( $( 'input#layer3' ).hasClass( 'active' ) ){
		$( 'input#layer3' ).removeClass( 'active' );
		scene.remove( mesh3 );
		scene.remove( mesh4 );
	} else {
		$( 'input#layer3' ).addClass( 'active' );
		scene.add( mesh3 );
		scene.add( mesh4 );
	}
});

$( 'a#view1' ).click( function() {
	camera.position.set( 0, 1000, 2000 );
	camera.lookAt(new THREE.Vector3( 0, 400, 0 ));
	controls.target = new THREE.Vector3( 0, 400, 0 );
});

$( 'a#view2' ).click( function() {
	camera.position.set( 600, 800, 600 );
	camera.lookAt(new THREE.Vector3( 600, 800, 0 ));
	controls.target = new THREE.Vector3( 600, 800, 0 );
});

$( 'a#view3' ).click( function() {
	camera.position.set( 2000, 1500, 2000 );
	camera.lookAt(new THREE.Vector3( 0, 400, 0 ));
	controls.target = new THREE.Vector3( 0, 400, 0 );
});

$( 'button#followcamera' ).click( function() {
	if( !$( 'button#followcamera' ).hasClass( 'active' ) ){
		$( 'button#followcamera' ).addClass( 'active' );
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );

		cw = false;
		ccw = false;
		fc = true;
	}
});

$( 'button#lighta' ).click( function() {
	if( !$( 'button#lighta' ).hasClass( 'active' ) ){
		$( 'button#followcamera' ).removeClass( 'active' );
		$( 'button#lighta' ).addClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );

		cw = true;
		ccw = false;
		fc = false;
	}
});

$( 'button#lightb' ).click( function() {
	if( !$( 'button#lightb' ).hasClass( 'active' ) ){
		$( 'button#followcamera' ).removeClass( 'active' );
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).addClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );

		cw = false;
		ccw = false;
		fc = false;
	}
});

$( 'button#lightc' ).click( function() {
	if( !$( 'button#lightc' ).hasClass( 'active' ) ){
		$( 'button#followcamera' ).removeClass( 'active' );
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).addClass( 'active' );

		cw = false;
		ccw = true;
		fc = false;
	}
});