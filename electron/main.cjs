const { app, BrowserWindow } = require('electron');

async function loadMainModule() {
  const { createWindow } = await import('./main.js');
  createWindow();
}

app.whenReady().then(loadMainModule);

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await loadMainModule();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});