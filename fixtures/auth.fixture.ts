import { test as base } from '@playwright/test';
import * as path from 'path';

// Auth fixture: reuses a stored login state so tests skip the login step.
// Run: npx playwright test --project=setup --grep @setup  to generate the
// storageState files, then remove the skip tag and run your full suite.
//
// Auth module detected: WebShop | Top Menu

export type AuthFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: [async ({ page, context }, use) => {
    // TODO: populate the storageState path after running the setup project
    const storageStatePath = path.join(__dirname, '..', '.auth', 'webshopTopMenu-state.json');
    try {
      await context.addCookies(
        (JSON.parse(require('fs').readFileSync(storageStatePath, 'utf-8')) as any).cookies ?? []
      );
    } catch {
      // storageState file missing — run setup project first
    }
    await use();
  }, { auto: false }],
});

export { expect } from '@playwright/test';
