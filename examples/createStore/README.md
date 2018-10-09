### Create Store
This is the most basic setup of creating a store.
```js
const store = createStore();
```

`createStore` accepts one parameter, an object of configurations.

Property | Type | Description
|---|---|---|
`initialState` | `object `| The intial state of your app
`devTools` | `object` | Same options you would pass to Redux Dev Tools (beta)

An example of setting `initialState`

```js
const initialState = {
    config: {
        isLoggedIn: false,
    },
    viewStates,
}

const store = createStore({ initialState });
```