import { ConfigService } from '../services/config.service';

export const initializeConfig = (
  configService: ConfigService
): (() => Promise<unknown>) => {
  return () => {
    return configService.load();
  };
};
