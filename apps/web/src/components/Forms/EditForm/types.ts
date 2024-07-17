export interface EditFormProps {
  name: string;
  dateOfBirth: Date | null;
  email: string;
  sex: string | null;
  file?: File | null;
}
