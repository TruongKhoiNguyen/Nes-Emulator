import display from "./display.js";

const NesJs = window.NesJs;

const emulator = (rom, nes, canvas) => {
  const handleKeyUp = (e) => nes.handleKeyUp(e);
  const handleKeyDown = (e) => nes.handleKeyDown(e);

  return {
    setup: () => {
      nes.setRom(new NesJs.Rom(rom));
      nes.setDisplay(display(canvas));
      nes.setAudio(new NesJs.Audio());
      nes.bootup();

      window.onkeydown = handleKeyDown;
      window.onkeyup = handleKeyUp;
    },

    run: () => {
      nes.run();
    },

    customKeymap: (config) => {
      if (config) {
        nes.KEY_TO_PAD_BUTTONS = config;
      }
    },

    clean: () => {
      nes.stop();
      window.onkeydown = null;
      window.onkeyup = null;
    },
  };
};

export default emulator;
