export class WCHeader extends HTMLElement {
  static template() {
    return `
      <style>
        nav {
          height: 10px;
        }
      </style>
      <nav>
        Hello
      </nav>
    `;
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

const template = document.createElement('template');
template.innerHTML = WCHeader.template();
