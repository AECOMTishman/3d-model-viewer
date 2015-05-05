if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, scene, renderer, camera, controls, light, clock, loader;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

container = document.getElementById( '3d' );

clock = new THREE.Clock();

WIDTH = 0.9 * window.innerWidth;
HEIGHT = 0.9 * window.innerHeight;

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

light1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
light1.color.setHSL( 0.6, 1, 0.6 );
light1.groundColor.setHSL( 0.095, 1, 0.75 );
light1.position.set( 0, 500, 0 );
scene.add( light1 );

light2 = new THREE.AmbientLight( 0x404040 );
scene.add( light2 );

light3 = new THREE.AmbientLight( 0xffffff );

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

$( 'button#light1a' ).addClass('active')

$( 'button#light1a' ).click( function() {
	$( 'button#light1a' ).addClass('active')
	$( 'button#light1b' ).removeClass('active')
	$( 'button#light1c' ).removeClass('active')
	light1.position.set(0, 500, 0);
	light1.color.setHSL( 0.6, 1, 0.6 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
});

$( 'button#light1b' ).click( function() {
	$( 'button#light1a' ).removeClass('active')
	$( 'button#light1b' ).addClass('active')
	$( 'button#light1c' ).removeClass('active')
	light1.position.set(0, 1000, 0);
	light1.color.setHSL( 0.8, 1, 0.8 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
});

$( 'button#light1c' ).click( function() {
	$( 'button#light1a' ).removeClass('active')
	$( 'button#light1b' ).removeClass('active')
	$( 'button#light1c' ).addClass('active')
	light1.position.set(0, 2000, 0);
	light1.color.setHSL( 1, 1, 1 );
	light1.groundColor.setHSL( 0.095, 1, 0.75 );
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
});

$( 'button#light3' ).click( function() {
	if( $( 'button#light3' ).hasClass('active') ){
		$( 'button#light3' ).removeClass('active')
		scene.remove( light3 );
	} else {
		$( 'button#light3' ).addClass('active')
		scene.add( light3 );
	}
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

$(window).on('resize', function(){
      var win = $(this); //this = window
      HEIGHT = 0.9 * win.height();
      WIDTH = 0.9 * win.width();
      renderer.setSize(WIDTH, HEIGHT); 
});