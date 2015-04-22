var CANVAS_WIDTH = 400,
  CANVAS_HEIGHT= 300;

var renderer = null,  //WebGL or 2D
  scene = null,   //scene object
  camera = null;    //camera object
var mesh = null,
  angle=0.0;

function initWebGL()
{
  setupRenderer();
  setupScene();

}

function setupRenderer()
{
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
  
  //where to add the canvas element
  document.getElementById('3d').appendChild( renderer.domElement );
}

function setupScene()
{
  scene = new THREE.Scene();        
  addDuckMesh();
}

function setupCamera()
{
  camera = new THREE.PerspectiveCamera(
      45,                   // Field of view
      CANVAS_WIDTH / CANVAS_HEIGHT,   // Aspect ratio
      .1,                   // Near clip plane
      10000                   // Far clip plane
  );
  camera.position.set( 10, 10, 10 );
  camera.lookAt( scene.position );
  scene.add( camera );
}

function addDuckMesh()
{
  var loader = new THREE.JSONLoader();
  loader.load("duck_three.js", function(geometry){
            mesh = new THREE.Mesh( 
      geometry, 
      geometry.materials[0]
    );

    mesh.position.y -= 5.0;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.05;
    mesh.rotation.x = .25*Math.PI;
    mesh.rotation.y = .25*Math.PI;
    scene.add(mesh);

    //make sure mesh is loaded before renderering
    loadRestOfScene()
  });       
}

function loadRestOfScene()
{
  addLight();
  setupCamera();
    
  (function animLoop(){
    mesh.rotation.z = angle;
    angle += 0.005;

    renderer.render(scene, camera); 
    requestAnimationFrame( animLoop );
  })(); 
}

function addLight()
{
  var light = new THREE.DirectionalLight( 0x777777 );
  light.position.set( 10, 30, 20 );
  scene.add(light);

  var light = new THREE.PointLight( 0xFFFFFF );
  light.position.set( 20, 30, 20 );
  scene.add(light);
}