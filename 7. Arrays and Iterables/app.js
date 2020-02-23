const hobbies = ['Sports', 'Gaming'];

hobbies.push('Swimming');
hobbies.pop();
hobbies.unshift('Boating');
hobbies.shift();
hobbies.splice(1, 0, 'Running', 'Hunting');
const newHobbies = hobbies.slice();

console.log(newHobbies);

class XComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <input type="text" />
      <h1></h1>
    `;
    this.input = this.shadowRoot.querySelector('input');
    this.h1 = this.shadowRoot.querySelector('h1');

    this.input.addEventListener('input', e => {
      this.message = e.target.value;
    });
  }

  static get observedAttributes() {
    return ['message'];
  }

  attributeChangedCallback() {
    this.update();
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(val) {
    this.setAttribute('message', val);
  }

  update() {
    this.h1.textContent = this.message;
  }
}

customElements.define('x-component', XComponent);
