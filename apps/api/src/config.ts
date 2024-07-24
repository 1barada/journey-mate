import convict from 'convict';
import z from 'zod';

import 'dotenv/config'; // remove after config.json shape is getting from ECR

const FrontendUrlSchema = z.string().url();
const EmailUserSchema = z.string().email().endsWith('gmail.com');
const EmailPasswordSchema = z.string().length(16);
const NodeEnvSchema = z.enum(['development', 'production', 'test']);

const config = convict({
  configUrl: {
    default: '',
    env: 'SERVER_CONFIG_FILE_PATH',
  },
  nodeEnv: {
    format: (value) => NodeEnvSchema.parse(value),
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    format: 'port',
    default: 5000,
    env: 'PORT',
  },
  host: {
    default: 'http://3.121.74.201/',
    env: 'AWS_EC2_HOST',
  },
  jwtSecret: {
    default: 'jsklfasjlkwejfsfjwkefjlwe;l',
    env: 'SECRET_KEY',
  },
  frontendUrl: {
    format: (value) => FrontendUrlSchema.parse(value),
    default: 'https://d1dmhvxf73tuaz.cloudfront.net/ ',
    env: 'FRONTEND_URL',
  },
  cookieSecret: {
    default: 'js;aljsfb;asjkbfabf;akwejfsasjfaksjbfl',
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
  googleClientId: {
    default: '99151334654-bof4m5hcn481j30a1v9tm811tsa3753m.apps.googleusercontent.com',
    env: 'GOOGLE_CLIENT_ID',
  },
  googleClientSecret: {
    default: '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',
    env: 'GOOGLE_CLIENT_SECRET',
  },
});

const configPath = config.get('configUrl');

if (configPath) {
  config.loadFile(configPath);
}

// config.validate({ allowed: 'strict' });  uncommit after config.json shape is getting from ECR

export { config };
