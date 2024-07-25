import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { FilterBar } from '../../components/common/FilterBar';
import { JourneyCardList } from '../../components/common/JourneyCardList';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<string>(new Date().toDateString());
  const navigate = useNavigate();

  const handleCreateNewJourney = () => {
    navigate('/journey/new');
  };

  const handleSearchQueryChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleDateChange = (date: string) => {
    setDate(date);
  };

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
        <Button
          onClick={handleCreateNewJourney}
          variant="contained"
          color="primary"
          className={styles.createJourneyButton}
        >
          Create New Journey
        </Button>
      </Box>

      <FilterBar
        onSearchQueryChangeHandler={handleSearchQueryChange}
        onCategoryChangeHandler={handleCategoryChange}
        onDateChangeHandler={handleDateChange}
        sinceDate={new Date()}
      />

      <JourneyCardList searchQuery={searchQuery} category={category} date={date} showAll={true} />
    </Container>
  );
};

export default HomePage;
