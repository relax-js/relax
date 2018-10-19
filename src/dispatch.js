import { actionParams, composeAction } from './composeAction';

export default function dispatch(store, action) {
    const result = composeAction(store, action);

    if (!action) throw new Error('Received `undefined` from the dispatched action.');

    // Check if promise
    if ('then' in result) return Promise.resolve(action).then(a => dispatch(store, a));

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

    return Promise.resolve(response);
}
