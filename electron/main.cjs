const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

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
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
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

ipcMain.handle('fetch-jobs', async (event, seekUrl, indeedUrl, numPages) => {
  let jobs = [];
  let driver;

  // Start chromedriver if packaged
  // (otherwise started automatically in dev server)
  if (app.isPackaged) {
    require("../../node_modules/electron-chromedriver/chromedriver");
  } else {
    require('electron-chromedriver/chromedriver');
  }

  // Allow time for driver to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // Create new WebDriver instance
    driver  = await new Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        'goog:chromeOptions': {
          // Here is the path to your Electron binary.
          binary: app.getPath('exe'),
          args: ['--headless=new']
        }
      })
      .forBrowser('chrome')
      .build()

    // Implement your Seek and Indeed scraping logic here using Selenium
    if (seekUrl) {
      await driver.get(seekUrl);
      // ... (Your Seek scraping logic using driver.findElement(), driver.findElements(), etc.) ...
      // Example:
      // const elements = await driver.findElements(By.css('.job-card'));
      // for (let element of elements) {
      //   const title = await element.findElement(By.css('.title')).getText();
      //   jobs.push({ title });
      // }
    }

    if (indeedUrl) {
      await driver.get(indeedUrl);
      // ... (Your Indeed scraping logic using driver.findElement(), driver.findElements(), etc.) ...
    }

  } catch (err) {
    console.error('Error during scraping:', err);
    throw err;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }

  return jobs;
});