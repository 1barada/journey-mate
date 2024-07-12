import { forwardRef, useMemo } from 'react';
import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { useModal } from '../../hooks/useModal';
import { journeyActions } from '../../store/journey/slice';
import {
  MilestoneBadge,
  MilestoneBody,
  MilestoneContentBody,
  MilestoneDatetime,
  MilestoneDetailsBody,
  MilestoneName,
} from '../JourneyMilestone';
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
>(({ className, value = [], onChange, onMove, onDelete, onEdit, placeholder }, ref) => {
  const [isModalOpen, toggleModal] = useModal();

  const isEmpty = value.length === 0;
  const showPlaceholder = !!placeholder && isEmpty;
  const dispatch = useDispatch();

  const ctx = useMemo(() => ({ onChange, onEdit }), [onChange, onEdit]);

  const onMilestoneEdit = (milestone: any) => {
    dispatch(
      journeyActions.setEditUnsavedMilestone({
        ...milestone,
        dates: milestone.dates.map((d: any) => d?.toLocaleString()),
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
              onChange={(v) => onMove?.(v)}
              renderItem={(milestone, index) => {
                const badgeContent = index + 1;
                const [startDate, endDate] = milestone.dates ?? [];

                return (
                  <SortableItem id={milestone.id} key={milestone.id}>
                    <MilestoneBody>
                      <MilestoneContentBody component="span">
                        <MilestoneBadge>{badgeContent}</MilestoneBadge>

                        <MilestoneDetailsBody>
                          <MilestoneName tooltipText={milestone.location}>{milestone.location}</MilestoneName>

                          <Stack direction="row" className={styles.datetimeRange}>
                            <MilestoneDatetime key={index} date={startDate} />

                            {endDate && (
                              <>
                                <Typography className={styles.delimiter}>-</Typography>
                                <MilestoneDatetime key={index} date={endDate} />
                              </>
                            )}
                          </Stack>
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
            {/* <List className={styles.list}>
              {value.map((milestone, index) => {
                const badgeContent = index + 1;
                const [startDate, endDate] = milestone.dates;

                return (
                  <SortableItem key={milestone.location} id={milestone.location}>
                    <ListItem key={milestone.location}>
                      <MilestoneBody>
                        <MilestoneContentBody component="span">
                          <MilestoneBadge>{badgeContent}</MilestoneBadge>

                          <MilestoneDetailsBody>
                            <MilestoneName tooltipText={milestone.location}>{milestone.location}</MilestoneName>

                            <Stack direction="row" className={styles.datetimeRange}>
                              <MilestoneDatetime key={index} date={startDate} />

                              {endDate && (
                                <>
                                  <Typography className={styles.delimiter}>-</Typography>
                                  <MilestoneDatetime key={index} date={endDate} />
                                </>
                              )}
                            </Stack>
                          </MilestoneDetailsBody>
                        </MilestoneContentBody>
                      </MilestoneBody>

                      <Stack direction="row">
                        <IconButton color="primary" onClick={onMilestoneEdit?.bind(null, milestone)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={onDelete?.bind(null, milestone)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </ListItem>
                  </SortableItem>
                );
              })}
            </List> */}
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
