import { forwardRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';

import { trpcClient } from '../../../../services/trpc';
import type { JourneyCategory } from '../../../../store/journey/types';

import styles from './styles.module.scss';

export interface SelectJourneyCategoryRenderParams {
  categories: JourneyCategory[];
}

export interface SelectJourneyCategoryProps {
  onChange(categories: JourneyCategory[]): void;
  value: JourneyCategory[];
  label?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
}

export const SelectJourneyCategory: React.FC<SelectJourneyCategoryProps> = forwardRef<
  HTMLSelectElement,
  SelectJourneyCategoryProps
>(({ value, onChange, label = 'Select journey type', error = false, errorMessage = '', ...restProps }, ref) => {
  const [categories, setCategories] = useState<JourneyCategory[]>([]);
  const displayValue = value.map((item) => item.value);

  useEffect(() => {
    (async () => {
      try {
        const res = await trpcClient.journey.getCategories.query();
        const preSelectedCategories = [res[0]];

        setCategories(res);
        onChange(preSelectedCategories);
      } catch {
        toast.error('Could not load journey categories list');
      }
    })();
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const selectedCategories = categories.filter((category) => value.includes(category.value));
    onChange(selectedCategories);
  };

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="journey-category" className={styles.label}>
        {label}
      </InputLabel>
      <Select ref={ref} labelId="journey-category" multiple value={displayValue} onChange={handleChange} {...restProps}>
        {categories.map(({ id, value, title }) => (
          <MenuItem key={id} value={value}>
            {title}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className="error-message">{errorMessage}</FormHelperText>
    </FormControl>
  );
});
