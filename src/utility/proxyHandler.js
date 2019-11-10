export const proxyHandler = {
    get(proxiedClass, method) {
        return (...args) => {
            console.log(`${method} was called with the arguments of ${JSON.stringify(args)}`);
            return proxiedClass[method].apply(this, args);
        };
    }
}