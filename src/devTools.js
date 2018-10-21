const lib = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ : undefined;

const devTools = {
    ext: {},
    connect: function connect(options = {}, { state, subscribe }) {
        if (!lib) return;

        this.options = {
            name: options.name || document.title,
        };

        this.ext = lib.connect(this.options);
        this.ext.init({ state });
        subscribe(this.subscribe.bind(this));
    },
    subscribe: function subscribe({ result, state }) {
        this.ext.send((result && result._action) || 'state changed', state, this.options);
    },
};

export default devTools;
