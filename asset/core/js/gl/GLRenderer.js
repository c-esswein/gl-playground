goog.provide('gl.GLRenderer');


/**
 * Three.js WebGL renderer. Full window size
 * @param {Element=} el ParentElement to append new Element
 */
gl.GLRenderer = function(el)
{
    var canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight;


    /**
     * @type {THREE.WebGLRenderer}
     */
    this.renderer_ = new THREE.WebGLRenderer({antialias:true});
    this.renderer_.setClearColor(0x000000, 1);
    this.renderer_.setPixelRatio(window.devicePixelRatio);
    this.renderer_.setSize(canvasWidth, canvasHeight);
    this.renderer_.gammaInput = true;
    this.renderer_.gammaOutput = true;

    var canvasEl = this.renderer_.domElement;
    canvasEl.id = 'render-canvas';
    el = el || document.body;
    el.appendChild(canvasEl);

    /**
     * @type {THREE.PerspectiveCamera}
     */
    this.camera = new THREE.PerspectiveCamera( 45, canvasWidth/canvasHeight, 1, 4000 );
    this.camera.position.z = 1750;
    this.camera.position.set(0, 0, 1750);

    /**
     * @type {boolean}
     */
    this.animate_ = false;

    /**
     * @type {array<gl.IAnimateItem>}
     */
    this.animateItem_ = [];

    /**
     * @type {THREE.Scene}
     */
    this.scene = null;

    goog.events.listen(window, goog.events.EventType.RESIZE, this.onWindowResize_, false, this);
};

gl.GLRenderer.prototype.onWindowResize_ = function()
{
    var canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight;

    this.renderer_.setSize(canvasWidth, canvasHeight);
    this.camera.aspect = canvasWidth / canvasHeight;
    this.camera.updateProjectionMatrix();
};

/**
 * @param {THREE.Scene} scene
 */
gl.GLRenderer.prototype.setScene = function(scene)
{
    this.scene = scene;
    this.camera.lookAt(this.scene.position);
};


/**
 * @return {THREE.Scene}
 */
gl.GLRenderer.prototype.getScene = function()
{
    return this.scene;
};

/**
 * @return {THREE.PerspectiveCamera}
 */
gl.GLRenderer.prototype.getCamera = function()
{
    return this.camera;
};

gl.GLRenderer.prototype.startAnimate = function()
{
    this.animate_ = true;
    requestAnimationFrame(goog.bind(this.onRender_, this));
};

gl.GLRenderer.prototype.stopAnimate = function()
{
    this.animate_ = false;
};

/**
 * @param {gl.IAnimateItem} item
 */
gl.GLRenderer.prototype.registerAnimateItem = function(item)
{
    this.animateItem_.push(item);
};

gl.GLRenderer.prototype.onRender_ = function()
{
    for(var i = 0, len = this.animateItem_.length; i < len; i++) {
        this.animateItem_[i].onAnimate();
    }

    this.renderer_.render(this.scene, this.camera);

    if(this.animate_) {
        requestAnimationFrame(goog.bind(this.onRender_, this));
    }
};
