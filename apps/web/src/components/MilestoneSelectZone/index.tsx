import { forwardRef, useMemo } from 'react';
import { lazy, Suspense } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { useModal } from '../../hooks/useModal';
import { journeyActions } from '../../store/journey/slice';
import type { Milestone } from '../../store/journey/types';
import { useAppDispatch } from '../../types/reduxTypes';
import {
  MilestoneBadge,
  MilestoneBody,
  MilestoneContentBody,
  MilestoneDatetime,
  MilestoneDetailsBody,
  MilestoneName,
} from '../JourneyMilestone';
import { MilestoneDatesTuple } from '../JourneyMilestone/MilestoneDatesTuple';
import { SortableList } from '../SortableList';
import { DragHandle } from '../SortableList/DragHandle';
import { SortableItem } from '../SortableList/SortableItem';

import { MilestoneSelectZoneContext } from './provider';
import styles from './styles.module.scss';
import type { MilestoneSelectZoneProps } from './types.ts';

const SearchLocationModal = lazy(() =>
  import('./SearchLocationModal').then((m) => ({ default: m.SearchLocationModal }))
);

export const MilestoneSelectZone: React.FC<MilestoneSelectZoneProps> = forwardRef<
  HTMLDivElement,
  MilestoneSelectZoneProps
>(({ className, value = [], onChange, onSwap, onDelete, onEdit, placeholder }, ref) => {
  const [isModalOpen, toggleModal] = useModal();

  const isEmpty = value.length === 0;
  const showPlaceholder = !!placeholder && isEmpty;
  const dispatch = useAppDispatch();

  const ctx = useMemo(() => ({ onChange, onEdit }), [onChange, onEdit]);

  const onMilestoneEdit = (milestone: Milestone) => {
    dispatch(
      journeyActions.setEditUnsavedMilestone({
        milestone: {
          ...milestone,
          dates: milestone.dates.map((date) => dayjs(date).toDate().getTime()),
        },
      })
    );
    toggleModal();
  };

  return (
    <MilestoneSelectZoneContext value={ctx}>
      <Stack
        component="div"
        ref={ref}
        className={clsx(styles.milestonesSelectZone, { [styles.empty]: isEmpty }, className)}
      >
        {showPlaceholder && (
          <Typography className={styles.placeholder} aria-label="placeholder">
            {placeholder}
          </Typography>
        )}

        {!isEmpty && (
          <Box className={styles.scrollable}>
            <SortableList
              items={value}
              onSwap={onSwap}
              onBeforeSwap={(active, over) => {
                const temp = { ...active };

                active.dates = over.dates;
                over.dates = temp.dates;
              }}
              renderItem={(milestone, index) => {
                const badgeContent = index + 1;
                const { title, dates } = milestone;
                const [startDate, endDate] = dates ?? [];

                return (
                  <SortableItem id={milestone.id} key={milestone.id}>
                    <MilestoneBody>
                      <MilestoneContentBody component="span">
                        <MilestoneBadge>{badgeContent}</MilestoneBadge>

                        <MilestoneDetailsBody>
                          <MilestoneName tooltipText={title}>{title}</MilestoneName>

                          <MilestoneDatesTuple itemsCount={dates.length}>
                            <MilestoneDatetime key={index} date={startDate} />
                            <MilestoneDatetime key={index} date={endDate} />
                          </MilestoneDatesTuple>
                        </MilestoneDetailsBody>
                      </MilestoneContentBody>
                    </MilestoneBody>

                    <Stack direction="row">
                      <IconButton
                        color="primary"
                        onClick={onMilestoneEdit?.bind(null, milestone)}
                        className={styles.control}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={onDelete?.bind(null, milestone)} className={styles.control}>
                        <DeleteIcon />
                      </IconButton>

                      <DragHandle className={styles.control} />
                    </Stack>
                  </SortableItem>
                );
              }}
            />
          </Box>
        )}

        <Button variant="contained" className={styles.addButton} size="small" onClick={toggleModal}>
          <AddIcon />
        </Button>

        <Suspense>{isModalOpen && <SearchLocationModal toggleModal={toggleModal} />}</Suspense>
      </Stack>
    </MilestoneSelectZoneContext>
  );
});
