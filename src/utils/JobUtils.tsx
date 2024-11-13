export interface Job {
  id: string;
  title: string;
  company: string;
  workType: string;
  location: string;
  listed: string;
  source: string;
  url?: string; // Add url property
}


export const fetchJobs = async (
  seekUrl: string,
  indeedUrl: string,
  numPages: number
): Promise<Job[]> => {
  // Placeholder for fetching and processing jobs from Seek and Indeed
  // This would involve making API calls or web scraping using a library like puppeteer or playwright
  // For this example, we'll return some dummy data

  const jobs: Job[] = [];

  // Simulate fetching Seek jobs
  for (let i = 0; i < numPages * 10; i++) {
    if (seekUrl) { // Only add Seek jobs if seekUrl is provided
      jobs.push({
        id: `seek-${i}`,
        title: `Seek Job ${i + 1}`,
        company: `Seek Company ${i % 5 + 1}`,
        workType: `Full Time`,
        location: `Sydney`,
        listed: `${Math.floor(Math.random() * 30)} days ago`,
        source: 'Seek',
      });
    }
  }

  // Simulate fetching Indeed jobs
  for (let i = 0; i < numPages * 10; i++) {
    if (indeedUrl) { // Only add Indeed jobs if indeedUrl is provided
      jobs.push({
        id: `indeed-${i}`,
        title: `Indeed Job ${i + 1}`,
        company: `Indeed Company ${i % 5 + 1}`,
        workType: `Part Time`,
        location: `Melbourne`,
        listed: `${Math.floor(Math.random() * 30)} days ago`,
        source: 'Indeed',
      });
    }
  }

  return jobs;
};