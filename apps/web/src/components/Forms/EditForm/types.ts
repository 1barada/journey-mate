import type { Sex } from '../../../store/auth/types';

export interface EditFormProps {
  name: string | null;
  dateOfBirth: Date | null;
  email: string;
  sex: Sex | null;
}
