import { resizeCanvas, resizeText } from "./canvas-manager.js";

// bootupState :: canvas -> GameState
const bootupState = (canvas) => {
  const resizeHandler = (e) => {
    setTimeout(() => {
      resizeCanvas(canvas);
      resizeText(canvas);
    }, 100);
  };

  return {
    canvas: canvas,
    setup: () => {
      resizeCanvas(canvas);
      resizeText(canvas);

      window.addEventListener("resize", resizeHandler, false);

      document.body.appendChild(canvas);
    },

    run: () => {},

    clean: () => {
      window.removeEventListener("resize", resizeHandler, false);
      canvas.remove();
    },

    updateConfig: () => {},
  };
};

export default bootupState;
