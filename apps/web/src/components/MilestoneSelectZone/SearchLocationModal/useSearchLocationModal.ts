import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { z } from 'zod';

import { journeyActions, journeySelectors } from '../../../store/journey/slice';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';
import { useMilestoneSelectZone } from '../provider';

import type { SearchLocationModalProps } from './types';

const DATE_PICKERS_LIMIT = 2;

const DayjsDateSchema = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

export const MilestoneSchema = z.object({
  id: z.number().default(performance.now()),
  title: z.string().min(1),
  dates: z.array(DayjsDateSchema).min(1),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

const dateFiledLabels = new Map<number, string>([
  [0, 'Start date'],
  [1, 'End date'],
]);

type MilestoneDates = z.infer<typeof MilestoneSchema>['dates'];
export type MilestoneFormValues = z.infer<typeof MilestoneSchema>;
export type MilestoneFieldName = keyof z.infer<typeof MilestoneSchema>;

export const useSearchLocationModal = ({ toggleModal }: SearchLocationModalProps) => {
  const minDate = dayjs().add(24, 'hours');
  const editedItem = useAppSelector(journeySelectors.selectEditUnsavedMilestone);
  const dispatch = useAppDispatch();

  const form = useForm<MilestoneFormValues>({
    resolver: zodResolver(MilestoneSchema),
    defaultValues: {
      id: performance.now(),
      title: '',
      dates: [minDate],
      coords: {
        lat: 50.45466,
        lng: 30.5238,
      },
    },
  });

  const dates = useFieldArray({
    control: form.control,
    name: 'dates',
  });

  const { onChange, onEdit } = useMilestoneSelectZone();
  const { register, setValue } = form;

  const onSelect = (values: MilestoneFormValues) => {
    if (editedItem) {
      onEdit?.(values);
    } else {
      onChange(values);
    }

    toggleModal();
  };

  useEffect(() => {
    if (editedItem) {
      const dates = editedItem.dates.map((date) => (typeof date === 'number' ? dayjs(date) : date)) as MilestoneDates;

      setValue('coords', editedItem.coords);
      setValue('title', editedItem.title);
      setValue('dates', dates);
      setValue('id', editedItem.id);
    }
  }, [setValue, editedItem]);

  const hasReachedDatePickersLimit = dates.fields.length >= DATE_PICKERS_LIMIT;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    form.handleSubmit(onSelect)(e);

    if (editedItem) {
      dispatch(journeyActions.clearEditUnsavedMilestone());
    }
  };

  const onCloseModal = () => {
    if (editedItem) {
      dispatch(journeyActions.clearEditUnsavedMilestone());
    }
    toggleModal();
  };

  const getErrorMessage = (name: MilestoneFieldName) => form.formState.errors[name]?.message ?? '';
  const hasErrorInField = (name: MilestoneFieldName) => Boolean(form.formState.errors[name]);
  const getDatePickerLabel = (key: number) => dateFiledLabels.get(key);

  return {
    getDatePickerLabel,
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
