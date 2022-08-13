import app, { addEventHandler } from "./scripts/app.js";
import { customizeA, customizeB, defaultKeymap } from "./scripts/keymap.js";
import bootupState from "./scripts/bootup-state.js";
import fileDropHandler from "./scripts/file-drop-handler.js";
import { compose } from "./scripts/utilities.js";

const runningBootupState = bootupState(document.createElement("canvas"));

const customizeKeymap = compose(customizeA(83), customizeB(65));
const customKeymap = customizeKeymap(defaultKeymap);

const startApp = app(
  new Map([["keymap", customKeymap]]),
  runningBootupState,
  []
);

const runningFileDropHandler = fileDropHandler((file) => {
  startApp.loadRom(file.target.result);
});

const runningApp = addEventHandler(startApp, [runningFileDropHandler]);

if (window.electronAPI) {
  window.electronAPI.onLoadRom((_event, value) => {
    runningApp.loadRom(value);
  });

  window.electronAPI.onCloseRom((_event, value) => {
    runningApp.close();
  });
}

runningApp.setup();
runningApp.run();
