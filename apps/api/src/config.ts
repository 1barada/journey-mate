import convict from 'convict';
import formatValidator from 'convict-format-with-validator';

convict.addFormat(formatValidator.url);

const config = convict({
  configUrl: {
    format: 'url',
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
    env: 'HOST',
  },
});

config.validate({ allowed: 'strict' });

const loadAsyncConfig = async () => {
  try {
    const response = await fetch(config.get('configUrl'));
    const newConfig = await response.json();

    config.load(newConfig);
    // ! TODO add uncomment below once external config schema is defined
    // config.validate({ allowed: 'strict' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

await loadAsyncConfig();

export { config };
