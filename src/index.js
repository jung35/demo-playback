const { app, BrowserWindow } = require("electron");

require("electron-reload")(__dirname, {
  electron: `${__dirname}/../node_modules/.bin/electron`
});

app.on("ready", () => {
  const main_window = new BrowserWindow({
    width: 1280,
    height: 1280,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: { nodeIntegration: true, devTools: true }
  });

  main_window.loadURL(`file://${__dirname}/index.html`);
});
