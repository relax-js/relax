import { actionParams, composeAction } from './composeAction';

function resolveAction(store, next) {
    // Set new state
    store.setState(next);

    // Send result to all subscribers
    const res = Object.assign({}, actionParams(store), next);

    // Send result to all subscribers
    store.callSubscribers(res);

    // Ensure to return promise for sync actions
    return Promise.resolve(res);
}

export default function dispatch(store, action) {
    const result = composeAction(store, action);

    if (!result) throw new Error('Received `undefined` from the dispatched action.');

    // Check if Promise - return async
    if ('then' in result) return Promise.resolve(result).then(next => resolveAction(store, next));

    // Return sync
    return resolveAction(store, result);
}
