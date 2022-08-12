const NesJs = window.NesJs;

class Display extends NesJs.Display {
  constructor(canvas) {
    const buffer = document.createElement("canvas");
    super(buffer);

    this.canvas = canvas;
    this.buffer = buffer;
  }

  updateScreen() {
    this.buffer.getContext("2d").putImageData(this.data, 0, 0);
    this.canvas
      .getContext("2d")
      .drawImage(this.buffer, 0, 0, this.canvas.width, this.canvas.height);
  }
}

// display :: canvas -> Display
const display = (canvas) => new Display(canvas);

export default display;
