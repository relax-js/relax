import { actionParams, composeAction } from './composeAction';

function buildResponse(store, result) {
    return Object.assign({}, actionParams(store), { result });
}

function defaultResponse(store, result) {
    return Promise.resolve(buildResponse(store, result));
}

function resolveAction(store, result) {
    // For nested dispatch calls - only return result
    if (!result || result.dispatch) return defaultResponse(store, result);

    // Set new state - don't return _action
    const next = Object.assign({}, result);
    delete next._action;
    store.setState(next);

    // Send result to all subscribers
    const response = buildResponse(store, result);
    store.callSubscribers(response);

    // Ensure to return promise for sync actions
    return response;
}

export default function dispatch(store, action) {
    const result = composeAction(store, action);

    // If action returned undefined then drop out here but return default response
    if (!result) return defaultResponse(store, result);

    // Check if Promise - return async
    if ('then' in result) return Promise.resolve(result).then(data => resolveAction(store, data));

    // Return sync
    return Promise.resolve(resolveAction(store, result));
}
