goog.provide('gl.Scene2');


gl.Scene2 = function()
{
    this.scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);


        // Create the triangle (or any arbitrary geometry).
        // 1. Instantiate the geometry object
        // 2. Add the vertices
        // 3. Define the faces by setting the vertices indices
        var triangleGeometry = new THREE.Geometry();
        triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  1.0, 0.0));
        triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
        triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
        triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

         // To color the surface, a material has to be created. If all vertices shall have
         // different colors, we need to set the vertex colors of each face. The colors in
         // betweenwill be interpolated as color gradients.
         // Unfortunately, the canvas renderer doesn't support vertex colors (yet [Three.js,
         // release 69]). Either you accept a white face color, or set another face color.

         triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
         triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
         triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);

        // To color the surface, a material has to be created. If all faces have the same color,
        // the THREE.MeshBasicMaterial fits our needs. It offers a lot of attributes (see
        // https://github.com/mrdoob/three.js/blob/master/src/materials/MeshBasicMaterial.js)
        // from which we need in this lesson only 'color'.

        // Create a white basic material and activate the 'doubleSided' attribute to force the
        // rendering of both sides of each face (front and back). This prevents the so called
        // 'backface culling'. Usually, only the side is rendered, whose normal vector points
        // towards the camera. The other side is not rendered (backface culling). But this
        // performance optimization sometimes leads to wholes in the surface. When this happens
        // in your surface, simply set 'doubleSided' to 'true'.
        var triangleMaterial = new THREE.MeshBasicMaterial({
            vertexColors:THREE.VertexColors,
            side:THREE.DoubleSide
        });

        // Create a mesh and insert the geometry and the material. Translate the whole mesh
        // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
        var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
        triangleMesh.position.set(-1.5, 0.0, 4.0);
        this.scene.add(triangleMesh);

        // The creation of the square is done in the same way as the triangle, except of the
        // face definition. Instead of using one THREE.Face3, we have to define two
        // THREE.Face3 objects.
        // 1. Instantiate the geometry object
        // 2. Add the vertices
        // 3. Define the faces by setting the vertices indices
        var squareGeometry = new THREE.Geometry();
        squareGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
        squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
        squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

        // Create a white basic material and activate the 'doubleSided' attribute.
        var squareMaterial = new THREE.MeshBasicMaterial({
            color:0x8080FF,
            side:THREE.DoubleSide
        });

        // Create a mesh and insert the geometry and the material. Translate the whole mesh
        // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
        var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
        squareMesh.position.set(1.5, 0.0, 4.0);
        this.scene.add(squareMesh);




        var pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);

        for(i = 0; i < pyramidGeometry.faces.length; i++){
             if(pyramidGeometry.faces[i] instanceof THREE.Face4){
                 pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
                 if((i % 2) == 0){
                     pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
                     pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
                 } else {
                     pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
                     pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x00FF00);
                 }
                 pyramidGeometry.faces[i].vertexColors[3] = new THREE.Color(0xFF0000);
             } else {
                 pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
                 pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
                 pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
             }
         }

         var pyramidMaterial = new THREE.MeshBasicMaterial({
             vertexColors:THREE.VertexColors,
             side:THREE.DoubleSide
         });

         // Create a mesh and insert the geometry and the material. Translate the whole mesh
         // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
         pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
         pyramidMesh.position.set(-4, 0.0, 4.0);
         this.pyramidMesh = pyramidMesh;
         this.scene.add(pyramidMesh);

    this.onRender();
};


gl.Scene2.prototype.onRender = function()
{
    requestAnimationFrame(goog.bind(this.onRender, this));

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.pyramidMesh.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 0.075);

    var app = gl.App.getInstance();
    app.renderer.render(this.scene, app.camera);
};
