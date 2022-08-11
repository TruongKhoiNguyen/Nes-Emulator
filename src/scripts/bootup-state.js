import CanvasManager from "./canvas-manager.js";
import CanvasTextDecorator from "./canvas-text-decorator.js";
import FileDropHandler from "./file-drop-handler.js";
import GameplayState from "./gameplay-state.js";

class BootupState {
  constructor(context) {
    this.fileDropHandler = new FileDropHandler();
    this.context = context;
    this.canvasManager = new CanvasManager();
    this.canvasTextDecorator = new CanvasTextDecorator(
      this.canvasManager,
      (canvasManager) => {
        const ctx = canvasManager.canvas.getContext("2d");
        ctx.font = "bold 5vmin Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          "Drop ROM file here",
          canvasManager.canvas.width / 2,
          canvasManager.canvas.height / 2
        );
      }
    );
  }

  setup() {
    this.fileDropHandler.setCallback((file) => {
      const gameplayState = new GameplayState(this.context, file);
      this.context.changeState(gameplayState);
      this.context.setup();
      this.context.run();
    });
  }

  run() {}

  clean() {
    this.canvasTextDecorator.clean();
    this.canvasManager.clean();
    this.fileDropHandler.clean();
  }
}

export default BootupState;
