const reduxDevTools = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ : undefined;

const devTools = {
    extension: {},
    setOptions: function setOptions(options = {}) {
        this.options = {
            name: options.name || document.title,
        };
    },
    connect: function connect(options, { state, subscribe }) {
        if (!reduxDevTools) return;

        this.setOptions(options);
        this.extension = reduxDevTools.connect(this.options);
        this.extension.init({ state });
        subscribe(this.subscribe.bind(this));
    },
    subscribe: function subscribe({ result, state }) {
        this.extension.send(result._action || 'state changed', state, this.options);
    },
};

export default devTools;
