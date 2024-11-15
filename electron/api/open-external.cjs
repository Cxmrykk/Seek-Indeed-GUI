const { shell } = require('electron');

module.exports = (app, ipcMain) => {
  ipcMain.handle('open-external', async (event, url) => {
    return shell.openExternal(url)
  });
};