import bootupState from "./bootup-state.js";
import emulator from "./emulator.js";
import gameplayState from "./gameplay-state.js";

const NesJs = window.NesJs;

const appCore = (config, state) => ({
  config: config,
  state: state,
  eventHandlers: [],
  loadRom: (rom) => {
    state?.clean();
    const newCanvas = document.createElement("canvas");
    state = gameplayState(
      newCanvas,
      emulator(rom, new NesJs.Nes(), newCanvas),
      config
    );
    state?.setup();
    state?.run();
  },
  close: () => {
    state?.clean();
    state = bootupState(document.createElement("canvas"));
    state?.setup();
    state?.run();
  },
  getConfig: (key) => config.get(key),
  setConfig: (key, value) => {
    config.set(key, value);
    state.updateConfig();
  },
  run: () => {
    state?.setup();
    state?.run();
  },
});

const addEventHandler = (app, eventHandlers) =>
  addSetup({
    ...app,
    eventHandlers: [...app.eventHandlers, ...eventHandlers],
  });

const addSetup = (app) => ({
  ...app,
  setup: () => {
    app.eventHandlers.forEach((eventHandler) => eventHandler.setup());
  },
});

const app = (config, state, eventHandlers) =>
  addSetup(addEventHandler(appCore(config, state), eventHandlers));

export default app;

export { addEventHandler, addSetup };
