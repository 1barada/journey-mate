import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { trpcClient } from '../../../services/trpc';

import styles from './FilterBar.module.scss';
import { FilterBarProps } from './FilterBar.types';

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearchQueryChangeHandler,
  onCategoryChangeHandler,
  onDateChangeHandler,
  sinceDate,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(sinceDate ? dayjs(sinceDate) : null);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await trpcClient.journey.getCategories.query();
      setSelectedCategories(fetchedCategories.map((category) => category.title));
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
    onCategoryChangeHandler(event.target.value);
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearchQueryChangeHandler(event.target.value);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    onDateChangeHandler(date?.format('YYYY-MM-DD') || '');
  };

  return (
    <div className={styles.filterBar}>
      <FormControl className={styles.searchInput}>
        <TextField
          label="Search journey"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className={styles.searchField}
        />
      </FormControl>
      <FormControl variant="outlined" className={styles.datePicker}>
        <InputLabel id="filter-by-category-label">Filter by category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          id="filter-by-category"
          labelId="filter-by-category-label"
          label="Filter by category"
        >
          <MenuItem value="all">{'All'}</MenuItem>
          {selectedCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={styles.datePicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            label="Filter by date"
            onChange={handleDateChange}
            minDate={sinceDate && dayjs(sinceDate)}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );
};
