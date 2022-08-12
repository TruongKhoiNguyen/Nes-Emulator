const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 256 * 2,
    height: 240 * 2,
    useContentSize: true,
    minWidth: 256,
    minHeight: 240,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open files",
          click: () => loadFile(win),
        },
        {
          label: "Close",
          click: () => closeGame(win),
        },
      ],
    },
    { label: "Config", submenu: [{ label: "Keymap" }] },
    {
      label: "Help",
      submenu: [
        {
          label: "Developer tool",
          click: () => win.webContents.openDevTools(),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  win.loadFile("src/index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on("set-keymap", handleKeymap);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const loadFile = (mainWindow) => {
  const files = dialog.showOpenDialogSync();
  if (files) {
    const file = files[0];

    fs.readFile(file, (err, data) => {
      mainWindow.webContents.send("load-rom", data);
    });
  }
};

const closeGame = (mainWindow) => {
  mainWindow.webContents.send("close-rom");
};

const buttonNumberMap = new Map([
  [0, "a"],
  [1, "b"],
  [2, "select"],
  [3, "start"],
  [4, "up"],
  [5, "down"],
  [6, "left"],
  [7, "right"],
]);

const specialCharacter = new Map([
  ["13", "Enter"],
  ["32", "Space"],
  ["37", "Left"],
  ["38", "Up"],
  ["39", "Right"],
  ["40", "Down"],
  ["16", "Shift"],
  ["18", "Alt"],
  ["91", "OS"],
  ["17", "Control"],
  ["27", "Escape"],
  ["9", "Tab"],
]);

const handleKeymap = (event, keymap) => {
  console.log(parseKeymap(keymap));
};

const parseKeymap = (keymap) =>
  new Map(
    Array.from(new Map(Object.entries(keymap)))
      .map(([key, button]) => [key, buttonNumberMap.get(button)])
      .map(([key, button]) => [
        key,
        { button: button, keyname: String.fromCharCode(key) },
      ])
      .map(([key, { button, keyname }]) => [
        key,
        {
          button: button,
          keyname: specialCharacter.get(key)
            ? specialCharacter.get(key)
            : keyname,
        },
      ])
  );
