import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import { JourneyStatus } from '@prisma/client';
import dayjs, { Dayjs } from 'dayjs';

import { CardDescription } from '../../components/CardDescription';
import CategoriesTagList from '../../components/CategoriesTagList';
import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import { Map } from '../../components/common/Map';
import { MapWrapper } from '../../components/common/MapWrapper';
import { JoinJourneyModal } from '../../components/JoinJourneyModal';
import JourneyChat from '../../components/JourneyChat';
import { JourneyMilestoneList } from '../../components/JourneyMilestoneList';
import { JourneyOrganizerInfo } from '../../components/JourneyOrganizerInfo';
import { useModal } from '../../hooks/useModal';
import { trpcClient } from '../../services/trpc';
import { selectUser } from '../../store/auth/slice';
import { whoami } from '../../store/auth/slice';
import { AuthSlice, User } from '../../store/auth/types';
import type { Milestone } from '../../store/journey/types';
import { useAppSelector } from '../../types/reduxTypes';
import { useAppDispatch } from '../../types/reduxTypes';

import type { Coordinates, JourneyDetails, Organizer, ParticipantMilestones } from './JourneyDetails';
import styles from './JourneyDetailsPage.module.scss';

const convertDatesToDayjs = (dates: string[]): Dayjs[] => {
  return dates.map((dateStr) => dayjs(dateStr));
};

const extractCoordinates = (milestones: Milestone[]): Coordinates[] => {
  return milestones.map((milestone) => milestone.coords);
};

const JourneyPage = () => {
  const user = useAppSelector(selectUser);
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<JourneyDetails | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [isOpen, toggle] = useModal({ isLoading: false });
  const [participantMilestones, setParticipantMilestones] = useState<ParticipantMilestones[] | null>();

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
        id: fetchJourney.userId,
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

    const fetchJourneyParticipants = async () => {
      const fetchJourneyParticipants = await trpcClient.journey.getJourneyParticipants.query({ id: Number(journeyId) });

      const result = fetchJourneyParticipants?.map((participant) => ({
        participantId: participant.participantId,
        milestones: participant.milestones.map((milestone) => ({
          ...milestone,
          dates: convertDatesToDayjs(milestone.dates),
        })),
      }));

      setParticipantMilestones(result);
    };

    fetchJourneys();
    fetchJourneyParticipants();
  }, []);

  const dispatch = useAppDispatch();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dispatch(whoami());

      if (response.type === 'auth/whoami/fulfilled') {
        const userPayload = response.payload as AuthSlice;
        const user = userPayload.user as User;
        setCurrentUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  const overdueJourney = () => {
    if (!journey) {
      return false;
    }

    const milestones = journey.milestones[journey.milestones.length - 1];
    const date = milestones.dates[milestones.dates.length - 1];

    return dayjs().isAfter(date);
  };

  const showJoinButton = () => {
    const currentUserAlreadySendJoinRequest = participantMilestones?.some((participant: ParticipantMilestones) => {
      return (
        participant.participantId === user?.id &&
        participant.milestones.some((milestone) => milestone.status != JourneyStatus.mainJourneyMilestone)
      );
    });

    return (
      journey &&
      currentUserId &&
      currentUserId !== journey.userId &&
      !overdueJourney() &&
      !currentUserAlreadySendJoinRequest
    );
  };

  const joinHandler = (participantMilestones: ParticipantMilestones) => {
    setParticipantMilestones([participantMilestones]);
  };

  const currentUserJoinRequestStatus = () => {
    const participantMilestone = participantMilestones?.find((participant) => {
      return participant.participantId === user?.id;
    });

    if (!participantMilestone) {
      return null;
    }

    switch (participantMilestone.milestones[0].status) {
      case JourneyStatus.requestedToJoinMilestone:
        return { color: 'primary' as const, label: 'Request is waiting for approval' };
      case JourneyStatus.approvedJoinMilestone:
        return { color: 'success' as const, label: 'Congratulations! Your request is approved' };
      case JourneyStatus.declinedJoinMilestone:
        return { color: 'error' as const, label: 'Unfortunately, your request is rejected' };
      default:
        return null;
    }
  };

  return (
    <>
      {journey && organizer && (
        <Box>
          <AboutPageInfo info={journey.title} />
          <Container className={styles.journeyWrapper}>
            <Box className={styles.journeyHeader}>
              <CategoriesTagList categories={journey.categories} />
              {showJoinButton() && (
                <Button onClick={toggle} variant="contained" color="primary" className={styles.joinJourneyButton}>
                  Join
                </Button>
              )}
              {!showJoinButton() && currentUserJoinRequestStatus() && (
                <Chip label={currentUserJoinRequestStatus()?.label} color={currentUserJoinRequestStatus()?.color} />
              )}
            </Box>
            <Box className={styles.jorneyInfoWrapper}>
              <Box className={styles.jorneyMainInfo}>
                <JourneyOrganizerInfo organaizer={organizer} />
                <Box className={styles.milestonesList}>
                  <JourneyMilestoneList milestones={journey.milestones} />
                </Box>
              </Box>
              <MapWrapper>
                <Map width="100%" height="460px" coordinates={coordinates} />
              </MapWrapper>
            </Box>
            <CardDescription description={journey.description || ''} title="Description" />
            {journey.chatId && <JourneyChat chatId={journey.chatId} />}
          </Container>
        </Box>
      )}
      {isOpen && journey && (
        <JoinJourneyModal onJoinHandler={joinHandler} toggleModal={toggle} milestones={journey.milestones} />
      )}
    </>
  );
};

export default JourneyPage;
