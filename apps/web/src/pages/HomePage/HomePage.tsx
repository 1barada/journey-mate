import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FilterBar } from '../../components/common/FilterBar';
import { JourneyCard } from '../../components/common/JourneyCard/index';
import { JourneyCardProps, Status } from '../../components/common/JourneyCard/JourneyCard.types';
import { trpcClient } from '../../services/trpc';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<string>(new Date().toString());
  const navigate = useNavigate();

  const handleCreateNewJourney = () => {
    navigate('/journey/new');
  };

  const [journeys, setJourneys] = useState<JourneyCardProps[]>([]);
  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchedJourneys = await trpcClient.journey.getJourneys.query({
        searchQuery: searchQuery,
        category: category,
        date: date,
      });
      const transformedJourneys: JourneyCardProps[] = fetchedJourneys.map((journey) => ({
        id: journey.id,
        description: journey.description,
        header: journey.title,
        startDate: journey.milestones[0].dates[0], // Assuming the first milestone's start date as the journey date
        endDate: journey.milestones[journey.milestones.length - 1].dates[1] || '', // Assuming the last milestone's end date as the journey
        personCount: journey.participantsNumber,
        journeyType: journey.category[0].title,
        onClickHandler: () => console.log('Journey clicked'),
        coordinates: journey.milestones.map((milestone) => milestone.coords),
      }));

      setJourneys(transformedJourneys);
    };

    fetchJourneys();
  }, [searchQuery, category, date]);

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

      <Box className={styles.gallery}>
        {journeys.map((journey) => (
          <JourneyCard key={journey.id} {...journey} />
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
