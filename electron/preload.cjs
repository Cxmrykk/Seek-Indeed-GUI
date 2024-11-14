const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  fetchJobs: (seekUrl, indeedUrl, numPages) => ipcRenderer.invoke('fetch-jobs', seekUrl, indeedUrl, numPages)
});