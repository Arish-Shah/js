// class Product {
//   title = 'DEFAULT';
//   imageUrl;
//   description;
//   price;

//   constructor(title, image, desc, price) {
//     this.title = title;
//     this.imageUrl = image;
//     this.description = desc;
//     this.price = price;
//   }
// }

// const productList = {
//   products: [
//     new Product(
//       'A Pillow',
//       'https://cdn.pixabay.com/photo/2016/03/07/10/31/pillow-1241878_960_720.jpg',
//       'A soft pillow!',
//       19.99
//     ),
//     new Product(
//       'A Carpet',
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/800px-Ardabil_Carpet.jpg',
//       'A carpet which you might like - or not.',
//       89.99
//     )
//   ],

//   render() {
//     const renderHook = document.getElementById('app');
//     const prodList = document.createElement('ul');
//     prodList.className = 'product-list';

//     for (const prod of this.products) {
//       const prodEl = document.createElement('li');
//       prodEl.className = 'product-item';
//       prodEl.innerHTML = `
//         <div>
//           <img src="${prod.imageUrl}" alt="${prod.title}" />
//           <div class="product-item__content">
//             <h2>${prod.title}</h2>
//             <h3>\$${prod.price}</h3>
//             <p>${prod.description}</p>
//             <button>Add to Cart</button>
//           </div>
//         </div>
//       `;
//       prodList.appendChild(prodEl);
//     }

//     renderHook.appendChild(prodList);
//   }
// };

// productList.render();

// function Scope() {
//   this.name = 'hello';
// }

// Scope.prototype.sayHello = function() {};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}

var marker = Math.random()
  .toString(36)
  .slice(2)
  .padStart(10, '0');
var attributeMarker = 'font-family:'.concat(marker);
var IEStyleMarker = 'font-family: '.concat(marker, ';');
var commentMarker = 'comment-'.concat(marker);
var failMarker = 'node-'.concat(marker);
var nodeMarker = ''.concat(failMarker, '" ').concat(failMarker, ' ');

var moveNodes = function moveNodes(oldParent) {
  var previous =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var after =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var newParent = arguments.length > 3 ? arguments[3] : undefined;
  var before = arguments.length > 4 ? arguments[4] : undefined;
  var nodeToMove = previous ? previous.nextSibling : oldParent.firstChild;
  if (nodeToMove !== null) {
    var move;
    if (newParent instanceof Node) {
      move = function move() {
        return newParent.insertBefore(nodeToMove, before);
      };
    } else {
      move = function move() {
        return oldParent.removeChild(nodeToMove);
      };
    }
    var nextNode;
    while (nodeToMove !== after) {
      nextNode = nodeToMove.nextSibling;
      move(nodeToMove);
      nodeToMove = nextNode;
    }
  }
};

var directives = new WeakMap();
var isDirective = function isDirective(value) {
  return directives.has(value);
};

var isSerializable = function isSerializable(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
};
var isIterable = function isIterable(nonPrimitive) {
  return Array.isArray(nonPrimitive) || nonPrimitive[Symbol.iterator];
};
var noChange = {};
var emptyNode = {};
var iterableNode = {};
var NodePart = (function() {
  function NodePart(_ref) {
    var node = _ref.node,
      parent = _ref.parent,
      before = _ref.before,
      after = _ref.after;
    _classCallCheck(this, NodePart);
    this.node = node || emptyNode;
    this.value = noChange;
    this.parentNode = parent || (node && node.parentNode);
    this.beforeNode = before || (node && node.previousSibling);
    this.afterNode = after || (node && node.nextSibling);
  }
  _createClass(NodePart, [
    {
      key: 'render',
      value: function render(value) {
        if (isDirective(value)) {
          value(this);
        } else if (value !== noChange) {
          if (value == null) {
            this.clear();
          } else if (isSerializable(value)) {
            this._renderText(value);
          } else if (value instanceof TemplateResult) {
            this._renderTemplateResult(value);
          } else if (isIterable(value)) {
            this._renderIterable(value);
          } else if (value instanceof Node) {
            this._renderNode(value);
          } else if (value.then !== undefined) {
            this._renderPromise(value);
            return;
          } else {
            value = String(value);
            this._renderText(value);
          }
          this.promise = undefined;
          this.value = value;
        }
      }
    },
    {
      key: '_renderText',
      value: function _renderText(serializable) {
        if (this.value !== serializable) {
          if (this.node.nodeType === 3) {
            this.node.textContent = serializable;
          } else {
            this._renderNode(document.createTextNode(serializable));
          }
        }
      }
    },
    {
      key: '_renderTemplateResult',
      value: function _renderTemplateResult(templateResult) {
        this.templateInstances = this.templateInstances || new Map();
        var instance = this.templateInstances.get(templateResult.template);
        if (!instance) {
          instance = new TemplateInstance(
            templateResult.template,
            this.parentNode,
            this.beforeNode,
            this.afterNode
          );
          this.templateInstances.set(templateResult.template, instance);
        }
        if (this.node !== instance.fragment) {
          this.clear();
          this.parentNode.insertBefore(instance.fragment, this.afterNode);
          this.node = instance.fragment;
        }
        instance.render(templateResult.values);
      }
    },
    {
      key: '_renderIterable',
      value: function _renderIterable(iterable) {
        if (this.node !== iterableNode) {
          this.clear();
          this.node = iterableNode;
          if (!this.iterableParts) {
            this.iterableParts = [];
          } else {
            this.iterableParts.length = 0;
          }
        }
        var index = 0;
        var before = this.afterNode
          ? this.afterNode.previousSibling
          : this.parentNode.lastChild;
        var after;
        var parent = this.parentNode;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        try {
          for (
            var _iterator = iterable[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var value = _step.value;
            var part = this.iterableParts[index];
            if (part === undefined) {
              after = document.createTextNode('');
              this.parentNode.insertBefore(after, this.afterNode);
              part = new NodePart({
                before: before,
                after: after,
                parent: parent
              });
              this.iterableParts.push(part);
              before = after;
            }
            part.render(value);
            index++;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return'] != null) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        if (index === 0) {
          moveNodes(this.parentNode, this.beforeNode, this.afterNode);
        } else if (index < this.iterableParts.length) {
          var lastPart = this.iterableParts[index - 1];
          moveNodes(this.parentNode, lastPart.afterNode, this.afterNode);
        }
        this.iterableParts.length = index;
      }
    },
    {
      key: '_renderNode',
      value: function _renderNode(node) {
        if (this.node !== node) {
          this.clear();
          this.parentNode.insertBefore(node, this.afterNode);
          this.node = node;
        }
      }
    },
    {
      key: '_renderPromise',
      value: function _renderPromise(promise) {
        var _this = this;
        if (this.promise !== promise) {
          this.promise = promise;
          promise.then(function(value) {
            if (_this.promise === promise) {
              _this.promise = undefined;
              _this.render(value);
            }
          });
        }
      }
    },
    {
      key: 'clear',
      value: function clear() {
        moveNodes(
          this.parentNode,
          this.beforeNode,
          this.afterNode,
          this.node instanceof DocumentFragment && this.node
        );
        this.node = emptyNode;
      }
    }
  ]);
  return NodePart;
})();
var CommentPart = (function() {
  function CommentPart(_ref2) {
    var node = _ref2.node;
    _classCallCheck(this, CommentPart);
    this.node = node;
  }
  _createClass(CommentPart, [
    {
      key: 'render',
      value: function render(value) {
        this.node.textContent = value;
      }
    }
  ]);
  return CommentPart;
})();
var AttributePart = (function() {
  function AttributePart(_ref3) {
    var node = _ref3.node,
      attribute = _ref3.attribute;
    _classCallCheck(this, AttributePart);
    this.node = node;
    switch (attribute[0]) {
      case '.':
        this._render = this._renderProperty;
      case '?':
        this._render = this._render || this._renderBoolean;
      case '@':
        this._render = this._render || this._renderEvent;
        this.node.removeAttribute(attribute);
        this.name = attribute.slice(1);
        break;
      default:
        this._render = this._renderAttribute;
        this.name = attribute;
    }
  }
  _createClass(AttributePart, [
    {
      key: 'render',
      value: function render(value) {
        if (isDirective(value)) {
          value(this);
        } else if (value !== noChange) {
          this._render(value);
        }
      }
    },
    {
      key: '_renderProperty',
      value: function _renderProperty(value) {
        this.node[this.name] = value;
      }
    },
    {
      key: '_renderBoolean',
      value: function _renderBoolean(_boolean) {
        if (this.value !== !!_boolean) {
          _boolean
            ? this.node.setAttribute(this.name, '')
            : this.node.removeAttribute(this.name);
          this.value = !!_boolean;
        }
      }
    },
    {
      key: '_renderEvent',
      value: function _renderEvent(listener) {
        if (this.value !== listener) {
          this.node.removeEventListener(this.name, this.value);
          this.node.addEventListener(this.name, listener);
          this.value = listener;
        }
      }
    },
    {
      key: '_renderAttribute',
      value: function _renderAttribute(string) {
        if (this.value !== string) {
          this.node.setAttribute(this.name, string);
          this.value = string;
        }
      }
    }
  ]);
  return AttributePart;
})();

var lastAttributeNameRegex = /[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=$/;
var filter = [].filter;
var findParts = function findParts(strings, template) {
  var parts = [];
  var recursiveSearch = function recursiveSearch(node, path) {
    if (node.nodeType === 8) {
      if (node.nodeValue === commentMarker) {
        parts.push({
          type: CommentPart,
          path: path
        });
      } else if (node.nodeValue === nodeMarker) {
        parts.push({
          type: NodePart,
          path: path
        });
      }
    } else {
      if (node.nodeType === 1) {
        if (node.hasAttribute(failMarker)) {
          throw new Error(
            "The '>' character is not allowed in attribute literals. Replace with '&gt;'"
          );
        }
        if (node.hasAttribute(attributeMarker)) {
          node.removeAttribute(attributeMarker);
          var dynamicAttributes = filter.call(node.attributes, function(
            attribute
          ) {
            return attribute.value === attributeMarker;
          }).length;
          if (node.getAttribute('style') === IEStyleMarker) {
            dynamicAttributes += 1;
          }
          for (var i = 0; i < dynamicAttributes; i++) {
            var attribute = lastAttributeNameRegex.exec(
              strings[parts.length]
            )[1];
            parts.push({
              type: AttributePart,
              path: path,
              attribute: attribute
            });
          }
        }
      }
      var children = node.childNodes;
      var length = children.length;
      for (var _i = 0; _i < length; _i++) {
        recursiveSearch(children[_i], path.concat([_i]));
      }
    }
  };
  recursiveSearch(template.content, []);
  if (parts.length < strings.length - 1) {
    throw new Error(
      "Double attribute assignments are not allowed: '<div a=${0} a=${0}>'"
    );
  }
  return parts;
};

var attributeMarkerTag = ''
  .concat(attributeMarker, ' ')
  .concat(attributeMarker);
var commentMarkerTag = '--><!--'.concat(commentMarker, '--><!-- ');
var nodeMarkerTag = '<!--'.concat(nodeMarker, '-->');
var attributeContext = {};
var commentContext = {};
var nodeContext = {};
var unchangedContext = {};
var markers = new Map();
markers.set(attributeContext, attributeMarkerTag);
markers.set(commentContext, commentMarkerTag);
markers.set(nodeContext, nodeMarkerTag);
var parseContext = function parseContext(string) {
  var openComment = string.lastIndexOf('<!--');
  var closeComment = string.indexOf('-->', openComment + 1);
  var commentClosed = closeComment > -1;
  var context;
  if (openComment > -1 && !commentClosed) {
    context = commentContext;
  } else {
    var closeTag = string.lastIndexOf('>');
    var openTag = string.indexOf('<', closeTag + 1);
    if (openTag > -1) {
      context = attributeContext;
    } else {
      if (closeTag > -1) {
        context = nodeContext;
      } else {
        context = unchangedContext;
      }
    }
  }
  return {
    commentClosed: commentClosed,
    context: context
  };
};
var parseTemplate = function parseTemplate(strings) {
  var html = [];
  var lastStringIndex = strings.length - 1;
  var currentContext = nodeContext;
  for (var i = 0; i < lastStringIndex; i++) {
    var string = strings[i];
    var _parseContext = parseContext(string),
      commentClosed = _parseContext.commentClosed,
      context = _parseContext.context;
    if (
      (currentContext !== commentContext || commentClosed) &&
      context !== unchangedContext
    ) {
      currentContext = context;
    }
    if (currentContext === attributeContext && string.slice(-1) !== '=') {
      throw new Error('Only bare attribute parts are allowed: `<div a=${0}>`');
    }
    html.push(string + markers.get(currentContext));
  }
  html.push(strings[lastStringIndex]);
  return html.join('');
};
var buildTemplate = function buildTemplate(strings) {
  var template = document.createElement('template');
  template.innerHTML = parseTemplate(strings);
  return template;
};

var templateMap = new Map();
var Template = function Template(strings) {
  _classCallCheck(this, Template);
  this.strings = strings;
  this.element = buildTemplate(strings);
  this.parts = findParts(strings, this.element);
};
var TemplateResult = (function() {
  function TemplateResult(strings, values) {
    _classCallCheck(this, TemplateResult);
    this.strings = strings;
    this.values = values;
    this._template = undefined;
  }
  _createClass(TemplateResult, [
    {
      key: 'template',
      get: function get() {
        if (this._template) {
          return this._template;
        }
        var template = templateMap.get(this.strings);
        if (!template) {
          template = new Template(this.strings);
          templateMap.set(this.strings, template);
        }
        this._template = template;
        return template;
      }
    }
  ]);
  return TemplateResult;
})();
var TemplateInstance = (function() {
  function TemplateInstance(template, parent, before, after) {
    var _this = this;
    _classCallCheck(this, TemplateInstance);
    this.template = template;
    this.fragment = template.element.content.cloneNode(true);
    var parts = this.template.parts.map(function(part) {
      var node = _this.fragment;
      part.path.forEach(function(nodeIndex) {
        node = node.childNodes[nodeIndex];
      });
      part.node = node;
      if (part.type === NodePart) {
        if (part.path.length === 1) {
          part.parent = parent;
          part.before = node.previousSibling || before;
          part.after = node.nextSibling || after;
        } else {
          part.parent = node.parentNode;
        }
      }
      return part;
    });
    this.parts = parts.map(function(part) {
      return new part.type(part);
    });
  }
  _createClass(TemplateInstance, [
    {
      key: 'render',
      value: function render(values) {
        this.parts.map(function(part, index) {
          return part.render(values[index]);
        });
      }
    }
  ]);
  return TemplateInstance;
})();

var nodeParts = new WeakMap();
var render = function render(content, target) {
  var part = nodeParts.get(target);
  if (!part) {
    part = new NodePart({
      parent: target
    });
    nodeParts.set(target, part);
  }
  part.render(content);
};

var html = function html(strings) {
  for (
    var _len = arguments.length,
      values = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    values[_key - 1] = arguments[_key];
  }
  return new TemplateResult(strings, values);
};
var amp = {
  component: function component(componentName, _ref) {
    var data = _ref.data,
      methods = _ref.methods,
      props = _ref.props,
      template = _ref.template;
    var domNodes = document.querySelectorAll(componentName);
    if (!domNodes.length) {
      throw new Error(
        'There is no component called '.concat(
          componentName,
          ' in the Document.'
        )
      );
    }
    domNodes.forEach(function(domNode) {
      var state = _objectSpread2(
        {},
        JSON.parse(JSON.stringify(data)),
        {},
        methods
      );
      var onMountFunction;
      var onUpdateFunction;
      if (props && props.length) {
        state.props = {};
        var passedProps = Array.from(domNode.attributes);
        passedProps.forEach(function(passedProp) {
          var name = passedProp.name;
          var value = passedProp.value;
          if (props.indexOf(name) > -1) {
            state.props[name] = value;
            domNode.removeAttribute(name);
          }
        });
        if (JSON.stringify(state.props) === '{}') {
          delete state.props;
        }
      }
      Object.keys(state).forEach(function(key) {
        var internalValue = state[key];
        if (typeof internalValue === 'function') {
          state[key] = state[key].bind(state);
          if (key === 'onmount') {
            onMountFunction = state[key];
          }
          if (key === 'onupdate') {
            onUpdateFunction = state[key];
          }
        } else {
          if (key !== 'props') {
            Object.defineProperty(state, key, {
              get: function get() {
                return internalValue;
              },
              set: function set(newValue) {
                internalValue = newValue;
                render(template(state), domNode);
                if (onUpdateFunction) {
                  onUpdateFunction();
                }
              }
            });
          }
        }
      });
      render(template(state), domNode);
      if (onMountFunction) {
        onMountFunction();
      }
    });
  }
};

export default amp;
export { html, render };
