const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Load the scraper endpoints
require("./api/fetch-jobs-seek.cjs")(app, ipcMain);
require("./api/fetch-jobs-indeed.cjs")(app, ipcMain);
require("./api/open-external.cjs")(app, ipcMain);

async function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.maximize();

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:5173'); // Load the frontend
    require('electron-chromedriver/chromedriver'); // Load chromedriver executable
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
    require("../../node_modules/electron-chromedriver/chromedriver");
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

