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
    subscribe: function subscribe(params) {
        if (!params || !params.result || !params.result._action || !params.state) return;

        const { result, state } = params;
        this.ext.send((result && result._action) || 'state changed', state, this.options);
    },
};

export default devTools;
