const { app, BrowserWindow, Menu, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 256 * 2,
    height: 240 * 2,
    useContentSize: true,
    minWidth: 256 + 100,
    minHeight: 240 + 100,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isMacOs = process.platform === "darwin";

  const template = [
    ...(isMacOs
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    {
      label: "File",
      submenu: [
        {
          label: "Open",
          click: () => loadRom(win),
          accelerator: isMacOs ? "Cmd+O" : "Ctrl+O",
        },
        {
          label: "Close",
          click: () => closeGame(win),
          accelerator: isMacOs ? "Cmd+W" : "Ctrl+W",
        },
        {
          label: "Quit",
          role: isMacOs ? "close" : "quit",
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Toggle Developer Tools",
          click: () => win.webContents.openDevTools(),
          accelerator: isMacOs ? "Shift+Cmd+I" : "Ctrl+Shift+I",
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
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const loadRom = (mainWindow) => {
  const files = dialog.showOpenDialogSync({
    filters: [{ name: "NES ROM files", extensions: ["nes"] }],
  });

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

// TODO: Remapable buttons
// TODO: Swappable emulator engine
// TODO: Preferences for sound and video
// TODO: Fullscreen enable
// TODO: Catch error using Either Functor
