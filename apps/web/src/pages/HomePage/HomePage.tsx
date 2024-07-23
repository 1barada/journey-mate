import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { JourneyCard } from '../../components/common/JourneyCard/index';
import { JourneyCardProps, Status } from '../../components/common/JourneyCard/JourneyCard.types';
import { trpcClient } from '../../services/trpc';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

  const handleCreateNewJourney = () => {
    navigate('/journey/new');
  };

  const [journeys, setJourneys] = useState<JourneyCardProps[]>([]);
  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchedJourneys = await trpcClient.journey.getJourneys.query();
      const transformedJourneys: JourneyCardProps[] = fetchedJourneys.map((journey) => ({
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
  }, []);

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
        {journeys.map((journey, index) => (
          <JourneyCard key={index} {...journey} />
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
