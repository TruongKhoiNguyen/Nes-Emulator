class FileDropHandler {
  constructor() {
    this.callback = () => {};

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
      document.body.addEventListener(
        eventName,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      )
    );

    document.body.addEventListener(
      "drop",
      (e) => this.handleFileDrop(e),
      false
    );
  }

  handleFileDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    this.loadFile(files[0]);
  }

  loadFile(file) {
    const reader = new FileReader();

    reader.onload = this.callback;

    reader.readAsArrayBuffer(file);
  }

  setCallback(callback) {
    this.callback = callback;
  }

  clean() {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
      document.body.removeEventListener(
        eventName,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      )
    );

    document.body.removeEventListener(
      "drop",
      (e) => this.handleFileDrop(e),
      false
    );

    this.callback = null;
  }
}

export default FileDropHandler;
