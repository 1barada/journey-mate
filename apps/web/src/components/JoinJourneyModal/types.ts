import type { ModalProps } from '../common/Modal/Modal.types';
import type { JourneyMilestonesProps } from '../JourneyMilestone/types';
import type { JourneyMilestoneToggleProps } from '../JourneyMilestoneToggle/types';

export interface JoinJourneyModalProps
  extends Omit<ModalProps, 'children' | 'className'>,
    Omit<JourneyMilestoneToggleProps, 'children'>,
    Partial<Pick<JourneyMilestonesProps, 'milestones'>> {}
