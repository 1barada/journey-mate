import { sex } from '../../../store/Auth/types';

export interface EditFormProps {
  name: string;
  age: number | null;
  email: string;
  sex: sex | null;
  file?: File | null;
}
