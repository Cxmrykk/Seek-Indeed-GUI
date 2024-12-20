import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Typography,
    Tabs,
    Tab,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SeekJob } from '../utils/Seek';
import { IndeedJob } from '../utils/Indeed';
import { fetchSeekJobs, fetchIndeedJobs } from '../utils/JobUtils';

interface JobSearchProps { }

type SeekJobDisplay = {
    id: string,
    title: string,
    company: string,
    workTypes: string,
    locations: string,
    listingDate: Date
}

type IndeedJobDisplay = {
    id: string,
    title: string,
    company: string,
    workType: string,
    location: string,
    createDate: Date
}

const seekColumns: GridColDef[] = [
    { field: 'title', headerName: 'Job', minWidth: 360 },
    { field: 'company', headerName: 'Company', minWidth: 240 },
    { field: 'workTypes', headerName: 'Type', minWidth: 180 },
    { field: 'locations', headerName: 'Location', minWidth: 180 },
    { field: 'listingDate', headerName: 'Date', type: 'dateTime', minWidth: 240 },
];

const indeedColumns: GridColDef[] = [
    { field: 'title', headerName: 'Job', minWidth: 360 },
    { field: 'company', headerName: 'Company', minWidth: 240 },
    { field: 'workType', headerName: 'Type', minWidth: 180 },
    { field: 'location', headerName: 'Location', minWidth: 180 },
    { field: 'createDate', headerName: 'Date', type: 'dateTime', minWidth: 240 },
];


const formatSeekJob: (job: SeekJob) => SeekJobDisplay = (job) => {
    return {
        id: job.id,
        url: job.url,
        title: job.title,
        company: job.advertiser.description,
        workTypes: job.workTypes.join(", "),
        locations: job.locations.map(i => i.label).join(", "),
        listingDate: new Date(job.listingDate)
    };
};

const formatIndeedJob: (job: IndeedJob) => IndeedJobDisplay = (job) => {
    return {
        id: job.jobkey,
        url: job.url,
        title: job.title,
        company: job.company,
        workType: job.jobTypes.join(", "),
        location: job.jobLocationCity + ", " + job.jobLocationState,
        createDate: new Date(job.createDate)
    };
};

const paginationModel = { page: 0, pageSize: 15 };

const JobSearch: React.FC<JobSearchProps> = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [seekUrl, setSeekUrl] = useState('');
    const [indeedUrl, setIndeedUrl] = useState('');
    const [numPages, setNumPages] = useState(30);
    const [seekJobs, setSeekJobs] = useState<SeekJobDisplay[]>([]);
    const [indeedJobs, setIndeedJobs] = useState<IndeedJobDisplay[]>([]);
    const [seekLoading, setSeekLoading] = useState(false);
    const [indeedLoading, setIndeedLoading] = useState(false);
    const [seekError, setSeekError] = useState<string | null>(null);
    const [indeedError, setIndeedError] = useState<string | null>(null);

    const handleSeekSearch = async () => {
        setSeekLoading(true);
        setSeekError(null);
        try {
            const fetchedJobs = await fetchSeekJobs(seekUrl, numPages);
            // Filter duplicate entries
            const jobSet = new Set<string>();
            const jobsFormatted = fetchedJobs
                .map(job => formatSeekJob(job))
                .filter(job => {
                    if (jobSet.has(job.id)) {
                        return false;
                    }

                    jobSet.add(job.id);
                    return true;
                });

            setSeekJobs(jobsFormatted);
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
            const jobSet = new Set<string>();
            const jobsFormatted = fetchedJobs
                .map(job => formatIndeedJob(job))
                .filter(job => {
                    if (jobSet.has(job.id)) {
                        return false;
                    }

                    jobSet.add(job.id);
                    return true;
                });
            setIndeedJobs(jobsFormatted);
        } catch (err: any) {
            setIndeedError(err.message);
        } finally {
            setIndeedLoading(false);
        }
    };

    const renderJobTable = (columns: GridColDef[], rows: object[], loading: boolean, error: string | null) => {
        const handleRowDoubleClick = (params: any) => {
            if (params.row.url) {
                window.electron.openExternal(params.row.url);
            }
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
                {error && <Typography color="error" sx={{ marginTop: '10px' }}>{error}</Typography>}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 15]}
                    sx={{ border: 0 }}
                    onRowDoubleClick={handleRowDoubleClick}
                    disableRowSelectionOnClick={true}
                />
            </Box>
        );
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', padding: '20px' }}>
            <Tabs value={currentTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="Seek" />
                <Tab label="Indeed" />
            </Tabs>

            {currentTab === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        <TextField
                            label="Seek URL"
                            value={seekUrl}
                            onChange={(e) => setSeekUrl(e.target.value)}
                            sx={{ flex: 2 }}
                        />
                        <TextField
                            label="Number of Pages"
                            type="number"
                            value={numPages}
                            onChange={(e) => setNumPages(parseInt(e.target.value, 10))}
                            sx={{ flex: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSeekSearch}
                            disabled={seekLoading}
                            sx={{
                                flex: 1,
                                height: 56,
                                mt: '0px'
                            }}
                        >
                            Search Seek
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, mt: 2, overflow: 'hidden' }}>
                        {renderJobTable(seekColumns, seekJobs, seekLoading, seekError)}
                    </Box>
                </Box>
            )}

            {currentTab === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        <TextField
                            label="Indeed URL"
                            value={indeedUrl}
                            onChange={(e) => setIndeedUrl(e.target.value)}
                            sx={{ flex: 2 }}
                        />
                        <TextField
                            label="Number of Pages"
                            type="number"
                            value={numPages}
                            onChange={(e) => setNumPages(parseInt(e.target.value, 10))}
                            sx={{ flex: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleIndeedSearch}
                            disabled={indeedLoading}
                            sx={{
                                flex: 1,
                                height: 56,
                                mt: '0px'
                            }}
                        >
                            Search Indeed
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, mt: 2, overflow: 'hidden' }}>
                        {renderJobTable(indeedColumns, indeedJobs, indeedLoading, indeedError)}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default JobSearch;