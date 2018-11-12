import { actionParams, composeAction } from './composeAction';

function resolveAction(store, result) {
    // For nested dispatch calls - only return result
    if (!result || result.dispatch) return result;

    // Set new state - don't return _action
    const next = Object.assign({}, result);
    delete next._action;
    store.setState(next);

    // Send result to all subscribers
    const response = Object.assign({}, actionParams(store), { result });

    // Send result to all subscribers
    store.callSubscribers(response);

    // Ensure to return promise for sync actions
    return response;
}

export default function dispatch(store, action) {
    const result = composeAction(store, action);

    if (!result) return result;

    // Check if Promise - return async
    if ('then' in result) return Promise.resolve(result).then(data => resolveAction(store, data));

    // Return sync
    return Promise.resolve(resolveAction(store, result));
}
