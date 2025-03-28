import { z } from 'zod';

const ContentSchema = z.object({
  type: z.string().optional(),
  link: z.string().optional(),
  title: z.string(),
  tags: z.array(z.string()).optional(),
});

export default ContentSchema;
