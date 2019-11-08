import { GetFetch } from "./GetFetch";
import { PostFetch } from "./PostFetch";

export class FetchFactory {
    constructor(type, props) {
        if(type === "get")
        return new GetFetch(props);
        if(type === "post")
        return new PostFetch(props);
    }
};