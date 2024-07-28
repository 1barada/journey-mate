import { ParticipantMilestones } from '../../pages/JourneyDetailsPage/JourneyDetails';
import type { ModalProps } from '../common/Modal/Modal.types';
import type { JourneyMilestonesProps } from '../JourneyMilestone/types';

export interface JoinJourneyModalProps
  extends Omit<ModalProps, 'children' | 'className'>,
    Partial<Pick<JourneyMilestonesProps, 'milestones'>> {
  onJoinHandler?: (participantMilestones: ParticipantMilestones) => void;
}
