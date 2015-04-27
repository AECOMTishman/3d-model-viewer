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

camera.position.set(0, 100, 2000);
//camera.rotation.x = -Math.PI / 12;

scene.add(camera);

loader = new THREE.JSONLoader();
var mesh;
loader.load('sample.js', function (geometry, materials) {  
  mesh = new THREE.Mesh(
    geometry,
    THREE.MeshFaceMaterial(materials)
  );

  mesh.rotation.x = Math.PI / 2;
  mesh.rotation.z = Math.PI / 2;

  scene.add(mesh);
  render(); 
});

function render() {
 var time = clock.getElapsedTime();

 mesh.rotation.y += .01;

 renderer.render(scene, camera);
 requestAnimationFrame(render);
}