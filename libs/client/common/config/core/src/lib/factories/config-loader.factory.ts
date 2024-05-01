import { ConfigService } from '../services/config.service';

export function configLoaderFactory(configService: ConfigService) {
  return () => configService.init();
}
