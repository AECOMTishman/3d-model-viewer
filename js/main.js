if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, scene, renderer, camera, controls, mesh, light1, light2, light3, loader;

$( 'button#light1a' ).addClass('active');
$( 'button#view1' ).addClass('active');
$( 'button#light2' ).addClass('active')

var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

WIDTH = 0.99 * window.innerWidth;
HEIGHT = 0.99 * window.innerHeight;

VIEW_ANGLE = 45;
ASPECT = WIDTH / HEIGHT;
NEAR = 0;
FAR = 10000;

init();
render();

function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

function init() {
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(0, 700, 2500);
	camera.lookAt(new THREE.Vector3(0, 500, 0));

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();

	light1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	light1.color.setHSL( 0.6, 1, 0.6 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
	light1.position.set( 0, 500, 0 );
	scene.add( light1 );

	light2 = new THREE.AmbientLight( 0x404040 );
	scene.add( light2 );

	light3 = new THREE.AmbientLight( 0xffffff );

	loader = new THREE.JSONLoader();
	loader.load('sample.js', function (geometry, materials) {  
		mesh = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial(materials)
		);
		mesh.rotation.x = -Math.PI / 2;
		scene.add(mesh);
	});

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor( 0x000000, 0 );

	container = document.getElementById( '3d' );
	container.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function onWindowResize() {
	var win = $(this);
	HEIGHT = win.height();
	WIDTH = win.width();
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize(WIDTH, HEIGHT);
	render();
}

$( 'button#view1' ).click( function() {
	$( 'button#view1' ).addClass('active')
	$( 'button#view2' ).removeClass('active')
	$( 'button#view3' ).removeClass('active')
	camera.position.set(0, 700, 2500);
	render();
});

$( 'button#view2' ).click( function() {
	$( 'button#view1' ).removeClass('active')
	$( 'button#view2' ).addClass('active')
	$( 'button#view3' ).removeClass('active')
	camera.position.set(0, 500, 100);
	render();
});

$( 'button#view3' ).click( function() {
	$( 'button#view1' ).removeClass('active')
	$( 'button#view2' ).removeClass('active')
	$( 'button#view3' ).addClass('active')
	camera.position.set(0, 2000, 2000);
	render();
});

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