import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { journeyActions, journeySelectors } from '../../store/journey/slice';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';
import { MilestoneSchema } from '../MilestoneSelectZone/SearchLocationModal/useSearchLocationModal';

const NewJourneySchema = z.object({
  title: z.string().min(3, 'Must be at least 3 chars long'),
  category: z.string().min(1, 'Journey category is required'),
  description: z.string().min(10, 'Must be at least 10 chars long'),
  milestones: z.array(MilestoneSchema).min(1, 'Journey must contain at least one location'),
});

type NewJourneyValues = z.infer<typeof NewJourneySchema>;
type NewJourneyFieldName = keyof NewJourneyValues;

const defaultValues = {
  description: '',
  title: '',
  category: '',
  milestones: [],
};

export const useNewJourneyForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const request = useAppSelector(journeySelectors.selectRequestState);

  const form = useForm<NewJourneyValues>({
    resolver: zodResolver(NewJourneySchema),
    defaultValues,
  });

  const getErrorMessage = (name: NewJourneyFieldName) => form.formState.errors[name]?.message ?? '';
  const hasErrorInField = (name: NewJourneyFieldName) => Boolean(form.formState.errors[name]);
  const onCancel = () => navigate(-1);
  const onFormSubmit = (values: NewJourneyValues) => {
    dispatch(
      journeyActions.createNewJourney({
        ...values,
        milestones: values.milestones.map((milestone) => ({
          coords: milestone.coords,
          title: milestone.title,
          dates: milestone.dates.map((date) => date.toDate().getTime()) as [number, number],
        })),
      })
    );
  };

  const isFormDisabled = request.isLoading;
  const needShowSpinner = request.isLoading;

  return {
    onCancel,
    hasErrorInField,
    getErrorMessage,
    onFormSubmit,
    needShowSpinner,
    isFormDisabled,
    form,
  };
};
