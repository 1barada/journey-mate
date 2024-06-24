import { webAppEnvConfigSchema } from './env.schema';
import { normalizeWebAppEnvConfig } from './env.transform';

const env = normalizeWebAppEnvConfig(webAppEnvConfigSchema.parse(import.meta.env));

const configData = Object.freeze({
  ...env,
});

type ConfigData = typeof configData;
type WebConfigKey = keyof typeof configData;
type WebConfig = Record<WebConfigKey, (typeof configData)[WebConfigKey]>;

const config = {
  get: <Key extends WebConfigKey>(key: Key): ConfigData[Key] => configData[key],
  getProperties: (): WebConfig => configData,
};

export { config };
