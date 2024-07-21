import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { journeyActions, journeySelectors } from '../../../store/journey/slice';
import type { NewJourneyFieldName, NewJourneyValues } from '../../../store/journey/types';
import { NewJourneySchema } from '../../../store/journey/types';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';

const defaultValues = {
  description: '',
  title: '',
  category: [{ value: '', title: '', id: 0 }],
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
        category: values.category.map(({ value }) => ({ value })),
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
