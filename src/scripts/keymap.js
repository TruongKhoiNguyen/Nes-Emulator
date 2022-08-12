import { curry } from "./utilities.js";

const NesJs = window.NesJs;

const START = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[13];
const SELECT = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[32];
const LEFT = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[37];
const UP = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[38];
const RIGHT = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[39];
const DOWN = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[40];
const A = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[88];
const B = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[90];

const defaultKeymap = {
  13: START, // enter
  32: SELECT, // space
  37: LEFT, // left arrow
  38: UP, // up arrow
  39: RIGHT, // right arrow
  40: DOWN, // down arrow
  88: A, // x
  90: B, // z
};

const addEntry = (map, key, value) => {
  const tmp = new Map(map);
  tmp.set(key, value);
  return tmp;
};

const removeKey = (map, key) => {
  const tmp = new Map(map);
  tmp.delete(key);
  return tmp;
};

const reverseKeyValuePair = (entries) =>
  entries.map((entry) => [entry[1], entry[0]]);

const convertToMap = (arr) => new Map(arr);

const customizeKey = (keymap, keycode, button) =>
  Object.fromEntries(
    reverseKeyValuePair(
      Array.from(
        addEntry(
          removeKey(
            convertToMap(reverseKeyValuePair(Object.entries(keymap))),
            button
          ),
          button,
          keycode
        ).entries()
      )
    )
  );

const customizeStart = curry((keycode, keymap) =>
  customizeKey(keymap, keycode, START)
);
const customizeSelect = curry((keycode, keymap) =>
  customizeKey(keymap, keycode, SELECT)
);
const customizeLeft = curry((keycode, keymap) =>
  customizeKey(keymap, keycode, LEFT)
);
const customizeUp = curry((keycode, keymap) =>
  customizeKey(keymap, keycode, UP)
);
const customizeRight = curry((keycode, keymap) =>
  customizeKey(keymap, keycode, RIGHT)
);
const customizeDown = curry((keycode, keymap) =>
  customizeKey(keymap, keycode, DOWN)
);
const customizeA = curry((keycode, keymap) => customizeKey(keymap, keycode, A));
const customizeB = curry((keycode, keymap) => customizeKey(keymap, keycode, B));

export { defaultKeymap };

export {
  customizeStart,
  customizeSelect,
  customizeLeft,
  customizeUp,
  customizeRight,
  customizeDown,
  customizeA,
  customizeB,
};
