import { useMemo, useState } from 'react';

import { journeyActions, journeySelectors } from '../../store/journey/slice';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';

import type { JoinJourneyModalProps } from './types';

// ! Remove later
const mockMilestones = [
  {
    location:
      'London is the capital if Great Britain London is the capital if great briatin London is the capital if great briatin',
    date: '12.05.2025',
  },
  { location: 'Derby', date: '12.05.2025' },
  { location: 'Manchester', date: '12.05.2025' },
  { location: 'Glazgo', date: '12.05.2025' },
];

export const useJoinJourneyModal = ({ milestones = mockMilestones, toggleModal }: JoinJourneyModalProps) => {
  const [selectedMilestones, setSelectedMilestone] = useState<string[]>([]);

  const request = useAppSelector(journeySelectors.selectRequestState);
  const dispatch = useAppDispatch();

  const allMilestones = useMemo(() => milestones.map((m) => m.location), [milestones]);
  const areAllMilestonesSelected = selectedMilestones.length === milestones.length;
  const areSomeMilestonesSelected = selectedMilestones.length > 0 && !areAllMilestonesSelected;
  const isSubmitButtonDisabled = request.isLoading || !areAllMilestonesSelected;
  const isSelectAllDisabled = request.isLoading;

  const onSelectAll = () => {
    const newMilestones = areAllMilestonesSelected ? [] : allMilestones;

    setSelectedMilestone(newMilestones);
  };

  const onJoinJourney = () => {
    dispatch(journeyActions.joinJourney());
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
