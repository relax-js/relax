export function actionParams(store) {
    return {
        state: store.getState(),
        dispatch: store.dispatch,
    };
}

export function composeAction(store, action) {
    return (typeof action === 'function')
        ? action(actionParams(store))
        : action;
}
