import { z } from 'zod';

export const ChangeDescriptionInputSchema = z.object({
  description: z.string().max(1000),
});

export type ChangeDescriptionInput = z.infer<typeof ChangeDescriptionInputSchema>;

export interface ChangeDescriptionRequest {
  id: number;
  description: string;
}

export const ChangeDescriptionResponseSchema = z.object({
  description: z.string(),
});

export type ChangeDescriptionResponse = z.infer<typeof ChangeDescriptionResponseSchema>;

export interface ChangeDescriptionUsecase {
  changeDescription(request: ChangeDescriptionRequest): Promise<ChangeDescriptionResponse>;
}
