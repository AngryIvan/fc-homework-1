import API_KEY from "../constants/API_KEY";

export class GetFetch {
    constructor(props) {
        this.props = props;
        if (props.queryType === 'sources') {
            return this.fetchSources()
        }

        if (props.queryType === 'top-headlines') {
            return this.fetchHeadlines()
        }
    }

    fetchSources() {
        return fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${API_KEY}`)
                    .then(res => res.json())
                    .then(result => result.sources);
    }

    fetchHeadlines() {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${this.props.source}&apiKey=${API_KEY}`)
                    .then(res => res.json())
                    .then(result => result.articles);
    }

}