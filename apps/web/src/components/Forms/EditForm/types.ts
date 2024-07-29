import type { Sex } from '../../../store/auth/types';

export interface EditFormProps {
  name: string | null;
  dateOfBirth: Date;
  email: string;
  sex: Sex | null;
}
