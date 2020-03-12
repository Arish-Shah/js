class WCCounter extends HTMLElement {
  static template() {
    return `
      <style>
        .wc-counter {
          display: flex;
          align-items: center;
        }

        h1 {
          text-align: center;
          width: 100px;
        }
      </style>
      <div class="wc-counter">
        <button>-</button>
        <h1>0</h1>
        <button>+</button>
      </div>
    `;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.buttons = this.shadowRoot.querySelectorAll('button');
    this.h1 = this.shadowRoot.querySelector('h1');

    this.count = this.start;

    this.buttons[0].addEventListener('click', () => {
      this.count -= this.step;
    });

    this.buttons[1].addEventListener('click', () => {
      this.count += this.step;
    });
  }

  static get observedAttributes() {
    return ['count'];
  }

  get count() {
    return +this.getAttribute('count');
  }

  set count(value) {
    this.setAttribute('count', value);
  }

  get start() {
    return +this.getAttribute('start') || 0;
  }

  get step() {
    return +this.getAttribute('step') || 1;
  }

  attributeChangedCallback() {
    this.h1.textContent = this.count;
  }
}

let template = document.createElement('template');
template.innerHTML = WCCounter.template();

customElements.define('wc-counter', WCCounter);
