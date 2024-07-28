import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import { FilterBar } from '../../components/common/FilterBar';
import { JourneyCardList } from '../../components/common/JourneyCardList';

import styles from './JourneysPage.module.scss';

const JourneysPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<string>(new Date().toDateString());

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
    <>
      <AboutPageInfo info="Your journeys" buttons={[{ link: '/journey/new', text: 'Create new' }]} />

      <Container className={styles.container}>
        <Box component="div" className={styles.cardsWrapper}>
          <FilterBar
            onSearchQueryChangeHandler={handleSearchQueryChange}
            onCategoryChangeHandler={handleCategoryChange}
            onDateChangeHandler={handleDateChange}
          />

          <JourneyCardList searchQuery={searchQuery} category={category} date={date} />
        </Box>
      </Container>
    </>
  );
};

export default JourneysPage;
