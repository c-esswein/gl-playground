goog.provide('gl.Scene1');

var maxParticleCount = 1000;
var particleCount = 500;
var r = 1200;
var rHalf = r / 2;
var minDistance = 150;


gl.Scene1 = function()
{
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    this.camera.position.z = 1750;
    gl.App.getInstance().camera = this.camera;


    this.scene = new THREE.Scene();

    this.group = new THREE.Group();
    this.scene.add(this.group);

/*
    var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );
    helper.material.color.setHex( 0x080808 );
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    this.group.add( helper );
*/
    var segments = maxParticleCount * maxParticleCount;

    this.positions = new Float32Array( segments * 3 );
    this.colors = new Float32Array( segments * 3 );

    var pMaterial = new THREE.PointCloudMaterial( {
        color: 0xFFFFFF,
        size: 3,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
    } );

    this.particles = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array( maxParticleCount * 3 );
    this.particlesData = [];


    for ( var i = 0; i < maxParticleCount; i++ ) {

        var x = Math.random() * r - r / 2;
        var y = Math.random() * r - r / 2;
        var z = Math.random() * r - r / 2;

        this.particlePositions[ i * 3     ] = x;
        this.particlePositions[ i * 3 + 1 ] = y;
        this.particlePositions[ i * 3 + 2 ] = z;

        // add it to the geometry
        this.particlesData.push( {
            velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  -1 + Math.random() * 2 ),
            numConnections: 0
        } );

    }

    this.particles.drawcalls.push( {
        start: 0,
        count: particleCount,
        index: 0
    } );

    this.particles.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.particlePositions, 3 ) );

    // create the particle system
    this.pointCloud = new THREE.PointCloud( this.particles, pMaterial );
    this.group.add( this.pointCloud );

    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.DynamicBufferAttribute( this.colors, 3 ) );

    geometry.computeBoundingSphere();

    geometry.drawcalls.push( {
        start: 0,
        count: 0,
        index: 0
    } );

    var material = new THREE.LineBasicMaterial( {
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        transparent: true
    } );

    this.linesMesh = new THREE.Line( geometry, material, THREE.LinePieces );
    this.group.add( this.linesMesh );


    this.onRender();
};


gl.Scene1.prototype.onRender = function()
{
    var vertexpos = 0;
    var colorpos = 0;
    var numConnected = 0;

    for ( var i = 0; i < particleCount; i++ )
        this.particlesData[ i ].numConnections = 0;

    for ( var i = 0; i < particleCount; i++ ) {

        // get the particle
        var particleData = this.particlesData[i];

        this.particlePositions[ i * 3     ] += particleData.velocity.x;
        this.particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
        this.particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

        if ( this.particlePositions[ i * 3 + 1 ] < -rHalf || this.particlePositions[ i * 3 + 1 ] > rHalf )
            particleData.velocity.y = -particleData.velocity.y;

        if ( this.particlePositions[ i * 3 ] < -rHalf || this.particlePositions[ i * 3 ] > rHalf )
            particleData.velocity.x = -particleData.velocity.x;

        if ( this.particlePositions[ i * 3 + 2 ] < -rHalf || this.particlePositions[ i * 3 + 2 ] > rHalf )
            particleData.velocity.z = -particleData.velocity.z;

        //if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
          //  continue;

        // Check collision
        for ( var j = i + 1; j < particleCount; j++ ) {

            var particleDataB = this.particlesData[ j ];
            //if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
              //  continue;

            var dx = this.particlePositions[ i * 3     ] - this.particlePositions[ j * 3     ];
            var dy = this.particlePositions[ i * 3 + 1 ] - this.particlePositions[ j * 3 + 1 ];
            var dz = this.particlePositions[ i * 3 + 2 ] - this.particlePositions[ j * 3 + 2 ];
            var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

            if ( dist < minDistance ) {

                particleData.numConnections++;
                particleDataB.numConnections++;

                var alpha = 1.0 - dist / minDistance;

                this.positions[ vertexpos++ ] = this.particlePositions[ i * 3     ];
                this.positions[ vertexpos++ ] = this.particlePositions[ i * 3 + 1 ];
                this.positions[ vertexpos++ ] = this.particlePositions[ i * 3 + 2 ];

                this.positions[ vertexpos++ ] = this.particlePositions[ j * 3     ];
                this.positions[ vertexpos++ ] = this.particlePositions[ j * 3 + 1 ];
                this.positions[ vertexpos++ ] = this.particlePositions[ j * 3 + 2 ];

                this.colors[ colorpos++ ] = alpha;
                this.colors[ colorpos++ ] = alpha;
                this.colors[ colorpos++ ] = alpha;

                this.colors[ colorpos++ ] = alpha;
                this.colors[ colorpos++ ] = alpha;
                this.colors[ colorpos++ ] = alpha;

                numConnected++;
            }
        }
    }


    this.linesMesh.geometry.drawcalls[ 0 ].count = numConnected * 2;
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
    this.linesMesh.geometry.attributes.color.needsUpdate = true;

    this.pointCloud.geometry.attributes.position.needsUpdate = true;


    //var time = Date.now() * 0.001;
    //this.group.rotation.y = time * 0.1;
    var app = gl.App.getInstance();
    app.renderer.render(this.scene, this.camera);


    requestAnimationFrame(goog.bind(this.onRender, this));
};
