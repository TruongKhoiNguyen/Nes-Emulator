const NesJs = window.NesJs;

const START = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[13];
const SELECT = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[32];
const LEFT = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[37];
const UP = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[38];
const RIGHT = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[39];
const DOWN = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[40];
const A = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[88];
const B = NesJs.Nes.prototype.KEY_TO_PAD_BUTTONS[90];

class KeyMapperBuilder {
  constructor() {
    this.configuration = {
      start: 13, // enter
      select: 32, // space
      left: 37, // left arrow
      up: 38, // up arrow
      right: 39, // right arrow
      down: 40, // down arrow
      a: 88, // x
      b: 90, // z
    };
  }

  static new() {
    return new KeyMapperBuilder();
  }

  setStart(keyCode) {
    this.configuration.start = keyCode;
    return this;
  }

  setSelect(keyCode) {
    this.configuration.select = keyCode;
    return this;
  }

  setLeft(keyCode) {
    this.configuration.left = keyCode;
    return this;
  }

  setUp(keyCode) {
    this.configuration.up = keyCode;
    return this;
  }

  setRight(keyCode) {
    this.configuration.right = keyCode;
    return this;
  }

  setDown(keyCode) {
    this.configuration.down = keyCode;
    return this;
  }

  setA(keyCode) {
    this.configuration.a = keyCode;
    return this;
  }

  setB(keyCode) {
    this.configuration.b = keyCode;
    return this;
  }

  build() {
    return {
      [this.configuration.start]: START,
      [this.configuration.select]: SELECT,
      [this.configuration.left]: LEFT,
      [this.configuration.up]: UP,
      [this.configuration.right]: RIGHT,
      [this.configuration.down]: DOWN,
      [this.configuration.a]: A,
      [this.configuration.b]: B,
    };
  }
}

export default KeyMapperBuilder;
