if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, scene, renderer, camera, controls, light, clock, loader;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

container = document.getElementById( '3d' );

clock = new THREE.Clock();

WIDTH = 498,
HEIGHT = 498;

VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 1,
FAR = 10000;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor( 0x000000, 0 );

container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

camera.position.set(0, 500, 3000);
camera.lookAt(new THREE.Vector3(0, 500, 0));

scene.add(camera);

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

loader = new THREE.JSONLoader();
var mesh;
loader.load('sample.js', function (geometry, materials) {  
	mesh = new THREE.Mesh(
		geometry, new THREE.MeshFaceMaterial(materials)
	);

	mesh.rotation.x = -Math.PI / 2;

	scene.add(mesh);
	render(); 
});

var cw_clicked = true;
var ccw_clicked = false;
$( 'button#cw' ).addClass('active')

$( 'button#cw' ).click( function() {
	$( 'button#cw' ).addClass('active')
	$( 'button#pause' ).removeClass('active')
	$( 'button#ccw' ).removeClass('active')
	cw_clicked = true;
	ccw_clicked = false;
});

$( 'button#pause' ).click( function() {
	$( 'button#cw' ).removeClass('active')
	$( 'button#pause' ).addClass('active')
	$( 'button#ccw' ).removeClass('active')
	cw_clicked = false;
	ccw_clicked = false;
});

$( 'button#ccw' ).click( function() {
	$( 'button#cw' ).removeClass('active')
	$( 'button#pause' ).removeClass('active')
	$( 'button#ccw' ).addClass('active')
	cw_clicked = false;
	ccw_clicked = true;
});

$( 'button#view1' ).addClass('active')

$( 'button#view1' ).click( function() {
	$( 'button#view1' ).addClass('active')
	$( 'button#view2' ).removeClass('active')
	$( 'button#view3' ).removeClass('active')
	camera.position.set(0, 500, 3000);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
});

$( 'button#view2' ).click( function() {
	$( 'button#view1' ).removeClass('active')
	$( 'button#view2' ).addClass('active')
	$( 'button#view3' ).removeClass('active')
	camera.position.set(0, 500, 100);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
});

$( 'button#view3' ).click( function() {
	$( 'button#view1' ).removeClass('active')
	$( 'button#view2' ).removeClass('active')
	$( 'button#view3' ).addClass('active')
	camera.position.set(0, 2000, 2000);
	camera.lookAt(new THREE.Vector3(0, 250, 0));
});

function render() {
	if (cw_clicked){
		mesh.rotation.z += -.01;
	}
	if (ccw_clicked){
		mesh.rotation.z += .01;
	}

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}