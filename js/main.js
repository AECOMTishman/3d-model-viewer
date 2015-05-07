if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var scene, renderer, container, camera, controls, loader, clock, stats, mesh1, mesh2, mesh3, mesh4;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 10,
FAR = 12000;

var cw = false;
var ccw = false;

var myTarget = new THREE.Object3D();
myTarget.position.set( 0, 400, 0 );

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.x = 2820;
spotLight.position.y = 2000;
spotLight.position.z = 0;
spotLight.target = myTarget; // I don't think this line is working prperly. A target is a 3D Object, not a position vector.
spotLight.castShadow = true;
spotLight.shadowMapWidth = 1500;
spotLight.shadowMapHeight = 1000;
spotLight.shadowCameraNear = 1500;
spotLight.shadowCameraFar = 6000;
spotLight.shadowCameraFov = 45;
spotLight.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.

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

	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );
	controls.target = new THREE.Vector3( 0, 500, 0 );
	controls.minDistance = 500;
	controls.maxDistance = 7500;
	controls.minPolarAngle = 0.3 * Math.PI/2;
	controls.maxPolarAngle = 1.0 * Math.PI/2;

	camera.position.set( 2000, 1500, 2000 );
	camera.lookAt(new THREE.Vector3( 0, 500, 0 ));
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

function update() {
	time = clock.getElapsedTime();
 	// delta = clock.getDelta(); // Not using this line of code at the moment.
 	if ( cw ){
		spotLight.position.x = 2820 * Math.cos( time );
		spotLight.position.z = 2820 * Math.sin( time );
 	}
 	if ( ccw ){
		spotLight.position.x = 2820 * Math.sin( time );
		spotLight.position.z = 2820 * Math.cos( time );
 	}
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	update();
	render();
	stats.update();
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
	render();
}

// BUTTONS

$( 'input#layer1' ).addClass( 'active' );
$( 'input#layer2' ).addClass( 'active' );
$( 'input#layer3' ).addClass( 'active' );
$( 'button#lightb' ).addClass( 'active' );
$( 'button#controlb' ).addClass( 'active' );

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
	camera.lookAt(new THREE.Vector3( 0, 500, 0 ));
	controls.target = new THREE.Vector3( 0, 500, 0 );
});

$( 'a#view2' ).click( function() {
	camera.position.set( 600, 800, 600 );
	camera.lookAt(new THREE.Vector3( 600, 800, 0 ));
	controls.target = new THREE.Vector3( 600, 800, 0 );
});

$( 'a#view3' ).click( function() {
	camera.position.set( 2000, 1500, 2000 );
	camera.lookAt(new THREE.Vector3( 0, 500, 0 ));
	controls.target = new THREE.Vector3( 0, 500, 0 );
});

$( 'button#lighta' ).click( function() {
	if( !$( 'button#lighta' ).hasClass( 'active' ) ){
		$( 'button#lighta' ).addClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );

		cw = true;
		ccw = false;
	}
});

$( 'button#lightb' ).click( function() {
	if( !$( 'button#lightb' ).hasClass( 'active' ) ){
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).addClass( 'active' );
		$( 'button#lightc' ).removeClass( 'active' );

		cw = false;
		ccw = false;
	}
});

$( 'button#lightc' ).click( function() {
	if( !$( 'button#lightc' ).hasClass( 'active' ) ){
		$( 'button#lighta' ).removeClass( 'active' );
		$( 'button#lightb' ).removeClass( 'active' );
		$( 'button#lightc' ).addClass( 'active' );

		cw = false;
		ccw = true;
	}
});