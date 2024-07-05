import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import './styles.scss';

import { Modal } from '../common/Modal';
import { JourneyMilestoneList } from '../JourneyMilestoneList';
import { JourneyMilestoneToggle, JourneyMilestoneToggleItem } from '../JourneyMilestoneToggle';

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

export const JoinJourneyModal: React.FC<JoinJourneyModalProps> = ({
  onSelect,
  initialValue,
  milestones = mockMilestones,
  ...props
}) => {
  return (
    <Modal title="Select points to join" {...props}>
      <Stack className="join-journey-modal__content">
        <JourneyMilestoneToggle onSelect={onSelect} initialValue={initialValue}>
          <JourneyMilestoneList milestones={milestones} renderItem={JourneyMilestoneToggleItem} />
        </JourneyMilestoneToggle>

        <Button className="join-journey-modal__confirm-btn">Confirm</Button>
      </Stack>
    </Modal>
  );
};
