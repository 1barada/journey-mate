import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import { trpcClient } from '../../services/trpc';

import { JourneyDetails } from './JourneyDetails';

const JourneyPage = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<JourneyDetails | null>(null);

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

  return <div>{journey && <AboutPageInfo info={journey.title} />}</div>;
};

export default JourneyPage;
