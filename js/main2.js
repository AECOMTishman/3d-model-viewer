if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, scene, renderer, camera, light, clock, loader;
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

var button1_clicked = true;
var button2_clicked = false;

$( 'button#button1' ).click( function() {
	button1_clicked = true;
	button2_clicked = false;
});

$( 'button#button2' ).click( function() {
	button1_clicked = false;
	button2_clicked = true;
});

$( 'button#view1' ).click( function() {
	camera.position.set(0, 500, 3000);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
});

$( 'button#view2' ).click( function() {
	camera.position.set(0, 500, 100);
	camera.lookAt(new THREE.Vector3(0, 500, 0));
});

$( 'button#view3' ).click( function() {
	camera.position.set(0, 2000, 2000);
	camera.lookAt(new THREE.Vector3(0, 250, 0));
});

function render() {
	if (button1_clicked){
		mesh.rotation.z += -.01;
	}
	if (button2_clicked){
		mesh.rotation.z += .01;
	}

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}