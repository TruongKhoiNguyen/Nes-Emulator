class CanvasTextDecorator {
  constructor(base, extension) {
    this.base = base;
    this.extension = extension;
    this.resizeHandler = (e) => this.resize();

    this.extension(this.base);
    window.addEventListener("resize", this.resizeHandler, false);
  }

  resize() {
    this.extension(this.base);
  }

  clean() {
    window.removeEventListener("resize", this.resizeHandler);
    this.extension = null;
    this.base = null;
  }
}

export default CanvasTextDecorator;
