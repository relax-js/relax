### Asynchronous Actions With Relax
My biggest issue with redux is that you need middleware to create an asynchronous action. Relax supports promises out of the box!

```js
// asynchronous action
const fetchData = (api) => {
    return fetch(api)
        .then(data => data)
        .then(result => ({
            apiData: result,
        });
}

store.dispatch(fetchData('/someApi'));
// When fetch promise resolves
console.log(store.getState()) // { apiData: {...} }
```

You could rewrite the action above with `async/await`
```js
// asynchronous action
const fetchData = async (api) => {
    const response = fetch(api)
    const apiData = await response;

    return {
        apiData,
    }
}

store.dispatch(fetchData('/someApi')).then(({ state }) => {
    console.log(state) // { apiData: {...} }
});
```

#### Waiting On Your Actions
```js
const runSequence = () => {
    Promise.all([
        store.dispatch(fetchData('/someApi')),
        store.dispatch(anotherAsyncAction()),
        store.dispatch(anotherAsyncAction()),
    ]).then(() => {
        // all 3 are done
    })
}
```