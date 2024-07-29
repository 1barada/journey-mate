import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { MapWrapper } from '../../common/MapWrapper';
import { Modal } from '../../common/Modal';
import { SearchLocationInput } from '../../SearchLocationInput';
import { SearchLocationMap } from '../../SearchLocationMap';

import styles from './styles.module.scss';
import type { SearchLocationModalProps } from './types';
import { useSearchLocationModal } from './useSearchLocationModal';

export const SearchLocationModal: React.FC<SearchLocationModalProps> = (props) => {
  const {
    onSubmit,
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
          <FormControl error={hasErrorInField('title')} className={styles.searchInput}>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <SearchLocationInput
                    onPlaceSelected={(coords, title) => {
                      field.onChange(title);
                      form.setValue('coords', coords);
                    }}
                  />
                );
              }}
            />
            <FormHelperText>{getErrorMessage('title')}</FormHelperText>
          </FormControl>

          <MapWrapper>
            <Stack direction="column" sx={{ alignItems: 'center', pt: '12px', pb: '12px' }}>
              <Controller
                control={form.control}
                name="coords"
                render={({ field }) => (
                  <SearchLocationMap
                    width="100%"
                    height="300px"
                    onPlaceSelected={(coords, address) => {
                      field.onChange(coords);
                      form.setValue('title', address);
                    }}
                    {...(field.value.lat &&
                      field.value.lng && {
                        coordinate: {
                          lat: field.value.lat,
                          lng: field.value.lng,
                        },
                      })}
                  />
                )}
              />
            </Stack>
          </MapWrapper>
        </Stack>

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

        <Button type="submit" className={styles.submitButton} variant="contained" fullWidth>
          Ok
        </Button>
      </Stack>
    </Modal>
  );
};
