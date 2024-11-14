import { SeekJob } from "./Seek";
import { IndeedJob } from "./Indeed";

export const fetchSeekJobs = async (seekUrl: string, numPages: number): Promise<SeekJob[]> => {
  return window.electron.fetchSeekJobs(seekUrl, numPages);
};

export const fetchIndeedJobs = async (indeedUrl: string, numPages: number): Promise<IndeedJob[]> => {
  return window.electron.fetchIndeedJobs(indeedUrl, numPages);
};