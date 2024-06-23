import convict from 'convict';

const envConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  apiUrl: {
    doc: 'The application port',
    format: 'url',
    default: 'http://localhost:5000',
    env: 'API_URL',
  },
});

envConfig.validate({ allowed: 'strict' });

export { envConfig };
