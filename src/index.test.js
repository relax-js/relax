import { createStore } from './index';

/** Actions */
const updateUser = (state, next) => ({
    user: {
        ...state.user,
        ...next,
    },
});

const updateName = name => ({ state }) => ({
    _action: 'updateName',
    ...updateUser(state, {
        name,
    }),
});

const fetchData = () => ({ dispatch }) => (
    Promise.resolve(dispatch(updateName('Relax Is Amazing!'))).then(result => ({
        _action: 'fetchData',
        ...result,
    }))
);

/** Test */
describe('Relax', () => {
    it('basic setup', () => {
        const store = createStore();
        expect(store).toMatchSnapshot();
    });

    it('initial state', () => {
        const initialState = {
            name: 'Relax',
        };
        const store = createStore({ initialState });
        expect(store.getState()).toMatchSnapshot(initialState);
        expect(store.getState().name).toEqual('Relax');
    });

    it('Dispatch Sync', () => {
        const store = createStore();
        store.dispatch(updateName('Relax Is Awesome!')).then(({ state }) => {
            expect(state.user.name).toEqual('Relax Is Awesome!');
        });
        expect(store.getState()).toMatchSnapshot();
        expect(store.getState().user.name).toEqual('Relax Is Awesome!');
    });

    it('Nest Dispatch Async', () => {
        const store = createStore();
        store.dispatch(fetchData()).then(({ state }) => {
            expect(state.user.name).toEqual('Relax Is Amazing!');
        });
        expect(store.getState()).toMatchSnapshot();
        expect(store.getState().user.name).toEqual('Relax Is Amazing!');
    });
});
