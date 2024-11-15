const { Builder } = require('selenium-webdriver');

module.exports = (app, ipcMain) => {
  ipcMain.handle('fetch-jobs-indeed', async (event, indeedUrl, numPages) => {
    let jobs = [];
    let driver;

    try {
      driver = await new Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        'goog:chromeOptions': {
          binary: app.getPath('exe'),
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
                ...job,
                url: `https://www.indeed.com/m/basecamp/viewjob?viewtype=embedded&jk=${job.jobkey}`
              });
            }
          }
        }
      }

    } catch (err) {
      console.error('Error during scraping:', err);
    } finally {
      if (driver) {
        await driver.quit();
      }
    }

    return jobs;
  });
}