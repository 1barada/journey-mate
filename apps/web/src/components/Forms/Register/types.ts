import { z } from 'zod';

import { registerSchema } from './schemas';

export interface RegisterProps {
  toggleModal: () => void;
}

export type FormInputsTypes = z.infer<typeof registerSchema>;
