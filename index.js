const perspectivr = function(options) {
  const {
    handlerSelector,
    targetSelector,
    customFactor,
    customPerspective,
    customScale
  } = options;
  
  // the magic box
  const handler = document.querySelector(handlerSelector);
  const target = document.querySelector(targetSelector);

  // vars
  const perspective = customPerspective ? customPerspective : '60rem';
  const factor = customFactor ? customFactor : 10; // less is more
  const scale = customScale ? `scale(${customScale})` : 'scale(1)';

  init3dEffect(handler, target);

  function init3dEffect(elController, elAffected) {
    elController.addEventListener('mousemove', e => {
      x = ((elController.offsetWidth / 2) - e.offsetX) / factor;
      y = ((elController.offsetHeight / 2) - e.offsetY) / -factor;

      elAffected.style.transform =
        `perspective(${perspective}) rotateY(${x}deg) rotateX(${y}deg) translateZ(0) ${scale}`;
    });

    elController.addEventListener('mouseout', () => {
      elAffected.style.transform = "perspective("+perspective+")";
    });

    // Mobile shit
    var lastX = 0;
    var lastY = 0;

    var diffX = 0;
    var diffY = 0;

    elController.addEventListener('touchmove', e => {
      // FIXME: Mobile touchmove event isn't working properly
      
      // var rect = e.target.getBoundingClientRect();
      // var x = e.targetTouches[0].pageX / factor;
      // var y = e.targetTouches[0].pageY / -factor;

      // x = ((elController.offsetWidth / 2) - e.targetTouches[0].pageX) / factor;
      // y = ((elController.offsetHeight / 2) - e.targetTouches[0].pageY) / -factor;

      var x = (e.targetTouches[0].pageX - lastX) / -factor;
      var y = (e.targetTouches[0].pageY - lastY) / -factor;

      diffX += x;
      diffY += y;

      lastX = e.targetTouches[0].pageX;
      lastY = e.targetTouches[0].pageY;

      elAffected.style.transform =
        `perspective(${perspective}) rotateY(${-diffX}deg) rotateX(${-diffY}deg) translateZ(0) ${scale}`;
    });

    // elController.addEventListener('touchend', () => {
    //   elAffected.style.transform = "perspective("+perspective+")";
    // });
  }
}
