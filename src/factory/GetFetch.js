import API_KEY from "../constants/API_KEY";

export class GetFetch {
    fetchSources() {
        return fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${API_KEY}`)
                    .then(res => res.json())
                    .then(result => result.sources);
    }

    fetchHeadlines(source) {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`)
                    .then(res => res.json())
                    .then(result => result.articles);
    }

}
