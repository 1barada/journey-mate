import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { trpc } from '../../services/trpc';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

  trpc.user.getUsers.query().then((data) => console.log(data));

  return (
    <Container>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography
        variant="h1"
        sx={{
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: '37.5px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Welcome to the journey mate!
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: '17.58px',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        Here you can find people for your trip!
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '251px',
            height: '46px',
            padding: '3px 12px',
            marginY: '8px',
          }}
        >
          Create New Journey
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '600px' }}>
        <Box sx={{ marginRight: '10px' }}>
          <FormControl fullWidth>
            <Input
              placeholder="Шукай свою подорож"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              disableUnderline
              sx={{
                paddingY: '11px',
                paddingX: '12px',
                border: '1px solid #bdbdbd',
                borderRadius: '8px',
                ':hover': {
                  borderColor: '#000',
                },
                '&.Mui-focused': {
                  border: '1px solid #bdd9f9',
                  outline: '1px solid #bdd9f9',
                },
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <InputLabel>Тип події</InputLabel>
          <Select value={filterType} onChange={handleFilterChange} displayEmpty disableUnderline>
            <MenuItem value="guided-group-trip">Guided Group Trip</MenuItem>
            <MenuItem value="photography-trip">Photography Trip</MenuItem>
            <MenuItem value="fitness-training-trip">Fitness and Training Trip</MenuItem>
            <MenuItem value="family-friendly-trip">Family-Friendly Trip</MenuItem>
            <MenuItem value="adventure-extreme-trip">Adventure and Extreme Trip</MenuItem>
            <MenuItem value="accessible-inclusive-trip">Accessible and Inclusive Trip</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="body1">Gallery will be displayed here.</Typography>
      </Box>
    </Container>
  );
};
