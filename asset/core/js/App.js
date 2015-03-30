goog.provide('gl.App');

goog.require('goog.events');

goog.require('gl.Scene1');
goog.require('gl.Scene2');
goog.require('gl.GLRenderer');
goog.require('gl.CameraShake');

gl.App = function()
{

};
goog.addSingletonGetter(gl.App);

gl.App.prototype.initialize = function()
{
    var renderer = new gl.GLRenderer();

    var scene1 = new gl.Scene1();
    renderer.setScene(scene1.scene);
    renderer.registerAnimateItem(scene1);

    //var cameraShake = new gl.CameraShake(renderer.camera);
    //renderer.registerAnimateItem(cameraShake);

    renderer.startAnimate();

};


gl.bootstrap = function()
{
    gl.App.getInstance().initialize();
};
