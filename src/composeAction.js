export const actionParams = function actionParams(store) {
    return {
        state: store.getState(),
        dispatch: store.dispatch.bind(store),
    };
};

export const composeAction = function composeAction(store, action) {
    return (typeof action === 'function')
        ? action(actionParams(store))
        : action;
};
