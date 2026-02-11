import {z} from 'zod';

const envSchema = z.object({
  API_URL: z.string(),
  PROJECT_ID: z.string(),
});

const _env = envSchema.safeParse({
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
});

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
