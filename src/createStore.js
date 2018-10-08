import devTools from './devTools';
import { actionParams, composeAction } from './composeAction';

const createStore = (options = {}) => {
    let state = options.initialState || {};

    const store = {
        subscribers: [],
        callSubscribers: function callSubscribers(response) {
            Promise.all(this.subscribers.map((fn, i) => Promise.resolve(fn({
                ...response,
                unsubscribe: () => this.unsubscribe(i),
            }))));
        },
        dispatch: async function dispatch(action) {
            if (!action) return undefined;

            let result = composeAction(this, action);

            // Check if promise
            if ('then' in result) result = await result;

            // Exclude _action from result
            const { _action, ...changed } = result;

            // Set new state
            this.setState(changed);

            // Send result to all subscribers
            const response = {
                ...actionParams(this),
                result,
            };

            // Send result to all subscribers
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
