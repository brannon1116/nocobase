import { mockServer } from '@nocobase/test';
import PluginACL from '../server';

export async function prepareApp() {
  const app = mockServer({
    registerActions: true,
    acl: true,
    plugins: ['error-handler', 'users', 'ui-schema-storage', 'collection-manager'],
  });

  app.plugin(PluginACL, {
    name: 'acl',
  });

  await app.loadAndInstall({ clean: true });

  await app.db.sync();

  return app;
}
