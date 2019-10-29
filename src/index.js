import './components/article'
import mainPageStyle from './style/main-page'

const template = document.createElement('template');

template.innerHTML = `
    <style>${mainPageStyle}</style>
    <div class="content">
        <select></select>
        <section></section>
    </div>
`;

class MainPage extends HTMLElement {
    constructor() {
      super();
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.$select = this._shadowRoot.querySelector('select');
      this.$section = this._shadowRoot.querySelector('section');
    }

    async getSources() {
        const response = await fetch`https://newsapi.org/v2/sources?language=en&apiKey=1da957a27579441483751f41847391bf`;
        const data = await response.json();
        this.sources = data.sources;
    }
  
    connectedCallback() {
      this.render();
    }
  
    async render() {
        await this.getSources();
        this.sources.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.innerHTML = item.name;
            
            this.$select.appendChild(option);
        });

        this.$select.addEventListener('change', async () => {
            this.$section.innerHTML = '';
            const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${this.$select.value}&apiKey=1da957a27579441483751f41847391bf`)
            const data = await response.json();
            data.articles.forEach(article => {
                const articleContainer = document.createElement('my-article');
                articleContainer.data = JSON.stringify(article);
                this.$section.appendChild(articleContainer);
            });
        })
    }
  }
  
  window.customElements.define('main-page', MainPage);