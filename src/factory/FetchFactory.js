import { GetFetch } from "./GetFetch";
import { PostFetch } from "./PostFetch";
import { proxyHandler } from "../utility/proxyHandler";

export class FetchFactory {
    constructor(type, props) {
        if(type === "get") {
            const proxy = new Proxy(new GetFetch(props), proxyHandler);
            if (props.queryType === 'sources') {
                return proxy.fetchSources()
            }
            if (props.queryType === 'top-headlines') {
                return proxy.fetchHeadlines(props.source)
            }
        }
        
        if(type === "post") return new PostFetch(props);
    }
};