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
import { Job, fetchJobs } from '../utils/JobUtils';

interface JobSearchProps { }

const JobSearch: React.FC<JobSearchProps> = () => {
    const [seekUrl, setSeekUrl] = useState('');
    const [indeedUrl, setIndeedUrl] = useState('');
    const [numPages, setNumPages] = useState(30);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filterText, setFilterText] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedJobs = await fetchJobs(seekUrl, indeedUrl, numPages);
            setJobs(fetchedJobs);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <TextField
                label="Seek URL"
                value={seekUrl}
                onChange={(e) => setSeekUrl(e.target.value)}
                fullWidth
                margin="normal"
            />
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
            <Button variant="contained" onClick={handleSearch} disabled={loading} sx={{ marginTop: '10px' }}>
                Search
            </Button>

            {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
            {error && <Typography color="error" sx={{ marginTop: '10px' }}>{error}</Typography>}

            <TextField
                label="Filter"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ marginTop: '20px' }}
            />

            <TableContainer component={Paper} sx={{ width: '100%', marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                <Table stickyHeader aria-label="job results">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Work Type</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Listed</TableCell>
                            <TableCell>Source</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.workType}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.listed}</TableCell>
                                <TableCell>{job.source}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default JobSearch;