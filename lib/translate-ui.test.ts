import assert from 'node:assert';
import { describe, it } from 'node:test';
import { translateUi } from './translate-ui';

describe('translateUi', () => {
  it('returns English copy', () => {
    assert.strictEqual(translateUi('nav.home', 'en'), 'Home');
  });

  it('returns Spanish copy', () => {
    assert.strictEqual(translateUi('breadcrumb.home', 'es'), 'Inicio');
  });

  it('returns Japanese copy', () => {
    assert.ok(translateUi('article.siblingsTitle', 'ja').includes('フォルダ'));
  });
});
