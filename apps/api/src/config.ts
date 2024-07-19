import convict from 'convict';
import z from 'zod';

import 'dotenv/config'; // remove after config.json shape is getting from ECR

const FrontendUrlSchema = z.string().url();
const EmailUserSchema = z.string().email().endsWith('gmail.com');
const EmailPasswordSchema = z.string().length(16);

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
  jwtSecret: {
    default: 'jsklfasjlkwejfsfjwkefjlwe;l',
    env: 'SECRET_KEY',
  },
  frontendUrl: {
    format: (value) => FrontendUrlSchema.parse(value),
    default: 'http://localhost:5050',
    env: 'FRONTEND_URL',
  },
  cookieSecret: {
    default: '',
    env: 'COOKIE_SECRET',
  },
  emailUser: {
    format: (value) => EmailUserSchema.parse(value),
    default: '',
    env: 'EMAIL_USER',
  },
  emailPassword: {
    format: (value) => EmailPasswordSchema.parse(value),
    default: '',
    env: 'EMAIL_PASSWORD',
  },
});

const configPath = config.get('configUrl');

if (configPath) {
  config.loadFile(configPath);
}

// config.validate({ allowed: 'strict' });  uncommit after config.json shape is getting from ECR

export { config };
