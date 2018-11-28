import dispatch from './dispatch';

function createStore(options = {}) {
    let state = options.initialState || {};

    const store = {
        subscribers: [],
        callSubscribers: function callSubscribers(response) {
            Promise.all(this.subscribers.map((fn, i) => Promise.resolve(fn(
                Object.assign({}, response, {
                    unsubscribe: () => this.unsubscribe(i),
                }),
            ))));
        },
        getState: function getState() {
            return state;
        },
        setState: function setState(next) {
            state = Object.assign({}, this.getState(), next);
        },
        subscribe: function subscribe(fn) {
            this.subscribers.push(fn);
        },
        unsubscribe: function unsubscribe(i) {
            if (i in this.subscribers) this.subscribers.splice(i, 1);
        },
    };

    store.dispatch = action => dispatch(store, action);

    return store;
}

export default createStore;
