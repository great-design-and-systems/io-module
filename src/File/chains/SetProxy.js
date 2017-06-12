const PROXY = process.env.PROXY;

export const SetProxy = (request) => {
    if (PROXY) {
        request.proxy(PROXY);
    }
    return {
        getRequest: function () {
            return request;
        }
    };
} 