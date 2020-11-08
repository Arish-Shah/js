export class WCInput extends HTMLElement {
  static template() {
    return `
      <input />  
    `;
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

const template = document.createElement('template');
template.innerHTML = WCInput.template();
