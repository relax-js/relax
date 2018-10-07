import devTools from './devTools';
import { composeAction } from './composeAction';

const createStore = (options) => {
    let state = options.initialState || {};

    const store = {
        subscribers: [],
        callSubscribers: function callSubscribers(params) {
            Promise.all(this.subscribers.map((fn, i) => Promise.resolve(fn({
                ...params,
                dispatch: this.dispatch,
                getState: this.getState,
                unsubscribe: () => this.unsubscribe(i),
            }))));
        },
        dispatch: async function dispatch(action) {
            let response = composeAction(this, action);

            // Check if promise
            if ('then' in response) response = await response;

            // Exclude _action from response
            const { _action, ...changed } = response;

            // Set new state
            this.setState(changed);

            // Send response to all subscribers
            store.callSubscribers(response);

            return response;
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
