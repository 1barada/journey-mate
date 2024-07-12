import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { journeyActions, journeySelectors } from '../../store/journey/slice';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';

const NewJourneySchema = z.object({
  title: z.string().min(3, 'Must be at least 3 chars long'),
  type: z.string().min(1, 'Journey type is required'),
  description: z.string().min(10, 'Must be at least 10 chars long'),
  milestones: z
    .array(z.object({ date: z.date(), location: z.string() }))
    .min(1, 'Journey must contain at least one location'),
});

type NewJourneyValues = z.infer<typeof NewJourneySchema>;
type NewJourneyFieldName = keyof NewJourneyValues;

const defaultValues = {
  description: '',
  title: '',
  type: '',
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
    dispatch(journeyActions.createNewJourney(values));
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
