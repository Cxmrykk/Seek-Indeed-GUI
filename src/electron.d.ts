interface Window {
  electron: {
      fetchSeekJobs: (seekUrl: string, numPages: number) => Promise<import('./utils/JobUtils').Job[]>;
      fetchIndeedJobs: (indeedUrl: string, numPages: number) => Promise<import('./utils/JobUtils').Job[]>;
      openExternal: (url: string) => Promise<void>;
  };
}