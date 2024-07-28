import { useMemo, useState } from 'react';

import { ParticipantMilestones } from '../../pages/JourneyDetailsPage/JourneyDetails';
import { journeyActions, journeySelectors } from '../../store/journey/slice';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';

import type { JoinJourneyModalProps } from './types';

// ! Remove later
const mockMilestones = [
  {
    id: performance.now(),
    title:
      'London is the capital if Great Britain London is the capital if great briatin London is the capital if great briatin',
    coords: {
      lat: 100,
      lng: 80,
    },
    dates: [new Date('12.05.2025').getTime()],
  },
  {
    id: performance.now(),
    title: 'Derby',
    dates: [new Date('12.05.2026').getTime()],
    coords: {
      lat: 150,
      lng: 30,
    },
  },
];

export const useJoinJourneyModal = ({
  milestones = mockMilestones,
  toggleModal,
  onJoinHandler,
}: JoinJourneyModalProps) => {
  const [selectedMilestones, setSelectedMilestone] = useState<string[]>([]);

  const request = useAppSelector(journeySelectors.selectRequestState);
  const dispatch = useAppDispatch();

  const allMilestones = useMemo(() => milestones.map((m) => m.title), [milestones]);
  const areAllMilestonesSelected = selectedMilestones.length === milestones.length;
  const areSomeMilestonesSelected = selectedMilestones.length > 0;
  const isSubmitButtonDisabled = request.isLoading || !areSomeMilestonesSelected;
  const isSelectAllDisabled = request.isLoading;

  const onSelectAll = () => {
    const newMilestones = areAllMilestonesSelected ? [] : allMilestones;

    setSelectedMilestone(newMilestones);
  };

  const onJoinJourney = async () => {
    const result = milestones.filter((milestone) => selectedMilestones.includes(milestone.title));

    const milestoneIds = result.map((milestone) => milestone.id);

    const participantMilestones = await dispatch(journeyActions.joinJourney(milestoneIds));
    if (participantMilestones.type === 'journey/joinJourney/fulfilled') {
      const payload = participantMilestones.payload as ParticipantMilestones;
      if (payload && onJoinHandler) {
        onJoinHandler(payload);
      }
    }

    onToggleModal();
  };

  const onToggleModal = () => {
    if (request.isLoading) return;

    toggleModal();
  };

  return {
    onSelectAll,
    onSelectOne: setSelectedMilestone,
    onJoinJourney,
    onToggleModal,
    selectedMilestones,
    areSomeMilestonesSelected,
    areAllMilestonesSelected,
    isSubmitButtonDisabled,
    isSelectAllDisabled,
    request,
    milestones,
  };
};
