const { Builder } = require('selenium-webdriver');

module.exports = (app, ipcMain) => {
  ipcMain.handle('fetch-jobs-seek', async (event, seekUrl, numPages) => {
    let jobs = [];
    let driver;

    try {
      driver = await new Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        'goog:chromeOptions': {
          // Here is the path to your Electron binary.
          binary: app.getPath('exe'),
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
};