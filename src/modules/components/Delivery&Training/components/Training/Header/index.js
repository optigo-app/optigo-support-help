import {
    Box,
} from '@mui/material';
import Dashboard from './Dashboard';
import FilterBar from './FilterBar';
import { useGreeting } from './../../../hooks/useGreeting';
import { useAuth } from '../../../context/AuthProvider';
const HeroHeader = ({ onToggle = () => { }, Traininglist = [], filters = {}, initialFilters = {}, setFilters = () => { }, isAdmin = false }) => {
    return (
        <Box >
            <Dashboard filters={filters} Data={Traininglist} />
            <FilterBar filters={filters} initialFilters={initialFilters} setFilters={setFilters} />
        </Box>
    );
};

export default HeroHeader;
