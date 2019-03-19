import getApp from '..';
import container from '../container';

const { logger } = container;
const log = logger('server:');

const port = process.env.PORT || 4000;
getApp().listen(port, () => log(`port: ${port}`));
