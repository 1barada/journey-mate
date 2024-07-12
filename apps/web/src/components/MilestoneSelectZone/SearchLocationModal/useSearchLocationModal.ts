import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { z } from 'zod';

import { journeyActions, journeySelectors } from '../../../store/journey/slice';
import { useMilestoneSelectZone } from '../provider';

import type { SearchLocationModalProps } from './types';

const DATE_PICKERS_LIMIT = 2;

const LocationSchema = z.object({
  location: z.string().min(3),
  dates: z.array(z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date')),
});

const dateFiledLabels = new Map<number, string>([
  [0, 'Start date'],
  [1, 'End date'],
]);

export type LocationFormValues = z.infer<typeof LocationSchema>;
export type LocationFieldName = keyof z.infer<typeof LocationSchema>;

export const useSearchLocationModal = ({ toggleModal }: SearchLocationModalProps) => {
  const minDate = dayjs().add(24, 'hours');
  const editedItem = useSelector(journeySelectors.selectEditUnsavedMilestone);
  const dispatch = useDispatch();

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      location: '',
      dates: [minDate],
    },
  });

  const dates = useFieldArray({
    control: form.control,
    name: 'dates',
  });

  const { onChange, onEdit } = useMilestoneSelectZone();
  const { setFocus, register } = form;

  const onSelect = (values: LocationFormValues) => {
    if (editedItem) {
      onEdit?.(values);
    } else {
      onChange({ ...values, id: performance.now(), date: values.dates[0].toDate() });
    }

    toggleModal();
  };

  useEffect(() => {
    setFocus('location');
  }, [setFocus]);

  useEffect(() => {
    if (editedItem) {
      form.setValue('location', editedItem.location);
      form.setValue('dates', [dayjs(editedItem.dates)]);
    }
  }, [form, editedItem]);

  const hasReachedDatePickersLimit = dates.fields.length >= DATE_PICKERS_LIMIT;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    form.handleSubmit(onSelect)(e);
    dispatch(journeyActions.clearEditUnsavedMilestone());
  };

  const onCloseModal = () => {
    if (editedItem) {
      dispatch(journeyActions.clearEditUnsavedMilestone());
    }
    toggleModal();
  };

  const getErrorMessage = (name: LocationFieldName) => form.formState.errors[name]?.message ?? '';
  const hasErrorInField = (name: LocationFieldName) => Boolean(form.formState.errors[name]);

  return {
    getDatePickerLabel: dateFiledLabels.get.bind(dateFiledLabels),
    onSelect,
    onSubmit,
    register,
    hasErrorInField,
    getErrorMessage,
    onCloseModal,
    dates,
    form,
    minDate,
    hasReachedDatePickersLimit,
    editedItem,
  };
};
