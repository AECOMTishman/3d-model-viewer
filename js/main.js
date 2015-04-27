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

//camera.position.set(0, 500, 3000);
camera.position.set(10, 10, 10);

scene.add(camera);

loader = new THREE.JSONLoader();
var mesh;
loader.load('sample2.js', function (geometry) {  

  var materials = [];

  for (var i=0; i<6; i++) {
    var img = new Image();
    img.src = i + '.png';
    var tex = new THREE.Texture(img);
    img.tex = tex;

    img.onload = function() {
        this.tex.needsUpdate = true;
    };

    var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex});
    materials.push(mat);
  }

  var cubeGeo = new THREE.CubeGeometry(400, 400, 400, 1, 1, 1, materials);
  var cube = new THREE.Mesh(cubeGeo, new THREE.MeshFaceMaterial());

  mesh = new THREE.Mesh(
    geometry, material
  );

  mesh.rotation.x = -Math.PI / 2;

  scene.add(cube);
  render(); 
});

function render() {
 mesh.rotation.z += .01;
 cube.rotation.z += .01;

 renderer.render(scene, camera);
 requestAnimationFrame(render);
}