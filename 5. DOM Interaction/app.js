function h(type, props, ...children) {
  props = props || {};
  return { type, props, children };
}

function render(vNode, $parent) {
  $parent.appendChild(createElement(vNode()));
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
