import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';

import { useSortableItem } from '../SortableItem/provider';

import styles from './styles.module.scss';

export interface DragHandleProps {
  className?: string;
}

export const DragHandle: React.FC<DragHandleProps> = ({ className }) => {
  const { attributes, listeners, ref } = useSortableItem();

  return (
    <IconButton className={clsx(styles.dragHandle, className)} {...attributes} {...listeners} ref={ref}>
      <DragIndicatorIcon />
    </IconButton>
  );
};
