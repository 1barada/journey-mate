import React from 'react';
import Box from '@mui/material/Box';
import MUIPagination from '@mui/material/Pagination';

import { PaginationProps } from './Pagination.types';

export const Pagination: React.FC<PaginationProps> = ({ totalPages = 1, currentPage = 1, onChange }) => {
  return (
    <Box display="flex" justifyContent="center" marginTop={16}>
      <MUIPagination count={totalPages} page={currentPage} onChange={onChange} />
    </Box>
  );
};
