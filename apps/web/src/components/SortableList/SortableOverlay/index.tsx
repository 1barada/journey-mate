import type { DropAnimation } from '@dnd-kit/core';
import { defaultDropAnimationSideEffects, DragOverlay } from '@dnd-kit/core';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

export const SortableOverlay: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>;
};
