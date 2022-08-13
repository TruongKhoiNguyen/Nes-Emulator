const NesJs = window.NesJs;

/*
The original only have one resolution of 256 x 240 because
the image is drawn by copy the 'RAM' to the canvas. 

This class is made to overcome that limitation by extending the
draw routine. Instead of copy image directly to the canvas. This class
use another canvas as a buffer, the original Display class will draw to 
that buffer and then the buffer will be scaled and drawn to the real canvas 
that the user actually see.
*/
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
