import { createStore } from './index';

describe('Relax', () => {
    it('basic setup', () => {
        const store = createStore();
        expect(store).toMatchSnapshot();
    });
});
