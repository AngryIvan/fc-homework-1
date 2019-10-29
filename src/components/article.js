import articleStyle from './article-style'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${articleStyle}
  </style>
  <div class="container">
    <article>
        <img src="https://1m19tt3pztls474q6z46fnk9-wpengine.netdna-ssl.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png" alt="thumbnail">
        <div class="content">
            <h2>Title</h2>
            <p>Description</p>
            <a href="#" target="_blank">Read more...</a>
        </div>
    </article>
  </div>
`;

class Article extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this._shadowRoot.querySelector('.container');
    this.$article = this._shadowRoot.querySelector('article');
    this.$title = this._shadowRoot.querySelector('h2');
    this.$thumbnail = this._shadowRoot.querySelector('img');
    this.$description = this._shadowRoot.querySelector('p');
    this.$link = this._shadowRoot.querySelector('a');
  }

  get data() {
    return this.getAttribute('data');
  }

  set data(value) {
    this.setAttribute('data', value);
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const data = JSON.parse(this.data);
    this.$title.innerHTML = data.title;
    if (data.urlToImage) this.$thumbnail.src = data.urlToImage;
    this.$description.innerHTML = data.content;
    this.$link.href = data.url;
  }
}

window.customElements.define('my-article', Article);