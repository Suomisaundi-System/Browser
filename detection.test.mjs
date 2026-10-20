import test from 'node:test';
import assert from 'node:assert/strict';
import {detectBrowser} from './detection.js';
test('Firefox',()=>assert.equal(detectBrowser({ua:'Mozilla/5.0 Firefox/140.0'}).name,'Firefox'));
test('Edge',()=>assert.equal(detectBrowser({ua:'Mozilla/5.0 Chrome/131.0 Edg/131.0'}).name,'Edge'));
test('Samsung',()=>assert.equal(detectBrowser({ua:'Mozilla/5.0 Chrome/130 SamsungBrowser/27.0'}).name,'Samsung Internet'));
test('Safari',()=>assert.equal(detectBrowser({ua:'Mozilla/5.0 Version/18.0 Safari/605.1.15'}).name,'Safari'));
test('unknown',()=>assert.equal(detectBrowser({ua:''}).name,'Unknown'));
