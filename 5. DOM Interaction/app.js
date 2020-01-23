window.customElements.define(
  'x-component',
  class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <h1>Welcome to Web Components!</h1>
        <button></button>
      `;

      this.button = this.shadowRoot.querySelector('button');
      this.button.addEventListener('click', () => {
        this.count = this.count + 1;
      });
      this.count = 0;
    }

    get count() {
      return +this.getAttribute('count');
    }

    set count(val) {
      this.setAttribute('count', val);
    }

    static get observedAttributes() {
      return ['count'];
    }

    attributeChangedCallback() {
      this.update();
    }

    update() {
      this.button.textContent = `Counts: ${this.count}`;
    }
  }
);
