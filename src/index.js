import './components/article'
import mainPageStyle from './components/main-page-style'
import API_KEY from './constants/API_KEY'
import { FetchFactory } from './factory/FetchFactory';

const template = document.createElement('template');

template.innerHTML = `
    <style>${mainPageStyle}</style>
    <div class="content">
        <select></select>
        <button>Click me to throw an error</button>
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
            this.sources = await new FetchFactory('get', {queryType: 'sources'});
        } catch(e) {
            this.handleError();
        }

    }

    handleError() {
        import('./components/error').then(module => {
            const handler = module.default;
            handler.getInstance().render();
            this.$section.appendChild(handler.getInstance());
            const $popup = this._shadowRoot.querySelector('error-popup');
            setTimeout(() => $popup.parentNode.removeChild($popup), 3000);
        });
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
                const articles = await new FetchFactory('get', {queryType: 'top-headlines', source: this.$select.value});

                articles.forEach(article => {
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
