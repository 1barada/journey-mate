import { z } from 'zod';

import { RestorePasswordSchema } from './schemas';

export interface RestorePasswordProps {
  toggleModal: () => void;
}

export type FormInputsTypes = z.infer<typeof RestorePasswordSchema>;
