if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, scene, renderer, camera, controls, mesh1, mesh2, mesh3, light1, light2, light3, loader;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

WIDTH = 0.99 * window.innerWidth;
HEIGHT = 0.99 * window.innerHeight;

VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 1,
FAR = 10000;

init();
render();

function animate() {
	controls.update();
}

function init() {
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor( 0x000000, 0 );

	container = document.getElementById( '3d' );
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );
	controls.target = new THREE.Vector3(0, 500, 0);
	controls.minDistance = 200;
	controls.maxDistance = 8000;
	controls.maxPolarAngle = Math.PI/2;

	camera.position.set(0, 2000, 2000);
	camera.lookAt(new THREE.Vector3(0, 500, 0));

	scene.add(camera);

	light1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	light1.color.setHSL( 0.6, 1, 0.6 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	light1.position.set( 0, 500, 0 );
	scene.add( light1 );

	light2 = new THREE.AmbientLight( 0x404040 );
	scene.add( light2 );

	light3 = new THREE.AmbientLight( 0xffffff );

	group = new THREE.Object3D();

	loader = new THREE.JSONLoader();

	loader.load('sample-concrete.js', function (geometry, materials) {  
		mesh1 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial(materials)
		);

		mesh1.rotation.x = -Math.PI / 2;
		group.add( mesh1 );
		scene.add( mesh1 );
	});

	loader.load('sample-curtain-wall.js', function (geometry, materials) {  
		mesh2 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial(materials)
		);

		mesh2.rotation.x = -Math.PI / 2;
		group.add( mesh2 )
		scene.add( mesh2 );
	});

	loader.load('sample-steel.js', function (geometry, materials) {  
		mesh3 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial(materials)
		);

		mesh3.rotation.x = -Math.PI / 2;
		group.add( mesh3 )
		scene.add( mesh3 );

		render();
	});

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function render() {
	renderer.render(scene, camera);
}

function modelLoadedCallback(geometry) {
    mesh1 = new THREE.Mesh( geometry, material );
    group.add( mesh1ti );
    mesh2 = new THREE.Mesh( geometry, material );
    group.add( mesh2 );
    mesh3 = new THREE.Mesh( geometry, material );
    group.add( mesh3 );
    scene.add( group );
}

function onWindowResize() {
	var win = $(this); //this = window
	WIDTH = 0.99 * window.innerWidth;
	HEIGHT = 0.99 * window.innerHeight;
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize(WIDTH, HEIGHT);
	render();
}

$( 'input#layer1' ).addClass('active');
$( 'input#layer2' ).addClass('active');
$( 'input#layer3' ).addClass('active');

$( 'input#layer1' ).change( function() {
	if( $( 'input#layer1' ).hasClass('active') ){
		$( 'input#layer1' ).removeClass('active');
		scene.remove( mesh1 );
	} else {
		$( 'input#layer1' ).addClass('active');
		scene.add( mesh1 );
	}
	render();
});

$( 'input#layer2' ).change( function() {
	if( $( 'input#layer2' ).hasClass('active') ){
		$( 'input#layer2' ).removeClass('active');
		scene.remove( mesh2 );
	} else {
		$( 'input#layer2' ).addClass('active');
		scene.add( mesh2 );
	}
	render();
});

$( 'input#layer3' ).change( function() {
	if( $( 'input#layer3' ).hasClass('active') ){
		$( 'input#layer3' ).removeClass('active');
		scene.remove( mesh3 );
	} else {
		$( 'input#layer3' ).addClass('active');
		scene.add( mesh3 );
	}
	render();
});

$( 'a#view1' ).click( function() {
	camera.position.set(0, 1000, 2000);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
	controls.target = new THREE.Vector3(0, 500, 0);
	render();
});

$( 'a#view2' ).click( function() {
	camera.position.set(200, 500, 200);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
	controls.target = new THREE.Vector3(0, 500, 0);
	render();
});

$( 'a#view3' ).click( function() {
	camera.position.set(3000, 3000, 3000);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
	controls.target = new THREE.Vector3(0, 500, 0);
	render();
});

$( 'a#light1a' ).addClass('active')

$( 'a#light1a' ).click( function() {
	$( 'a#light1a' ).addClass('active');
	$( 'a#light1b' ).removeClass('active');
	$( 'a#light1c' ).removeClass('active');
	light1.position.set(0, 500, 0);
	light1.color.setHSL( 0.6, 1, 0.6 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	render();
});

$( 'a#light1b' ).click( function() {
	$( 'a#light1a' ).removeClass('active');
	$( 'a#light1b' ).addClass('active');
	$( 'a#light1c' ).removeClass('active');
	light1.position.set(0, 1000, 0);
	light1.color.setHSL( 0.8, 1, 0.8 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	render();
});

$( 'a#light1c' ).click( function() {
	$( 'a#light1a' ).removeClass('active');
	$( 'a#light1b' ).removeClass('active');
	$( 'a#light1c' ).addClass('active');
	light1.position.set(0, 2000, 0);
	light1.color.setHSL( 1, 1, 1 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	render();
});

$( 'a#light2' ).addClass('active')

$( 'a#light2' ).click( function() {
	if( $( 'a#light2' ).hasClass('active') ){
		$( 'a#light2' ).removeClass('active');
		scene.remove( light2 );
	} else {
		$( 'a#light2' ).addClass('active');
		scene.add( light2 );
	}
	render();
});

$( 'a#light3' ).click( function() {
	if( $( 'a#light3' ).hasClass('active') ){
		$( 'a#light3' ).removeClass('active');
		scene.remove( light3 );
	} else {
		$( 'a#light3' ).addClass('active');
		scene.add( light3 );
	}
	render();
});