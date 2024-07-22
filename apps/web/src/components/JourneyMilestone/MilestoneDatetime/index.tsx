import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import './styles.scss';

import { DateFormatter, DatetimeProps } from './types';

const defaultDateFormatter: DateFormatter = (date) => {
  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) return '--.--.--';

  return parsedDate.format('DD.MM.YY');
};

export const MilestoneDatetime: React.FC<DatetimeProps> = ({
  date,
  dateFormatter = defaultDateFormatter,
  ...props
}) => {
  const formattedDate = dateFormatter(date);

  return (
    <Typography component="time" className="datetime" display="block" textAlign="left" {...props}>
      {formattedDate}
    </Typography>
  );
};
