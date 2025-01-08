import { z } from 'zod';

export const memoryCardSchema = z.object({
  id: z.string(),
  calculatedId: z.string().optional(),
  image: z.string(),
  flipped: z.boolean().optional(),
  matched: z.boolean().optional(),
});

export type MemoryCard = z.infer<typeof memoryCardSchema>;
