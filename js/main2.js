var container;

var camera, scene, renderer;

var WIDTH = 498;
var HEIGHT = 498;

var mouseX = WIDTH / 2, mouseY = HEIGHT / 2;

var offset = $( "#3d ").offset();

init();
animate();

function init() {

  container = document.getElementById( '3d' );

  camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 1, 5000 );
  camera.position.z = 2000;

  // scene

  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight( 0x101030 );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 0, 0, 1 );
  scene.add( directionalLight );

  // model

  var loader = new THREE.JSONLoader(),
    animatedMesh;

  loader.load( 'sample.js', function ( geometry, materials ) {

    scene.add( object );

  });

  //

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WIDTH, HEIGHT );
  renderer.setClearColor( 0xffffff, 1);
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( WIDTH, HEIGHT );

  offset = $( "#3d ").offset();

}

function onDocumentMouseMove( event ) {

  $( "#3d" ).mousemove(function( event ) {
    mouseX = ( event.pageX - offset.left );
    mouseY = ( event.pageY - offset.top );
  });

}

//

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  camera.position.x = ( mouseX / WIDTH ) * 1000 - 500;
  camera.position.y = 2000 - ( ( mouseY / HEIGHT ) * 1000 - 500 );
  camera.position.z = 2000 + Math.abs( ( mouseX / WIDTH ) * 1000 - 500 );

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}