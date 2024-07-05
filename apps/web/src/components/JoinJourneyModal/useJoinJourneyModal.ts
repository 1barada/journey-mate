import { useMemo, useState } from 'react';

import type { JoinJourneyModalProps } from './types';

type UseJoinJourneyModalProps = Required<Pick<JoinJourneyModalProps, 'milestones'>>;

export const useJoinJourneyModal = ({ milestones }: UseJoinJourneyModalProps) => {
  const [selectedMilestones, setSelectedMilestone] = useState<string[]>([]);

  const allMilestones = useMemo(() => milestones.map((m) => m.location), [milestones]);
  const areAllMilestonesSelected = selectedMilestones.length === milestones.length;
  const areSomeMilestonesSelected = selectedMilestones.length > 0 && !areAllMilestonesSelected;

  const onSelectAll = () => {
    const newMilestones = areAllMilestonesSelected ? [] : allMilestones;

    setSelectedMilestone(newMilestones);
  };

  return {
    onSelectAll,
    onSelectOne: setSelectedMilestone,
    selectedMilestones,
    areSomeMilestonesSelected,
    areAllMilestonesSelected,
  };
};
