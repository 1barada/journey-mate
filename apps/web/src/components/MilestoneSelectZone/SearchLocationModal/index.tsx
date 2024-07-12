import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Modal } from '../../common/Modal';

import styles from './styles.module.scss';
import type { SearchLocationModalProps } from './types';
import { useSearchLocationModal } from './useSearchLocationModal';

const inputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  ),
};

export const SearchLocationModal: React.FC<SearchLocationModalProps> = (props) => {
  const {
    onSubmit,
    register,
    onCloseModal,
    getErrorMessage,
    hasErrorInField,
    getDatePickerLabel,
    dates,
    form,
    minDate,
    hasReachedDatePickersLimit,
  } = useSearchLocationModal(props);

  return (
    <Modal toggleModal={onCloseModal} title="Add new destination">
      <Stack direction="column" component="form" className={styles.modal} onSubmit={onSubmit}>
        <Stack direction="column" className={styles.inputsWrapper}>
          <TextField
            {...register('location')}
            placeholder="Search location..."
            InputProps={inputProps}
            error={hasErrorInField('location')}
            helperText={getErrorMessage('location')}
            FormHelperTextProps={{ className: 'error-message' }}
          />

          <Stack className={styles.datePickers}>
            <Stack className={styles.datePickersWrapper}>
              {dates.fields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={form.control}
                  name={`dates.${index}`}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={getDatePickerLabel(index)}
                        value={field.value}
                        minDate={minDate}
                        format={'DD.MM.YYYY'}
                        onChange={field.onChange}
                        slotProps={{
                          popper: {
                            placement: 'top-start',
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              ))}
            </Stack>

            {!hasReachedDatePickersLimit && (
              <Button
                variant="contained"
                className={styles.addFieldButton}
                onClick={() => {
                  dates.append(minDate);
                }}
              >
                <Typography>Specify end date</Typography>
              </Button>
            )}

            {hasReachedDatePickersLimit && (
              <Button
                variant="contained"
                className={styles.addFieldButton}
                onClick={() => {
                  dates.remove(dates.fields.length - 1);
                }}
              >
                <Typography>Remove end date</Typography>
              </Button>
            )}
          </Stack>
        </Stack>

        <Button type="submit" className={styles.submitButton} variant="contained" fullWidth>
          Ok
        </Button>
      </Stack>
    </Modal>
  );
};
