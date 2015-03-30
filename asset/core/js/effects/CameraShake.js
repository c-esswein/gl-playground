goog.provide('gl.CameraShake');


/**
 * Simple Camera animation.
 * @param {camera} camera THREE.PerspectiveCamera
 */
gl.CameraShake = function(camera)
{
    this.camera = camera;


    this.mouseX = 0;
    this.cameraShakeY = 0;


    goog.events.listen(document, goog.events.EventType.MOUSEMOVE, this.onMouseMove, false, this);
};


gl.CameraShake.prototype.onAnimate = function()
{
    // camera noise
    this.camera.position.y += Math.cos(this.cameraShakeY) * 2;
    this.cameraShakeY += 0.02;

    // mouse camera move
    this.camera.position.x += ((this.mouseX * 5) - this.camera.position.x) ;
};


gl.CameraShake.prototype.onMouseMove = function(e) {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
}