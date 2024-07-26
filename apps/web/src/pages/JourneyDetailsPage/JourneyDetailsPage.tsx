import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import dayjs, { Dayjs } from 'dayjs';

import { CardDescription } from '../../components/CardDescription';
import CategoriesTagList from '../../components/CategoriesTagList';
import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import { Map } from '../../components/common/Map';
import { MapWrapper } from '../../components/common/MapWrapper';
import JourneyChat from '../../components/JourneyChat';
import { JourneyMilestoneList } from '../../components/JourneyMilestoneList';
import { trpcClient } from '../../services/trpc';
import type { Milestone } from '../../store/journey/types';

import type { Coordinates, JourneyDetails } from './JourneyDetails';
import styles from './JourneyDetailsPage.module.scss';

const convertDatesToDayjs = (dates: string[]): Dayjs[] => {
  return dates.map((dateStr) => dayjs(dateStr));
};

const extractCoordinates = (milestones: Milestone[]): Coordinates[] => {
  return milestones.map((milestone) => milestone.coords);
};

const JourneyPage = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<JourneyDetails | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const chatId = 1;

  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchJourney = await trpcClient.journey.getJourneyById.query({ id: Number(journeyId) });
      const categories = await trpcClient.journey.getCategories.query();
      const JourneyCategory = await trpcClient.journey.getCategoriesByJourneyId.query({
        id: Number(fetchJourney.id),
        categories,
      });

      const journeyData = {
        ...fetchJourney,
        milestones: fetchJourney.milestones.map((milestone) => ({
          ...milestone,
          dates: convertDatesToDayjs(milestone.dates),
        })),
        ...JourneyCategory,
      };

      setJourney(journeyData);
      setCoordinates(extractCoordinates(journeyData.milestones));
    };

    fetchJourneys();
  }, []);

  return (
    <>
      {journey && (
        <>
          <AboutPageInfo info={journey.title} />
          <Container className={styles.journeyWrapper}>
            <CategoriesTagList categories={journey.categories} />
            <Box className={styles.jorneyInfoWrapper}>
              <Box className={styles.jorneyMainInfo}>
                <JourneyMilestoneList milestones={journey.milestones} />
              </Box>
              <MapWrapper>
                <Map width="100%" height="50vh" coordinates={coordinates} />
              </MapWrapper>
            </Box>
            <JourneyChat chatId={chatId} />
            <CardDescription description={journey.description || ''} title="Опис" />
          </Container>
        </>
      )}
    </>
  );
};

export default JourneyPage;
