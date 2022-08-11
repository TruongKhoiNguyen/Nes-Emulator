import CanvasManager from "./canvas-manager.js";
import Emulator from "./emulator.js";
import FileDropHandler from "./file-drop-handler.js";
import KeyMapperBuilder from "./key-mapper-builder.js";

class GameplayState {
  constructor(context, file) {
    this.context = context;
    this.rom = file.target.result;
    this.canvasManager = new CanvasManager();
    this.fileDropHandler = new FileDropHandler();
    this.emulator = new Emulator(this.rom, this.canvasManager.canvas);
  }

  setup() {
    this.fileDropHandler.setCallback((file) => {
      this.emulator.stop();
      const gameplayState = new GameplayState(this.context, file);
      this.context.changeState(gameplayState);
      this.context.setup();
      this.context.run();
    });
  }

  run() {
    const keymapConfig = new KeyMapperBuilder().setA(83).setB(65).build();
    this.emulator.customKeymap(keymapConfig);
    this.emulator.bindKey(window);
    this.emulator.run();
  }

  clean() {
    this.fileDropHandler.clean();
    this.emulator = null;
    this.canvasManager.clean();
    this.rom = null;
  }
}

export default GameplayState;
