import convict from 'convict';

const envConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  host: {
    doc: 'The application host',
    env: 'HOST',
    default: 'localhost',
  },
  port: {
    doc: 'The application port',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port',
  },
});

envConfig.validate({ allowed: 'strict' });

export { envConfig };
