import type { TypographyProps } from '@mui/material/Typography';
import { Dayjs } from 'dayjs';

export type DateFormatter = (date?: DatetimeProps['date']) => string;

export interface DatetimeProps extends Omit<TypographyProps, 'children'> {
  date: Date | number | string | undefined | Dayjs;
  dateFormatter?: DateFormatter;
}
