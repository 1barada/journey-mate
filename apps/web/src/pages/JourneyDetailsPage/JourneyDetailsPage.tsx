import React, { useEffect, useState } from 'react';
import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import JourneyChat from '../../components/JourneyChat';
import { CardDescription } from '../../components/CardDescription';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../types/reduxTypes';
import { journeySelectors } from '../../store/journey/slice';
import { trpcClient } from '../../services/trpc';
import { JourneyCardProps } from '../../components/common/JourneyCard/JourneyCard.types';

const JourneyDetailsPage = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<JourneyCardProps | null>(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchedJourney = await trpcClient.journey.getJourneyById.query({ id: Number(journeyId) });
      console.log(fetchedJourney, 'SINGLE');
    };

    fetchJourneys();
  }, []);

  return (
    <>
      <h1>jORNEY</h1>
    </>
  );
};

export default JourneyDetailsPage;
