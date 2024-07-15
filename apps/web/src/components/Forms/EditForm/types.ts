import { Sex } from '../../../store/Auth/types';

export interface EditFormProps {
  name: string;
  age: number | null;
  email: string;
  sex: Sex | null;
  file?: File | null;
}
