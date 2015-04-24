var container;

var camera, scene, renderer;

var WIDTH = 600;
var HEIGHT = 700;

var mouseX = WIDTH / 2, mouseY = HEIGHT / 2;

var offset = $( "#3d ").offset();

init();
animate();

function init() {

  container = document.getElementById( '3d' );

  camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 2000 );
  camera.position.z = 1500;

  // scene

  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight( 0x101030 );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 0, 0, 1 );
  scene.add( directionalLight );

  // texture

  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {

    console.log( item, loaded, total );

  };

  var texture = new THREE.Texture();

  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) {
  };


  var loader = new THREE.ImageLoader( manager );
  loader.load( 'UV_Grid_Sm.jpg', function ( image ) {

    texture.image = image;
    texture.needsUpdate = true;

  } );

  // model

  var loader = new THREE.OBJLoader( manager );
  loader.load( 'sample.obj', function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        child.material.map = texture;

      }

    } );

    scene.add( object );

  }, onProgress, onError );

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

  camera.position.x = ( mouseX / WIDTH ) * 500 - 250;
  camera.position.y = - ( ( mouseY / HEIGHT ) * 500 - 250 );

  console.log("camera x: " + camera.position.x)
  console.log("camera y: " + camera.position.y)
  console.log("camera z: " + camera.position.z)

  camera.lookAt( scene.position );

  console.log("scene x: " + scene.position.x)
  console.log("scene y: " + scene.position.y)
  console.log("scene z: " + scene.position.z)

  renderer.render( scene, camera );

}