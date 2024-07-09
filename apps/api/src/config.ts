import convict from 'convict';

const config = convict({
  configUrl: {
    default: '',
    env: 'SERVER_CONFIG_FILE_PATH',
  },
  port: {
    format: 'port',
    default: 5000,
    env: 'PORT',
  },
  host: {
    default: 'localhost',
    env: 'AWS_EC2_HOST',
  },
  secret: {
    default: '',
    env: 'SECRET_KEY',
  },
  frontendUrl: {
    default: 'http://localhost:5050',
    env: 'FRONTEND_URL',
  },
  cookieSecret: {
    default: '',
    env: 'COOKIE_SECRET',
  },
});

const configPath = config.get('configUrl');

if (configPath) {
  config.loadFile(configPath);
}

// config.validate({ allowed: 'strict' });  uncommit after config.json shape is getting from ECR

export { config };
