if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, scene, renderer, camera, controls, mesh, light, loader;
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
	requestAnimationFrame(animate);
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

	camera.position.set(0, 2000, 2000);
	camera.lookAt(new THREE.Vector3(0, 1000, 0));

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

	loader.load('sample.js', function (geometry, materials) {  
		mesh = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial(materials)
		);

		mesh.rotation.x = -Math.PI / 2;
		group.add( mesh )
		scene.add(mesh);

		render();
	});

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function render() {
	renderer.render(scene, camera);
}

function modelLoadedCallback(geometry) {
    mesh = new THREE.Mesh( geometry, material );
    group.add( mesh );
    scene.add( group );
}

function onWindowResize() {
	var win = $(this); //this = window
	HEIGHT = 0.99 * win.height();
	WIDTH = 0.99 * win.width();
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize(WIDTH, HEIGHT);
	render();
}

$( 'button#view1' ).click( function() {
	camera.position.set(0, 2000, 2000);
	camera.lookAt(new THREE.Vector3(0, 1000, 0));
	render();
});

$( 'button#view2' ).click( function() {
	camera.position.set(0, 3000, 3000);
	camera.lookAt(new THREE.Vector3(0, 1000, 0));
	render();
});

$( 'button#view3' ).click( function() {
	camera.position.set(0, 4000, 4000);
	camera.lookAt(new THREE.Vector3(0, 1000, 0));
	render();
});

$( 'button#light1a' ).addClass('active')

$( 'button#light1a' ).click( function() {
	$( 'button#light1a' ).addClass('active')
	$( 'button#light1b' ).removeClass('active')
	$( 'button#light1c' ).removeClass('active')
	light1.position.set(0, 500, 0);
	light1.color.setHSL( 0.6, 1, 0.6 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	render();
});

$( 'button#light1b' ).click( function() {
	$( 'button#light1a' ).removeClass('active')
	$( 'button#light1b' ).addClass('active')
	$( 'button#light1c' ).removeClass('active')
	light1.position.set(0, 1000, 0);
	light1.color.setHSL( 0.8, 1, 0.8 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	render();
});

$( 'button#light1c' ).click( function() {
	$( 'button#light1a' ).removeClass('active')
	$( 'button#light1b' ).removeClass('active')
	$( 'button#light1c' ).addClass('active')
	light1.position.set(0, 2000, 0);
	light1.color.setHSL( 1, 1, 1 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	render();
});

$( 'button#light2' ).addClass('active')

$( 'button#light2' ).click( function() {
	if( $( 'button#light2' ).hasClass('active') ){
		$( 'button#light2' ).removeClass('active')
		scene.remove( light2 );
	} else {
		$( 'button#light2' ).addClass('active')
		scene.add( light2 );
	}
	render();
});

$( 'button#light3' ).click( function() {
	if( $( 'button#light3' ).hasClass('active') ){
		$( 'button#light3' ).removeClass('active')
		scene.remove( light3 );
	} else {
		$( 'button#light3' ).addClass('active')
		scene.add( light3 );
	}
	render();
});