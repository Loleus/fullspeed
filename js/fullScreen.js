 // const setFscreen = () => {
 //   if (!Element.prototype.requestFullscreen) {
 //     Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
 //   };
 //   if (!document.exitFullscreen) {
 //     document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
 //   };
 //   if (!document.fullscreenElement) {
 //     Object.defineProperty(document, "fullscreenElement", {
 //       get: function () {
 //         return (
 //           document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement
 //         );
 //       },
 //     });
 //     Object.defineProperty(document, "fullscreenEnabled", {
 //       get: function () {
 //         return (
 //           document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled
 //         );
 //       },
 //     });
 //   };
 // };
 // export default setFscreen
const setFscreen = () => {
  // Polyfill requestFullscreen
  if (!Element.prototype.requestFullscreen) {
    Element.prototype.requestFullscreen =
      Element.prototype.mozRequestFullScreen ||
      Element.prototype.webkitRequestFullscreen ||
      Element.prototype.msRequestFullscreen;
  }

  // Polyfill exitFullscreen
  if (!document.exitFullscreen) {
    document.exitFullscreen =
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;
  }

  // fullscreenElement
  if (!("fullscreenElement" in document)) {
    Object.defineProperty(document, "fullscreenElement", {
      get() {
        return (
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement ||
          null
        );
      },
    });
  }

  // fullscreenEnabled
  if (!("fullscreenEnabled" in document)) {
    Object.defineProperty(document, "fullscreenEnabled", {
      get() {
        return (
          document.mozFullScreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.msFullscreenEnabled ||
          false
        );
      },
    });
  }
};

export default setFscreen;
