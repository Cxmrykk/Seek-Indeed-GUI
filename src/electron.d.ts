interface Window {
  electron: {
    fetchJobs: (seekUrl: string, indeedUrl: string, numPages: number) => Promise<import('./utils/JobUtils').Job[]>;
  };
}