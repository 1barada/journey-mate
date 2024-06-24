import { ServerAppConfig, serverAppConfigSchema, serverAppEnvSchema } from './env.schema';
import { normalizeServerAppEnv } from './env.transform';

const env = normalizeServerAppEnv(serverAppEnvSchema.parse(process.env));
const configData = {
  ...env,
};

type ConfigData = typeof configData & ServerAppConfig;
type ServerConfigKey = keyof ConfigData;
type ServerConfig = Record<ServerConfigKey, ConfigData[ServerConfigKey]>;

const config = {
  get: <Key extends ServerConfigKey>(key: Key): ConfigData[Key] => (configData as ConfigData)[key],
  getProperties: (): ServerConfig => configData as ServerConfig,
};

const response = await fetch(config.get('configUrl'));
const data = (await response.json()) as ServerAppConfig;

const newConfig = serverAppConfigSchema.parse(data);

Object.assign(configData, newConfig);

export { config };
