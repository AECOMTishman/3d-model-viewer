var container;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var WIDTH = 600;
var HEIGHT = 700;

var windowHalfX = WIDTH / 2;
var windowHalfY = HEIGHT / 2;


init();
animate();


function init() {

  container = document.getElementById( '3d' );

  camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 2000 );
  camera.position.z = 500;

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

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( WIDTH, HEIGHT );

}

function onDocumentMouseMove( event ) {

      $( "#3d" ).mousemove(function( event ) {
        mouseX = ( event.pageX - windowHalfX ) / 2;
        mouseY = ( event.pageY - windowHalfY ) / 2;
      });

}

//

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}