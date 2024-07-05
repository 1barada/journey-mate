import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import './styles.scss';

import { Modal } from '../common/Modal';
import { JourneyMilestoneList } from '../JourneyMilestoneList';
import { JourneyMilestoneToggle, JourneyMilestoneToggleItem } from '../JourneyMilestoneToggle';

import type { JoinJourneyModalProps } from './types';
import { useJoinJourneyModal } from './useJoinJourneyModal';

export const JoinJourneyModal: React.FC<JoinJourneyModalProps> = (props) => {
  const modal = useJoinJourneyModal(props);

  const {
    onSelectOne,
    onSelectAll,
    onJoinJourney,
    onToggleModal,
    request,
    milestones,
    selectedMilestones,
    isSelectAllDisabled,
    isSubmitButtonDisabled,
    areAllMilestonesSelected,
    areSomeMilestonesSelected,
  } = modal;

  return (
    <Modal title="Select points to join" toggleModal={onToggleModal}>
      <FormControlLabel
        label="Select all"
        className="join-journey-modal__checkbox"
        control={
          <Checkbox
            disabled={isSelectAllDisabled}
            checked={areAllMilestonesSelected}
            indeterminate={areSomeMilestonesSelected}
            onChange={onSelectAll}
          />
        }
      />

      <Stack className="join-journey-modal__content">
        <JourneyMilestoneToggle onSelect={onSelectOne} value={selectedMilestones} disabled={request.isLoading}>
          <JourneyMilestoneList milestones={milestones} renderItem={JourneyMilestoneToggleItem} />
        </JourneyMilestoneToggle>
      </Stack>

      <Stack className="join-journey-modal__footer">
        <Button className="join-journey-modal__confirm-btn" disabled={isSubmitButtonDisabled} onClick={onJoinJourney}>
          <span>Join</span>
          {request.isLoading && <CircularProgress className="progress" />}
        </Button>
      </Stack>
    </Modal>
  );
};
