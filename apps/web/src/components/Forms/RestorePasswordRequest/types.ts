import { z } from 'zod';

import { restorePasswordRequestSchema } from './schemas';

export interface RestorePasswordRequestFormProps {
  toggleModal: () => void;
}

export type FormInputsTypes = z.infer<typeof restorePasswordRequestSchema>;
