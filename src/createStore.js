import devTools from './devTools';

const createStore = (options) => {
    let state = options.initialState || {};

    const store = {
        subscribers: [],
        callSubscribers: function callSubscribers(params) {
            Promise.all(this.subscribers.map((fn, i) => Promise.resolve(fn({
                ...params,
                state: this.getState(),
                unsubscribe: () => this.unsubscribe(i),
            }))));
        },
        dispatch: function dispatch(params) {
            return Promise.resolve(params.response).then((response) => {
                // Get action and delete from response
                const { _action } = response;
                delete response._action;

                // Set new state
                this.setState(response);

                // Return params
                return {
                    _action,
                    ...params,
                    response,
                };
            });
        },
        getState: function getState() {
            return state;
        },
        setState: function setState(next) {
            state = {
                ...this.getState(),
                ...next,
            };
        },
        subscribe: function subscribe(fn) {
            this.subscribers.push(fn);
        },
        unsubscribe: function unsubscribe(i) {
            if (i in this.subscribers) this.subscribers.splice(i, 1);
        },
    };

    /** Redux DevTool */
    devTools.connect(options.devTools, {
        state,
        subscribe: store.subscribe.bind(store),
    });

    return store;
};

export default createStore;
