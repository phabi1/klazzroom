import { libsServerMongooseNormalize } from './libs-server-mongoose-normalize';

describe('libsServerMongooseNormalize', () => {
  it('should work', () => {
    expect(libsServerMongooseNormalize()).toEqual(
      'libs-server-mongoose-normalize'
    );
  });
});
