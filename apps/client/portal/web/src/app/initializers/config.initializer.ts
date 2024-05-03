import { ConfigService } from '@klazzroom/client-common-config-core';

export default function (configService: ConfigService) {
  return () =>
    configService.init().then(() => {
      console.log('Config loaded');
      return true;
    });
}
