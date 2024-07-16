import { Children } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import './styles.scss';

import type { MilestoneDatesTupleProps } from './types';

const DELIMITER = '-';

export const MilestoneDatesTuple: React.FC<MilestoneDatesTupleProps> = ({ itemsCount, children, className }) => {
  const [startDateEl, endDateEl] = Children.toArray(children);

  return (
    <Box component="div" className={clsx('datetimeTuple', className)}>
      {startDateEl}
      {itemsCount < 2 && (
        <>
          <Typography>{DELIMITER}</Typography>
          {endDateEl}
        </>
      )}
    </Box>
  );
};
