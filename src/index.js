import './components/article'
import mainPageStyle from './style/main-page-style'
import API_KEY from './constants/API_KEY'

const template = document.createElement('template');

template.innerHTML = `
    <style>${mainPageStyle}</style>
    <div class="content">
        <select></select>
        <button>Click me for an error</button>
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
      this.$errorButton = this._shadowRoot.querySelector('button')
    }

    async getSources() {
        try {
            const response = await fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${API_KEY}`);
            const data = await response.json();
            this.sources = data.sources;
        } catch(e) {
            this.handleError();
        }

    }

    handleError() {
        console.log('There has been an error')
    }
  
    connectedCallback() {
      this.render();
    }
  
    async render() {
        this.$errorButton.addEventListener('click', () => {
            try {
                throw new Error;
            } catch {
                this.handleError();
            }
        })
        try {
            await this.getSources();
            this.sources.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerHTML = item.name;
                
                this.$select.appendChild(option);
            });
        } catch(e) {
            this.handleError();
        }

        this.$select.addEventListener('change', async () => {
            try {
                this.$section.innerHTML = '';
                const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${this.$select.value}&apiKey=${API_KEY}`)
                const data = await response.json();
                data.articles.forEach(article => {
                    const articleContainer = document.createElement('my-article');
                    articleContainer.data = JSON.stringify(article);
                    this.$section.appendChild(articleContainer);
                });
            } catch {
                this.handleError();
            }

        })
    }
  }
  
  window.customElements.define('main-page', MainPage);
