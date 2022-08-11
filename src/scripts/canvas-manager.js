class CanvasManager {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.resizeHandler = (e) => this.resize();
    this.resize();
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", this.resizeHandler, false);
  }

  resize() {
    const width = 256;
    const height = 240;

    let scale = 1;

    if (window.innerWidth <= window.innerHeight) {
      scale = Math.floor(window.innerWidth / width);
    } else {
      scale = Math.floor(window.innerHeight / height);
    }

    this.canvas.width = width * scale;
    this.canvas.height = height * scale;
  }

  clean() {
    window.removeEventListener('resize', this.resizeHandler);
    this.canvas.remove();
  }
}

export default CanvasManager;
