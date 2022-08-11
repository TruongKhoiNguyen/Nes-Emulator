import Display from "./display.js";

class Emulator {
  constructor(romFile, canvas) {
    this.nes = new NesJs.Nes();

    this.nes.setRom(new NesJs.Rom(romFile));
    this.nes.setDisplay(new Display(canvas));
    this.nes.setAudio(new NesJs.Audio());

    this.nes.bootup();
  }

  run() {
    this.nes.run();
  }

  bindKey(window) {
    window.onkeydown = (e) => this.nes.handleKeyDown(e);
    window.onkeyup = (e) => this.nes.handleKeyUp(e);
  }

  customKeymap(config) {
    this.nes.KEY_TO_PAD_BUTTONS = config;
  }

  stop() {
    this.nes.stop();
  }
}

export default Emulator;
