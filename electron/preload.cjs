const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    fetchSeekJobs: (seekUrl, numPages) => ipcRenderer.invoke('fetch-jobs-seek', seekUrl, numPages),
    fetchIndeedJobs: (indeedUrl, numPages) => ipcRenderer.invoke('fetch-jobs-indeed', indeedUrl, numPages)
});