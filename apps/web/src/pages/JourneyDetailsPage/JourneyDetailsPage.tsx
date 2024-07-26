import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { CardDescription } from '../../components/CardDescription';
import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import JourneyChat from '../../components/JourneyChat';
import { trpcClient } from '../../services/trpc';

import { JourneyDetails } from './JourneyDetails';
import styles from './JourneyDetailsPage.module.scss';

const JourneyPage = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<JourneyDetails | null>(null);
  const chatId = 1;

  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchJourney = await trpcClient.journey.getJourneyById.query({ id: Number(journeyId) });
      const categories = await trpcClient.journey.getCategories.query();
      const JourneyCategory = await trpcClient.journey.getCategoriesByJourneyId.query({
        id: Number(fetchJourney.id),
        categories,
      });

      const updatedMilestones = fetchJourney.milestones.map((milestone) => ({
        ...milestone,
        dates: milestone.dates,
      }));

      setJourney({ ...fetchJourney, ...JourneyCategory, milestones: updatedMilestones });
    };
    fetchJourneys();
  }, []);

  return (
    <>
      {journey && (
        <>
          <AboutPageInfo info={journey.title} />
          <Container className={styles.journeyWrapper}>
            <Box>{/* <JourneyMilestoneList milestones={journey.milestones} /> */}</Box>
            <JourneyChat chatId={chatId} />
            <CardDescription description={journey.description || ''} title="Опис" />
          </Container>
        </>
      )}
    </>
  );
};

export default JourneyPage;
