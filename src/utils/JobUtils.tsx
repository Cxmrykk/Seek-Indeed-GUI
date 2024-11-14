export interface Job {
  id: string;
  title: string;
  company: string;
  workType: string;
  location: string;
  listed: string;
  source: string;
  url?: string;
}

export const fetchSeekJobs = async (seekUrl: string, numPages: number): Promise<Job[]> => {
  return window.electron.fetchSeekJobs(seekUrl, numPages);
};

export const fetchIndeedJobs = async (indeedUrl: string, numPages: number): Promise<Job[]> => {
  return window.electron.fetchIndeedJobs(indeedUrl, numPages);
};