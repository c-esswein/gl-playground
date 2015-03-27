goog.provide('gl.App');

goog.require('goog.events');

goog.require('gl.Scene1');
goog.require('gl.Scene2');

gl.App = function()
{

};
goog.addSingletonGetter(gl.App);

gl.App.prototype.initialize = function()
{
    var canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight;


    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(canvasWidth, canvasHeight);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    var canvasEl = this.renderer.domElement;
    canvasEl.id = 'render-canvas';
    document.body.appendChild(canvasEl);

    this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 10);
    //this.camera.lookAt(this.scene.position);

    goog.events.listen(window, goog.events.EventType.RESIZE, this.onWindowResize_, false, this);

};

gl.App.prototype.onWindowResize_ = function()
{
    var canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight;

    this.renderer.setSize(canvasWidth, canvasHeight);
    this.camera.aspect = canvasWidth / canvasHeight;
    this.camera.updateProjectionMatrix();
};


gl.bootstrap = function()
{
    gl.App.getInstance().initialize();
};
