const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onLoadRom: (callback) => ipcRenderer.on("load-rom", callback),
  onCloseRom: (callback) => ipcRenderer.on("close-rom", callback),
  sendKeymapConfig: (keymap) => ipcRenderer.send("set-keymap", keymap),
});
