export class WCRoot extends HTMLElement {
  static template() {
    return `
      <wc-header></wc-header>
      <wc-input></wc-input>
      <wc-notes></wc-notes>
    `;
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.input = this.querySelector('app-input');
  }
}

const template = document.createElement('template');
template.innerHTML = WCRoot.template();
