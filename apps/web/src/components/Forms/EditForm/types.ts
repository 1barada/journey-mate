import { Sex } from '../../../store/Auth/types';

export interface EditFormProps {
  name: string;
  dateOfBirth: Date | null;
  email: string;
  sex: Sex | null;
  file?: File | null;
}
