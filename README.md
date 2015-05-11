# 3d model viewer
This read me file documents how to set up a 3d model viewer, similiar to the one found here:  [3d model viewer, sample model](http://tishmanconstruction.github.io/3d-model-viewer/).

## What is it?
This website is built with the WebGL API, which is based on OpenGL. Specifically, it uses the [three.js](http://threejs.org/) library of WebGL functions. three.js offers a variety of powerful features, as well as cross-browser and mobile functionality.

## Potential applications
The best part of this viewer is that all you need to do is send a link to your colleague and you are done. No training. No software downloads.

This model viewer has two main applications.

1. Sharing designs with ownership and stakeholders.
2. Collaborating on designs within the design team. Communicating specific issues in 3d.

## How can you use it?
You will need to make a 3d model or download one. The only file type requirement is that you must be able to convert it to a 3ds Max (.max) file. From there, you will add materials to the model and export it as a custom .json three.js 3d data file using a 3ds Max plugin. Then you are ready to load it onto a website and view. The website link at the top is a free Github pages hosted site. I recommend using [GitHub](https://github.com/) to manage version control.

This process requires some knowledge of HTML and JavaScript. Amateurs can still use it as long as they pay attention to details and syntax. You should also know CSS if you want to change the menu, etc.

### Step-by-step overview.
1. Create or download a 3d model.
2. Import it to 3ds Max. Save it as a .max file.
3. Open the Standard Materials Browser and create any materials you wish you see (concrete, steel, etc).
4. Run the 3ds Max plugin and export the file to a .json three.js 3d data file.
5. Link the new .json files in a new .js script. Create a new .html file and link the .js script to it.
6. Attach the new meshes created in the loader files (which you did at the beginning of step 5) to layer buttons.
7. Customize the view scope, lights, and preset views for your model.

### Your toolkit.
* 3ds Max. Save and add [the three.js .json exporter](https://github.com/mrdoob/three.js/blob/master/utils/exporters/max/ThreeJSExporter.ms) to the 3ds Max plugins folder. This particular plugin opens when you open 3ds Max, so you may have to close and reopen it.
* Your favorite text editor (I recommend [Sublime Text 3](http://www.sublimetext.com/) or similiar).
* A method of uploading to the web (I recommend GitHub).

### Detailed step-by-step overview.
#### Create or download a 3d model.
Check out [3d Warehouse](https://3dwarehouse.sketchup.com/) for free downloads, or build your own using Revit, AutoCAD, SketchUp, etc.

#### Import it to 3ds Max. Save it as a .max file.
Simply import the model into 3ds Max and save it as a new .max file. This file is where you will apply materials to individual objects.

#### Open the Standard Materials Browser and create any materials you wish you see (concrete, steel, etc).
There are many tutorials online of how to apply materials to a 3ds Max scene. [Try searching Google for a video](http://lmgtfy.com/?q=3ds+max+materials+browser).

#### Run the 3ds Max plugin and export the file to a .json three.js 3d data file.
Once you are done with the materials, close and reopen the file so that the export appears. Then uncheck all the boxes in the plugin, select any objects you wish to export, and click "Export."

PLEASE NOTE - if you want to have a facade with mullions that cast a shadow, but also a glass facade that does not cast a shadow, you will need to export them seperately. This is because shadows are specified for each .json 3d data file in three.js.

#### Link the new .json files in a new .js script. Create a new .html file and link the .js script to it.
Put all of your new .json files in a new folder. Copy the sample .html and .js file (index.html, main.js) and rename them (e.x. myPage.html, myScript.js).
  - Now edit and copy the load function for each .json file you have.
```
	loader.load('sample-model-json/sample-concrete.js', function ( geometry, materials ) {  
		mesh1 = new THREE.Mesh(
			geometry, new THREE.MeshFaceMaterial( materials )
		);

		mesh1.rotation.x = -Math.PI / 2;
		mesh1.castShadow = true;
		mesh1.receiveShadow = true;
		group.add( mesh1 );
		scene.add( mesh1 );
	});
```
Enable any transparent materials by editing the corresponding .json file. Find the material (e.x. glass) that you are looking for and add this line `"transparent"  : true,` so that it looks like the code below.
```
{
"DbgIndex" : 0,
"DbgName"  : "Glass",
"colorDiffuse"  : [0.9255, 1.0000, 1.0000],
"colorAmbient"  : [0.9255, 1.0000, 1.0000],
"colorSpecular"  : [0.9000, 0.9000, 0.9000],
"transparent"  : true,
"transparency"  : 0.25,
"specularCoef"  : 300.0,
"vertexColors" : false
}
```
Finally, include your new .js script (e.x. myScript.js) in your new .html file (e.x. myPage.html), at the bottom. See the code below for context.
```
    <div id="3d"></div>
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bootstrap-toggle.min.js"></script>
    <script src="js/three.min.js"></script>

    <script src="js/stats.min.js"></script>
    <script src="js/Detector.js"></script>
    <script src="js/JSONLoader.js"></script>
    <script src="js/OrbitControls.js"></script>
    <script src="js/myScript.js"></script>
  </body>
</html>
```
#### Attach the new meshes created in the loader files (which you did at the beginning of step 5) to layer buttons.
You can add and remove as many meshes as you want with a single button. For example, the facade mullions and glass can be grouped in this way.
```
$( 'input#layer1' ).change( function() {
	if( $( 'input#layer1' ).hasClass( 'active' ) ){
		$( 'input#layer1' ).removeClass( 'active' );
		scene.remove( mesh1 );
	} else {
		$( 'input#layer1' ).addClass( 'active' );
		scene.add( mesh1 );
	}
});
```
#### Customize the view scope, lights, and preset views for your model.
You can customize the renderer's scope, lights and preset views for your model. This is important and make it look really good.
The renderer's scope code uses some constants. These can be found at the top of your .js script.
```
VIEW_ANGLE = 60,
ASPECT = WIDTH / HEIGHT,
NEAR = 10,
FAR = 8000;
```
The lighting code is just below. The variable you will edit is labelled "spotLight." The properties are self explanatory, but check [the three.js documentation](http://threejs.org/docs/#Reference/Lights/SpotLight) for more information. The last line lets you debug the light by rendering its boundaries in the scene.
```
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.x = 2820;
spotLight.position.y = 2000;
spotLight.position.z = 0;
spotLight.target = myTarget;
spotLight.castShadow = true;
spotLight.shadowMapWidth = 1500;
spotLight.shadowMapHeight = 1000;
spotLight.shadowCameraNear = 1500;
spotLight.shadowCameraFar = 6000;
spotLight.shadowCameraFov = 45;
spotLight.shadowCameraVisible = false; // Turn this to "true" to see light boundaries.
```
The final step is to create some views. Edit the buttons at the bottom of the file. The camera's position and myTarget's position are all you nede to edit, unless you want to add other custom stuff to your preset view (like lighting).
```
$( 'a#view1' ).click( function() {
	camera.position.set( 0, 1000, 2000 );
	myTarget.position.set( 0, 400, 0 );
	camera.lookAt( myTarget.position );
	controls.target = myTarget.position;

	$( 'button#cameraa' ).removeClass( 'active' );
	$( 'button#camerab' ).addClass( 'active' );
	$( 'button#camerac' ).removeClass( 'active' );

	camera_cw = false;
	camera_ccw = false;
});
```
## Future development
to-do.
