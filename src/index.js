import './components/article'

const content = document.createElement('div');
document.body.appendChild(content);
    
const select = document.createElement('select');
content.appendChild(select);

const newsContainer = document.createElement('div');
content.appendChild(newsContainer);

getSources();

async function getSources() {
    return fetch`https://newsapi.org/v2/sources?language=en&apiKey=1da957a27579441483751f41847391bf`
    .then(res => res.json())
    .then(result => result.sources.forEach(item => {

        const option = document.createElement('option');
        option.value = item.id;
        option.innerHTML = item.name;
        
        select.appendChild(option);
    }));
}

select.onchange = function() {
    newsContainer.innerHTML = '';
    fetch(`https://newsapi.org/v2/top-headlines?sources=${select.value}&apiKey=1da957a27579441483751f41847391bf`)
    .then(res => res.json())
    .then(result => result.articles.forEach(article => {
        const articleContainer = document.createElement('my-article');
        articleContainer.data = JSON.stringify(article);
        newsContainer.appendChild(articleContainer)
    }));
}