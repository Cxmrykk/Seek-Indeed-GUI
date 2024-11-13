import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import JobSearch from './components/JobSearch';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <JobSearch />
        </ThemeProvider>
    );
};

const container = document.getElementById('root');
if (container) {  // Check if container exists
    const root = createRoot(container);
    root.render(<App />);
}