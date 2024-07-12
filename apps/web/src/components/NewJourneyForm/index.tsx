import { Controller } from 'react-hook-form';
import { CircularProgress, FormControl, FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

import { MilestoneSelectZone } from '../MilestoneSelectZone';

import styles from './styles.module.scss';
import type { NewJourneyFormProps } from './types';
import { useNewJourneyForm } from './useNewJourneyForm';
import { inputAlly } from './utils';

export const NewJourneyForm: React.FC<NewJourneyFormProps> = ({ className }) => {
  const { getErrorMessage, hasErrorInField, onCancel, onFormSubmit, form, isFormDisabled, needShowSpinner } =
    useNewJourneyForm();
  const { register } = form;

  return (
    <Box
      component="form"
      className={clsx(styles.newJourneyForm, { [styles.disabled]: isFormDisabled }, className)}
      onSubmit={form.handleSubmit(onFormSubmit)}
    >
      <Stack className={styles.group}>
        <TextField
          placeholder="Enter journey name"
          label="Title"
          error={hasErrorInField('title')}
          helperText={getErrorMessage('title')}
          {...register('title')}
          FormHelperTextProps={{ className: 'error-message' }}
        />
        <TextField
          select
          fullWidth
          label="Select journey type"
          inputProps={register('type')}
          error={hasErrorInField('type')}
          helperText={getErrorMessage('type')}
          {...inputAlly('type')}
          FormHelperTextProps={{ className: 'error-message' }}
        >
          <MenuItem value={'10'}>Ten</MenuItem>
          <MenuItem value={'20'}>Twenty</MenuItem>
          <MenuItem value={'30'}>Thirty</MenuItem>
        </TextField>

        <Controller
          name="milestones"
          control={form.control}
          render={({ field }) => (
            <FormControl error={hasErrorInField('milestones')}>
              <MilestoneSelectZone
                placeholder="Add your destinations"
                value={field.value}
                onEdit={(edited) => {
                  field.onChange(field.value.map((m) => (m.location === edited.location ? edited : m)));
                }}
                onDelete={(deleteCandidate) =>
                  field.onChange(field.value.filter((m) => m.location !== deleteCandidate.location))
                }
                onChange={(newMileStone) => {
                  field.onChange([...field.value, newMileStone]);
                }}
                onMove={field.onChange}
              />
              <FormHelperText className={'error-message'}>{getErrorMessage('milestones')}</FormHelperText>
            </FormControl>
          )}
        />
      </Stack>

      <Stack>
        <TextField
          multiline
          minRows={10}
          fullWidth
          error={hasErrorInField('description')}
          helperText={getErrorMessage('description')}
          placeholder="Add small description about your journey"
          {...register('description')}
          {...inputAlly('description')}
          FormHelperTextProps={{ className: 'error-message' }}
        />

        <Stack direction="row" className={styles.actions}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>

      {needShowSpinner && (
        <Box component="div" className={styles.spinner}>
          <CircularProgress color="success" />
        </Box>
      )}
    </Box>
  );
};
