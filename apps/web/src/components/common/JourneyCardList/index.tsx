import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import { trpcClient } from '../../../services/trpc';
import { JourneyCard } from '../JourneyCard';
import { JourneyCardProps, Status } from '../JourneyCard/JourneyCard.types';
import { Pagination } from '../Pagination';

import styles from './JourneyCardList.module.scss';
import { JourneyCardListProps } from './JourneyCardList.types';

export const JourneyCardList: React.FC<JourneyCardListProps> = ({ searchQuery, category, date, showAll = false }) => {
  const [journeys, setJourneys] = useState<JourneyCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchJourneys = async () => {
      const { user } = showAll ? { user: null } : await trpcClient.user.whoami.query();

      const fetchedJourneys = await trpcClient.journey.getJourneys.query({
        searchQuery: searchQuery,
        category: category,
        date: date,
        page: currentPage,
        user_id: user?.id,
      });
      console.log(fetchedJourneys);
      const transformedJourneys: JourneyCardProps[] = fetchedJourneys.journeys.map((journey) => ({
        id: journey.id,
        description: journey.description,
        header: journey.title,
        startDate: journey.milestones[0].dates[0], // Assuming the first milestone's start date as the journey date
        endDate: journey.milestones[journey.milestones.length - 1].dates[1] || '', // Assuming the last milestone's end date as the journey
        personCount: journey.participantsNumber,
        journeyType: journey.category[0].title,
        onClickHandler: () => {
          navigate(`/journeys/${journey.id}`);
        },
        coordinates: journey.milestones.map((milestone) => milestone.coords),
      }));

      setTotalPages(fetchedJourneys.totalPages || 1);
      setJourneys(transformedJourneys);
    };

    fetchJourneys();
  }, [searchQuery, category, date, currentPage]);

  return (
    <Box>
      <Box className={styles.gallery}>
        {journeys.map((journey) => (
          <JourneyCard key={journey.id} {...journey} />
        ))}
      </Box>

      <Pagination totalPages={totalPages} currentPage={currentPage} onChange={handlePageChange} />
    </Box>
  );
};
