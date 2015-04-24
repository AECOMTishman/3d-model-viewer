var viewport, scene, camera, renderer, loader, controls;

var WIDTH = 498, /*window.innerWidth*/
    HEIGHT = 498; /*window.innerHeight*/

var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;

viewport = document.getElementById( '3d' );

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.y = 1000;
scene.add(camera);

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFShadowMap;
renderer.shadowMapAutoUpdate = true;

controls = new THREE.OrbitControls(camera);

renderer.setSize(WIDTH, HEIGHT);

loader = new THREE.JSONLoader();

loader.load('sample.js', function (geometry, materials) {
  var mesh, material;

  material = new THREE.MeshFaceMaterial(materials);
  mesh = new THREE.Mesh(geometry, material);

  mesh.scale.set(1, 1, 1);
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  scene.add(mesh);
});

animate();

function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}