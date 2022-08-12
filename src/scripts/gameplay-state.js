import { resizeCanvas } from "./canvas-manager.js";

// gameplayState :: canvas -> Emulator -> Object -> GameState
const gameplayState = (canvas, emulator, config) => {
  const resizeCanvasHandler = (e) => {
    setTimeout(() => resizeCanvas(canvas), 100);
  };

  return {
    canvas: canvas,

    setup: () => {
      resizeCanvas(canvas);
      window.addEventListener("resize", resizeCanvasHandler, false);
      document.body.appendChild(canvas);
      emulator.setup();
      emulator.customKeymap(config.get("keymap"));
    },

    run: () => {
      emulator.run();
    },

    clean: () => {
      window.removeEventListener("resize", resizeCanvasHandler, false);
      canvas.remove();
      emulator.clean();
    },

    updateConfig: () => {
      emulator.customKeymap(config.get("keymap"));
    },
  };
};

export default gameplayState;
