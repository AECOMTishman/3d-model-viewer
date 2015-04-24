if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container,stats;

var camera, scene, loaded;
var renderer;

var object, pointLight;

var mouseX = 0, mouseY = 0;
var targetX = 0, targetY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function $( id ) {

  return document.getElementById( id );

}

function init() {

  container = document.getElementById( '3d' );

  camera = new THREE.Camera( 17, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 10;

  scene = new THREE.Scene();

  pointLight = new THREE.PointLight( 0xffffff, 0.99 );
  pointLight.distance = 3;
  pointLight.position.set( -1, -0.3, 1.5 );
  scene.addLight( pointLight );

  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.35 );
  dirLight.position.set( 1, 0.1, 1 );
  dirLight.position.normalize();
  scene.addLight( dirLight );

  var material = new THREE.MeshBasicMaterial( { color: 0xff4400, wireframe: false } );
  material.color = pointLight.color;
  var mesh = new THREE.Mesh( new THREE.SphereGeometry( 0.05, 32, 16 ), material );
  mesh.position = pointLight.position;
  //scene.addObject( mesh );

  renderer = new THREE.WebGLRenderer( { clearColor: 0x020202, clearAlpha: 1, antialias: true } );
  //renderer = new THREE.CrosseyedWebGLRenderer( { separation: 0.05 } );
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  renderer.domElement.style.position = "relative";
  container.appendChild( renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.right = '0px';
  stats.domElement.style.zIndex = 100;
  //container.appendChild( stats.domElement );

  var loader = new THREE.JSONLoader();

  loader.load( { model: "sample.js", callback: function( geometry ) { createScene( geometry,  0, 0, 0, 1 ) } } );

}


function onDocumentMouseMove(event) {

  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );

}

function createScene( geometry, x, y, z, s ) {

  //object = new THREE.Mesh( geometry, [ new THREE.MeshFaceMaterial(), new THREE.MeshPhongMaterial( { color: 0xff4400, wireframe: true, wireframeLinewidth: 2 } ) ] );
  object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
  object.position.set( x, y, z );
  object.scale.set( s, s, s );
  object.updateMatrix();
  scene.addObject( object );

}


//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

var h = 0.05;

function cap( x, a, b ) {

  return ( x < a ) ? a : ( ( x > b ) ? b : x );
}

function render() {

  var time = new Date().getTime() * 0.0015;

  targetX = mouseX * .001;
  targetY = mouseY * .001 + 0.5;

  if ( object ) {

    object.rotation.y += 0.05 * ( targetX - object.rotation.y );
    object.rotation.x += 0.05 * ( targetY - object.rotation.x );

  }

  if ( pointLight ) {

    h = cap( h + 0.0025 * ( 0.5 - Math.random() ), 0.025, 0.07 );

    pointLight.color.setHSV( h, 0.95, 0.9 );
    pointLight.intensity = cap( pointLight.intensity + 0.05 * ( 0.5 - Math.random() ), 0.6, 1 );

    //pointLight.position.x = 1.5 * Math.sin( time );
    //pointLight.position.z = 1.5 * Math.cos( time );
    //pointLight.position.y = 1.5 * Math.cos( time * 0.3 );

  }

  renderer.render( scene, camera );
}