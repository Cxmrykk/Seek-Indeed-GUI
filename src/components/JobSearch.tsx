import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    CircularProgress,
    Typography,
} from '@mui/material';
import { Job, fetchSeekJobs, fetchIndeedJobs } from '../utils/JobUtils';

interface JobSearchProps { }

const JobSearch: React.FC<JobSearchProps> = () => {
    const [seekUrl, setSeekUrl] = useState('');
    const [indeedUrl, setIndeedUrl] = useState('');
    const [numPages, setNumPages] = useState(30);
    const [seekJobs, setSeekJobs] = useState<Job[]>([]);
    const [indeedJobs, setIndeedJobs] = useState<Job[]>([]);
    const [seekLoading, setSeekLoading] = useState(false);
    const [indeedLoading, setIndeedLoading] = useState(false);
    const [seekError, setSeekError] = useState<string | null>(null);
    const [indeedError, setIndeedError] = useState<string | null>(null);
    const [seekFilterText, setSeekFilterText] = useState('');
    const [indeedFilterText, setIndeedFilterText] = useState('');


    const handleSeekSearch = async () => {
        setSeekLoading(true);
        setSeekError(null);
        try {
            const fetchedJobs = await fetchSeekJobs(seekUrl, numPages);
            setSeekJobs(fetchedJobs);
        } catch (err: any) {
            setSeekError(err.message);
        } finally {
            setSeekLoading(false);
        }
    };

    const handleIndeedSearch = async () => {
        setIndeedLoading(true);
        setIndeedError(null);
        try {
            const fetchedJobs = await fetchIndeedJobs(indeedUrl, numPages);
            setIndeedJobs(fetchedJobs);
        } catch (err: any) {
            setIndeedError(err.message);
        } finally {
            setIndeedLoading(false);
        }
    };

    const filteredSeekJobs = seekJobs.filter((job) =>
        job.title.toLowerCase().includes(seekFilterText.toLowerCase())
    );

    const filteredIndeedJobs = indeedJobs.filter((job) =>
        job.title.toLowerCase().includes(indeedFilterText.toLowerCase())
    );


    const renderJobTable = (jobs: Job[], filterText: string, setFilterText: (text: string) => void, loading: boolean, error: string | null, title: string) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>{title}</Typography>
            <TextField
                label="Filter"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                fullWidth
                margin="normal"
            />
            {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
            {error && <Typography color="error" sx={{ marginTop: '10px' }}>{error}</Typography>}
            <TableContainer component={Paper} sx={{ flexGrow: 1, marginTop: '20px', overflowY: 'auto' }}>
                <Table stickyHeader aria-label="job results">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Work Type</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Listed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.filter((job) => job.title.toLowerCase().includes(filterText.toLowerCase())).map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.workType}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.listed}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 40px)', padding: '20px' }}>
            <Box sx={{ display: 'flex', width: '50%', flexDirection: 'column', pr: 1 }}>
                <TextField
                    label="Seek URL"
                    value={seekUrl}
                    onChange={(e) => setSeekUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Number of Pages"
                    type="number"
                    value={numPages}
                    onChange={(e) => setNumPages(parseInt(e.target.value, 10))}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSeekSearch} disabled={seekLoading} sx={{ marginTop: '10px' }}>
                    Search Seek
                </Button>
                <Box sx={{ flexGrow: 1, mt: 2, overflow: 'hidden' }}>
                    {renderJobTable(filteredSeekJobs, seekFilterText, setSeekFilterText, seekLoading, seekError, "Seek Results")}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '50%', flexDirection: 'column', pl: 1 }}>
                <TextField
                    label="Indeed URL"
                    value={indeedUrl}
                    onChange={(e) => setIndeedUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Number of Pages"
                    type="number"
                    value={numPages}
                    onChange={(e) => setNumPages(parseInt(e.target.value, 10))}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleIndeedSearch} disabled={indeedLoading} sx={{ marginTop: '10px' }}>
                    Search Indeed
                </Button>
                <Box sx={{ flexGrow: 1, mt: 2, overflow: 'hidden' }}>
                    {renderJobTable(filteredIndeedJobs, indeedFilterText, setIndeedFilterText, indeedLoading, indeedError, "Indeed Results")}
                </Box>
            </Box>
        </Box>
    );
};

export default JobSearch;