import bootupState from "./bootup-state.js";
import emulator from "./emulator.js";
import gameplayState from "./gameplay-state.js";

const NesJs = window.NesJs;

// appCore :: Object -> GameState -> Game
const appCore = (config, state) => {
  const changeState = (newState) => {
    state?.clean();
    state = newState;
    state?.setup();
    state?.run();
  };

  return {
    config: config,
    state: state,
    eventHandlers: [],

    loadRom: (rom) => {
      const newCanvas = document.createElement("canvas");
      changeState(
        gameplayState(
          newCanvas,
          emulator(rom, new NesJs.Nes(), newCanvas),
          config
        )
      );
    },

    close: () => {
      changeState(bootupState(document.createElement("canvas")));
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
  };
};

// addEventHandler :: Game -> [EventHandler] -> Game
const addEventHandler = (app, eventHandlers) =>
  addSetup({
    ...app,
    eventHandlers: [...app.eventHandlers, ...eventHandlers],
  });

// addSetup :: Game -> Game
const addSetup = (app) => ({
  ...app,
  setup: () => {
    app.eventHandlers.forEach((eventHandler) => eventHandler.setup());
  },
});

// app :: Object -> GameState -> [EventHandler] -> Game
const app = (config, state, eventHandlers) =>
  addSetup(addEventHandler(appCore(config, state), eventHandlers));

export default app;

export { addEventHandler, addSetup };
