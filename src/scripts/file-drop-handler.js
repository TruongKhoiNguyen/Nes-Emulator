// fileDropHandler :: fn -> EventHandler
const fileDropHandler = (callback) => {
  const handleFileDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    loadFile(files[0], callback);
  };

  return {
    callback: callback,

    setup: () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
        document.body.addEventListener(eventName, preventDefault, false)
      );

      document.body.addEventListener("drop", handleFileDrop, false);
    },

    clean: () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
        document.body.removeEventListener(eventName, preventDefault, false)
      );

      document.body.removeEventListener("drop", handleFileDrop, false);
    },
  };
};

// preventDefault :: Event -> IO ()
const preventDefault = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

// loadFile :: File -> Fn -> IO ()
const loadFile = (file, callback) => {
  const reader = new FileReader();

  reader.onload = callback;

  reader.readAsArrayBuffer(file);
};

export default fileDropHandler;
