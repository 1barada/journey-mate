import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
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
import { JourneyOrganizerInfo } from '../../components/JourneyOrganizerInfo';
import { trpcClient } from '../../services/trpc';
import type { Milestone } from '../../store/journey/types';

import type { Coordinates, JourneyDetails, Organizer } from './JourneyDetails';
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
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const chatId = 1;

  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchJourney = await trpcClient.journey.getJourneyById.query({ id: Number(journeyId) });
      const categories = await trpcClient.journey.getCategories.query();
      const JourneyCategory = await trpcClient.journey.getCategoriesByJourneyId.query({
        id: Number(fetchJourney.id),
        categories,
      });
      const fetchOrganizer = await trpcClient.user.getUser.query({ id: Number(fetchJourney.userId) });

      const organizerInfo = {
        id: fetchJourney.id,
        name: fetchOrganizer.name,
        avatarUrl: fetchOrganizer.avatarUrl,
      };

      const journeyData = {
        ...fetchJourney,
        milestones: fetchJourney.milestones.map((milestone) => ({
          ...milestone,
          dates: convertDatesToDayjs(milestone.dates),
        })),
        ...JourneyCategory,
      };

      setJourney(journeyData);
      setOrganizer(organizerInfo);
      setCoordinates(extractCoordinates(journeyData.milestones));
    };

    fetchJourneys();
  }, []);

  const handleJoinToJourney = () => {
    console.log('handleJoinToJourney');
  };

  return (
    <>
      {journey && organizer && (
        <>
          <AboutPageInfo info={journey.title} />
          <Container className={styles.journeyWrapper}>
            <Box className={styles.journeyHeader}>
              <CategoriesTagList categories={journey.categories} />
              <Button
                onClick={handleJoinToJourney}
                variant="contained"
                color="primary"
                className={styles.joinJourneyButton}
              >
                Join
              </Button>
            </Box>
            <Box className={styles.jorneyInfoWrapper}>
              <Box className={styles.jorneyMainInfo}>
                <JourneyOrganizerInfo organaizer={organizer} />
                <Box className={styles.milestonesList}>
                  <JourneyMilestoneList milestones={journey.milestones} />
                </Box>
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
