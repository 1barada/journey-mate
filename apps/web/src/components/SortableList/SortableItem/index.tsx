import { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';

import type { SortableBaseItem } from '../types';

import { type SortableItemContext, SortableItemContextProvider } from './provider';
import styles from './styles.module.scss';

interface SortableItemProps extends React.PropsWithChildren, SortableBaseItem {
  className?: string;
}

export const SortableItem: React.FC<SortableItemProps> = ({ children, id, className }) => {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id,
  });

  const context = useMemo<SortableItemContext>(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContextProvider value={context}>
      <ListItem className={clsx(styles.sortableItem)} ref={setNodeRef} style={style}>
        {children}
      </ListItem>
    </SortableItemContextProvider>
  );
};
