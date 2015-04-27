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

camera.position.set(0, -1200, 3000);

scene.add(camera);

loader = new THREE.JSONLoader();
var mesh;
loader.load('sample3.js', function (geometry, materials) {  
  mesh = new THREE.Mesh(
    geometry
  );

  mesh.rotation.x = -Math.PI / 2;

  scene.add(mesh);
  render(); 
});

function render() {
 mesh.rotation.z += .01;

 renderer.render(scene, camera);
 requestAnimationFrame(render);
}