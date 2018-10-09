### Branches of State
It's practical to need various branches of state and while Relax doesn't do anything special to handle that, it is flexible and easy enough to solve this problem.

Let's say our state looks like this:
```js
{
    config: {}
    viewStates: {
        header: {},
        user: {},
    }
}
```
Create helper for updating `viewStates`
*/viewStates.js*
```js
export const updateViewStates = (state, next) => {
    return {
        viewStates: {
            ...getViewStates(state),
            ...next,
        }
    }
}
```

Say you need an action to update `user.name`

*/Users/actions.js*
```js
// Helper For Updating User State
export const updateUserState = (state, next) => {
    return updateViewStates(state, {
        user: {
            ...getUserState(state),
            ...next,
        }
    })
}

export const updateUserName = (name) => {
    return ({ state }) => {
        return updateUserState(state, {
            name,
        })
    }
}

// Alternatively you can write ES6 shorthand
export const updateUserName = (name) => ({ state }) => (
    updateUserState(state, {
        name,
    })
)
```
When you dispatch `updateUserName` you should get a response like:
```js
{
    viewState: {
        ...
        user: {
            ...
            name: 'New Name'
        }
    }
}
```

As you create your helper functions to update parts of the state, you can import them into any action across your app. In a way, they are like action types if you're coming from redux, but they are much more useful.