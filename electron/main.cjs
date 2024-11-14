const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Builder, By } = require('selenium-webdriver');

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

ipcMain.handle('fetch-jobs-seek', async (event, seekUrl, numPages) => {
  let jobs = [];
  let driver;

  // Start chromedriver if packaged
  if (app.isPackaged) {
    require("../../node_modules/electron-chromedriver/chromedriver");
  } else {
    require('electron-chromedriver/chromedriver');
  }

  // Allow time for driver to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    driver = await new Builder()
    .usingServer('http://localhost:9515')
    .withCapabilities({
      'goog:chromeOptions': {
        // Here is the path to your Electron binary.
        binary: app.getPath('exe'),
        //args: ['--headless=new']
      }
    })
    .forBrowser('chrome')
    .build()

    for (let page = 1; page <= numPages; page++) {
      await driver.get(`${seekUrl}&page=${page}`);
      const html = await driver.getPageSource();
      const pattern = /window\.SEEK_REDUX_DATA = (\{[^\n]+\});\n/;
      const match = html.match(pattern);

      if (match) {
        const jsonText = match[1].replace(/"(.*?)":\s*undefined/g, '"$1": null');
        const data = JSON.parse(jsonText.trim());

        for (const job of data.results.results.jobs) {
          const listingDate = new Date(job.listingDate);
          const now = new Date();
          const timeDifference = Math.floor((now - listingDate) / (1000 * 60 * 60 * 24));

          jobs.push({
            id: job.id,
            title: job.title,
            company: job.advertiser.description,
            workType: job.workType,
            location: job.suburb || job.area,
            listed: `${timeDifference} Days Ago`,
            source: "Seek",
            url: `https://seek.com.au/job/${job.id}`
          });
        }
      }
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

ipcMain.handle('fetch-jobs-indeed', async (event, indeedUrl, numPages) => {
  let jobs = [];
  let driver;

  // Start chromedriver if packaged
  if (app.isPackaged) {
    require("../../node_modules/electron-chromedriver/chromedriver");
  } else {
    require('electron-chromedriver/chromedriver');
  }

  // Allow time for driver to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    driver = await new Builder()
    .usingServer('http://localhost:9515')
    .withCapabilities({
      'goog:chromeOptions': {
        // Here is the path to your Electron binary.
        binary: app.getPath('exe'),
        //args: ['--headless=new']
      }
    })
    .forBrowser('chrome')
    .build()

    for (let page = 0; page < numPages * 10; page += 10) {
      await driver.get(`${indeedUrl}&start=${page}`);
      const html = await driver.getPageSource();
      const scriptPattern = /window\.mosaic\.providerData\["mosaic-provider-jobcards"\]=(\{.+?\});/;
      const scriptMatch = html.match(scriptPattern);

      if (scriptMatch) {
        const jsonBlob = JSON.parse(scriptMatch[1]);
        const jobsList = jsonBlob.metaData.mosaicProviderJobCardsModel.results;

        for (const job of jobsList) {
          if (job.jobkey) {
            let dateObj;
            try {
              const timestampMs = parseInt(job.pubDate, 10);
              dateObj = new Date(timestampMs);
            } catch (error) {
              try {
                dateObj = new Date(job.pubDate);
              } catch (error) {
                dateObj = new Date(); // Fallback to current date if parsing fails
              }
            }
            const timeDifference = Math.floor((new Date() - dateObj) / (1000 * 60 * 60 * 24));
            const listedDate = `${timeDifference} Days Ago`;

            jobs.push({
              id: job.jobkey,
              title: job.title,
              company: job.company,
              workType: job.jobTypes ? job.jobTypes.join(', ') : '',
              location: `${job.jobLocationCity}, ${job.jobLocationState}`,
              listed: listedDate,
              source: "Indeed",
              url: `https://www.indeed.com/m/basecamp/viewjob?viewtype=embedded&jk=${job.jobkey}`
            });
          }
        }
      }
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