import { appConfigEnvSchema } from './env.schema';
import { normalizeAppEnv } from './env.transform';

const env = appConfigEnvSchema.parse(import.meta.env);
const { apiUrl } = normalizeAppEnv(env);

const configData = {
  apiUrl: apiUrl,
};

type ConfigKey = keyof typeof configData;
type Config = Record<ConfigKey, (typeof configData)[ConfigKey]>;

const config = {
  get: (key: ConfigKey) => configData[key],
  getProperties: (): Config => configData,
};

export { config };
