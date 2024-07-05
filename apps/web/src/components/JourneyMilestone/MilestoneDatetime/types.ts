import type { TypographyProps } from '@mui/material/Typography';

export type DateFormatter = (date?: DatetimeProps['date']) => string;

export interface DatetimeProps extends Omit<TypographyProps, 'children'> {
  date: Date | number | string;
  dateFormatter?: DateFormatter;
}
