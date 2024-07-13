import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

<<<<<<< HEAD
=======
import { trpcClient } from '../../services/trpc';

>>>>>>> 1501625 (fix correct import statements for trpc services)
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

<<<<<<< HEAD
=======
  trpcClient.user.getUsers.query().then((data) => console.log(data));

>>>>>>> 1501625 (fix correct import statements for trpc services)
  return (
    <Container>
      <Divider className={styles.container} />
      <Typography variant="h1" className={styles.welcomeMessage}>
        Welcome to the journey mate!
      </Typography>
      <Typography variant="h2" className={styles.subMessage}>
        Here you can find people for your trip!
      </Typography>

      <Box className={styles.searchBar}>
        <Button variant="contained" color="primary" className={styles.createJourneyButton}>
          Create New Journey
        </Button>
      </Box>

      <Box className={styles.searchContainer}>
        <Box className={styles.searchInput}>
          <FormControl fullWidth>
            <Input
              placeholder="Шукай свою подорож"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              disableUnderline
              className={styles.inputField}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <InputLabel>Тип події</InputLabel>
          <Select value={filterType} onChange={handleFilterChange} displayEmpty disableUnderline>
            <MenuItem value="guided-group-trip">Guided Group Trip</MenuItem>
            <MenuItem value="photography-trip">Photography Trip</MenuItem>
            <MenuItem value="fitness-training-trip">Fitness and Training Trip</MenuItem>
            <MenuItem value="family-friendly-trip">Family-Friendly Trip</MenuItem>
            <MenuItem value="adventure-extreme-trip">Adventure and Extreme Trip</MenuItem>
            <MenuItem value="accessible-inclusive-trip">Accessible and Inclusive Trip</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className={styles.gallery}>
        <Typography variant="body1">Gallery will be displayed here.</Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
