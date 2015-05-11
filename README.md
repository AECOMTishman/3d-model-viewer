# 3d model viewer
This read me file documents how to set up a 3d model viewer, similiar to the one found here:  [3d model viewer, sample model](http://tishmanconstruction.github.io/3d-model-viewer/).

## What is it?
This techonology is built with the WebGL API, which is based on OpenGL. Specifically, it uses the [three.js](http://threejs.org/) library of WebGL functions. three.js offers a variety of powerful features, as well as cross-browser and mobile functionality.

## Potential applications
The best part of this viewer is that all you need to do is send a link to your colleague and you are done. No training. No software downloads.

This model viewer has two main applications.
1. Sharing designs with ownership and stakeholders.
2. Collaborating on designs within the design team. Communicating specific issues in 3d.

## How can you use it?
You will need to make a 3d model or download one. The only file type requirement is that you must be able to convert it to a 3ds Max (.max) file. From there, you will add materials to the model and export it as a custom .json three.js 3d data file using a 3ds plugin. Then you are ready to load it onto a website and view. This website link at the top is a free Github pages hosted site. I recommend using Git to manage version control.

This process requires some knowledge of HTML and JavaScript. Amateurs can still use it as long as they pay attention to details and syntax.

### Step-by-step overview.
1. Create or download a 3d model.
2. Import it to 3ds Max. Save it as a .max file.
3. Open the Standard Materials Browser and create any materials you wish you see (concrete, steel, etc).
4. Run the 3ds Max plugin and export the file to a .json three.js 3d data file.
5. Link the new .json files in a new .js script. Create a new .html file and link the .js script to it.
6. Customize the view scope, lights, and preset views for your model.

### Your toolkit.
* 3ds Max.
* Your favorite text editor (I recommend Sublime Text 3, Atom, etc).
* A method of uploading to the web (I recommend GitHub).

### Detailed step-by-step overview.

## Future development
to-do.
