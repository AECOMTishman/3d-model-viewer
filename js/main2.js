var container, scene, renderer, camera, light, clock, loader;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

container = document.querySelector('#3d');

clock = new THREE.Clock();

WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

VIEW_ANGLE = 45,
ASPECT = WIDTH / HEIGHT,
NEAR = 1,
FAR = 10000;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFShadowMap;
renderer.shadowMapAutoUpdate = true;

container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

camera.position.set(0, 100, 300);
camera.rotation.x = -Math.PI / 12;

scene.add(camera);

light = new THREE.DirectionalLight(0xffffff);

light.position.set(0, 100, 60);
light.castShadow = true;
light.shadowCameraLeft = -60;
light.shadowCameraTop = -60;
light.shadowCameraRight = 60;
light.shadowCameraBottom = 60;
light.shadowCameraNear = 1;
light.shadowCameraFar = 1000;
light.shadowBias = -.0001
light.shadowMapWidth = light.shadowMapHeight = 1024;
light.shadowDarkness = .7;

scene.add(light);

loader = new THREE.JSONLoader();
var mesh;
loader.load('car.js', function (geometry, materials) {
  var material = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('/js/threejs/models/textures/gtare.jpg'),   
    colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
  });
  
  mesh = new THREE.Mesh(
    geometry,
    material
  );

  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.rotation.y = -Math.PI/5;

  scene.add(mesh);
  render(); 
});

function render() {
 var time = clock.getElapsedTime();
 mesh.rotation.y += .01;

 renderer.render(scene, camera);
 requestAnimationFrame(render);
}