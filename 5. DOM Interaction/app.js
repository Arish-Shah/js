function h(type, attributes, ...children) {
  return {
    type,
    attributes,
    children
  };
}

const App = h(
  'ul',
  { class: 'list' },
  h('li', {}, 'Item 1'),
  h('li', {}, 'Item 2')
);

console.log(App);
