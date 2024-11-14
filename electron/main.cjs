const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Load the scraper endpoints
require("./scraper/seek.cjs")(app, ipcMain);
require("./scraper/indeed.cjs")(app, ipcMain);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);

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

