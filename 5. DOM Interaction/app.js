function h(type, props, ...children) {
  props = props || {};
  return { type, props, children };
}

function setProps($element, props) {
  for (const [name, value] of Object.entries(props)) {
    switch (name.toString()) {
      case 'style':
        setStyle($element, value);
        break;
      default:
        setProp($element, name, value);
    }
  }
}

function setStyle($element, style) {
  for (const [property, value] of Object.entries(style)) {
    $element.style[property] = value;
  }
}

function setProp($element, name, value) {
  if (typeof value === 'string') {
    $element.setAttribute(name, value);
  } else {
    $element[name] = value;
  }
}

function render(vNode, $parent) {
  $parent.appendChild(createElement(vNode()));
}

function mount(vNode, $parent, index = 0) {
  console.log(`mounting`);
}

function createElement(vNode) {
  const $element = document.createElement(vNode.type);

  setProps($element, vNode.props);

  if (
    (vNode.children.length === 1 && typeof vNode.children[0] === 'string') ||
    typeof vNode.children[0] === 'number'
  ) {
    $element.appendChild(document.createTextNode(vNode.children[0]));
  } else {
    vNode.children.forEach(child => {
      $element.appendChild(createElement(child));
    });
  }

  return $element;
}

// Component Creation

let counter = 0;

function handleDecrement() {
  counter--;
}

function handleIncrement() {
  counter++;
}

const App = () => {
  const style = {
    width: '100px',
    textAlign: 'center',
    display: 'inline-block'
  };

  return h(
    'div',
    null,
    h('button', { onclick: handleDecrement }, '-'),
    h('p', { style }, 0),
    h('button', { onclick: handleIncrement }, '+')
  );
};

render(App, document.getElementById('app'));
