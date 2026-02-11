import {defineConfig} from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'https://petstore.swagger.io/v2/swagger.json', // Example input, replace with your API
  output: 'src/client',
  plugins: ['@tanstack/react-query'],
});
