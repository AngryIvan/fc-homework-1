import errorStyle from './error-style'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${errorStyle}
  </style>
  <div class="popup">
    <h3>There has been an error</h3>
  </div>
`;

export default class ErrorHandler extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$popup = this._shadowRoot.querySelector('.popup');
  }

  static getInstance() {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
    
  render() {  }
}

window.customElements.define('error-popup', ErrorHandler);