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

export const fetchJobs = async (
  seekUrl: string,
  indeedUrl: string,
  numPages: number
): Promise<Job[]> => {
  return window.electron.fetchJobs(seekUrl, indeedUrl, numPages);
};