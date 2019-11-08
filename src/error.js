const template = document.createElement('template');

template.innerHTML = `
  <style>
    .popup {
      top: 0;
      left: 0;
      background-color: red;
      width: 200px;
      height: 200px;
      position: absolute;
      z-index: 2;
    }
  </style>
  <div class="popup">
    <h2>There has been an error</h2>
  </div>
`;

export default class ErrorHandler extends HTMLElement {
  constructor() {
    super();
    this.error = Math.random();
  }

  connectedCallback() {
    this.render();
  }



  static getInstance() {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
      return ErrorHandler.instance;
    }

  render() {
  }
}

window.customElements.define('error-popup', ErrorHandler);