import { actionParams, composeAction } from './composeAction';

export default async function dispatch(store, action) {
    if (!action) return undefined;

    let result = composeAction(store, action);

    // Check if promise
    if ('then' in result) result = await result;

    // Exclude _action from result
    const { _action, ...changed } = result;

    // Set new state
    store.setState(changed);

    // Send result to all subscribers
    const response = {
        ...actionParams(store),
        result,
    };

    // Send result to all subscribers
    store.callSubscribers(response);

    return response;
}
