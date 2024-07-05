import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import './styles.scss';

import { Modal } from '../common/Modal';
import { JourneyMilestoneList } from '../JourneyMilestoneList';
import { JourneyMilestoneToggle, JourneyMilestoneToggleItem } from '../JourneyMilestoneToggle';

import type { JoinJourneyModalProps } from './types';
import { useJoinJourneyModal } from './useJoinJourneyModal';

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

export const JoinJourneyModal: React.FC<JoinJourneyModalProps> = ({ milestones = mockMilestones, ...props }) => {
  const modal = useJoinJourneyModal({ milestones });

  const { onSelectOne, onSelectAll, areAllMilestonesSelected, areSomeMilestonesSelected, selectedMilestones } = modal;

  return (
    <Modal title="Select points to join" {...props}>
      <FormControlLabel
        label="Select all"
        className="join-journey-modal__checkbox"
        control={
          <Checkbox
            checked={areAllMilestonesSelected}
            indeterminate={areSomeMilestonesSelected}
            onChange={onSelectAll}
          />
        }
      />

      <Stack className="join-journey-modal__content">
        <JourneyMilestoneToggle onSelect={onSelectOne} value={selectedMilestones}>
          <JourneyMilestoneList milestones={milestones} renderItem={JourneyMilestoneToggleItem} />
        </JourneyMilestoneToggle>
      </Stack>
      <Stack className="join-journey-modal__footer">
        <Button className="join-journey-modal__confirm-btn">Confirm</Button>
      </Stack>
    </Modal>
  );
};
