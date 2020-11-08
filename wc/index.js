import { WCHeader } from './components/wc-header.js';
import { WCRoot } from './components/wc-root.js';
import { WCInput } from './components/wc-input.js';

const components = {
  'wc-header': WCHeader,
  'wc-root': WCRoot,
  'wc-input': WCInput
};

for (let key in components) {
  customElements.define(key, components[key]);
}
