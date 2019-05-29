# starter-kit-web

A starter kit for web applications.

## Copying

1. Download and extract the repository.
2. Rename the folder to the name of your project.
3. Start hacking.

## Developing

```bash
./script/watch
```

You can start the application with by running the `watch` script in your terminal. Any changes will reload the page so you don't have to.

The code lives in the `src/` folder.

## Tests

```bash
./script/test
CI=true ./script/test
```

You can run the tests with the `test` script.

Tests live in the `src/` folder, and must be named `*.test.ts`.

Run tests in CI by setting the `CI` environment variable to `true`.

## Debugging

You can debug the app in any browser using its Developer Tools.

You are able to attach to the `test` script at `localhost:9243`.

> NodeJS apps are debugged using the Chrome DevTools Protocol. That means
> that Chrome the browser can also be your debugger. Visit `chrome://inspect`
> in your browser to open a debugger for Node.
>
> You can also debug in VS Code by using the "Launch Chrome", "Attach to Chrome", and "Attach to Tests" tasks.

## Adding Features

> This is not meant to be a comprehensive guide using TypeScript, writing
> React components, Redux, etc.

### Basics

Make a new folder named after your feature in the `src/` folder. Any
components you build, any redux actions your create, they all live there.

Add any routes for your features to `src/Routes.tsx`.

If your feature has a redux reducer, add it to `src/redux/rootReducer.ts`.

See `src/exampleFeature/` to see an example feature, and those files
mentioned above on how it's integrated into the rest of the app.

### React Components

Let's build a simple counter with React. It displays a number that will
increment by a variable amount when a button is clicked.

```typescript
// There is a commonUi file with common UI components for you to easily import
import {
  Button,
  PureComponent,
  React,
  TextField,
  Typography,
} from '@src/commonUi'

// This is how our state looks.
// State is an object private to your component. You change your state when
// you want to re-render.
// As mentioned earlier, this component:
// - displays a number
// - increments by a variable amount
// So naturally we need to keep track of a number to display, and the amount to
// increment it by.
interface State {
  currentNumber: number
  incrementBy: number
}

class Counter extends PureComponent<{}, State> {
  // This is the initial state of our component.
  state: State = {
    incrementBy: 1,
    currentNumber: 0,
  }

  render() {
    return (
      <div>
        {/* Display the current number big and bold. */}
        <Typography type="display3">{this.props.currentNumber}</Typography>

        {/* This is the button that increments the number. */}
        <Button onClick={this.increment}>Increment!</Button>

        <br />

        {/* The input that changes the number we increment by. */}
        <TextField
          value={this.state.incrementBy}
          onChange={this.handleIncrementChange}
          label="Increment By"
          type="number"
        />
      </div>
    )
  }

  // Increment the number.
  increment = () => {
    this.setState({
      currentNumber: this.state.currentNumber + this.state.incrementBy,
    })
  }

  // Change why we increment by when the input is updated.
  handleIncrementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ incrementBy: Number(event.target.value) })
  }
}

export default Counter
```

That's it. Instead of hunting and pecking at random components / references
to components and update some internal value on them like in other interface
libraries, in React you take control of your state and just spit out the
markup for your component.

To use this component, in another file you would do something like:

```typescript
function App() {
  return (
    <div>
      <Counter />
    </div>
  )
}
```

### Redux

#### Background

The goal is to keep components as dead simple as possible. Things will get
messy when dealing with API requests, logged in users, communicating with
other devices, so we want to move that elsewhere.

Enter Redux. Redux solves two things:

1. The ability to move these messy requests to external library files, via `actions`.
2. The ability to respond to those actions and keep track of any data, via `reducers`.

Redux is simple (but not especially easy).

- Actions look like `{ type: 'MY_ACTION' }` with any extra properties you want to add.
- Reducers respond to actions and build a new state object.

```
const state = reducer(state, action)
```

What you end up with is a giant ball of state, comprised of potentially many
different reducers. Reducers can't affect each other, so there's no worry
about side effects.

> **Note** On it's own, Redux has nothing to do with React. It's about
> describing changes and acting on them if you want.
>
> Say you were doing something silly like ... communicating with a drone to
> show it's location on a map.
>
> It sends messages that look like:
>
>     {
>       message: 'GPS_POSITION',
>       latitude: 45.95102,
>       longitude: 12.00931,
>     }
>
> And you respond to that message, storing the latitude and longitude and
> updating a map.
>
> Well what the drone sent you, redux calls an action. You storing that data,
> that's a reducer.

You can, however, connect this giant ball of state to your React components.
The idea is you write a function that pulls any data you want from Redux and
it automatically adds them to the props your component receives, updating
whenever the store does.

It's important to keep that distinction because it allows a nice flow of
data: You get props, you render, you call actions, which changes props,
and this all repeats.

All you are doing is rendering props (aka the core of React) and
calling functions (aka the backbone of an interface). All that mess of
dealing with _data_ is moved out of your interface code.

### Back to the main

So let's rewrite that Counter from above to use Redux. We'll basically be
changing its internal state to props.

Let's start with the component itself:

```ts
// Always with the imports.
import { AppDispatchProps, RootState } from '@src/redux/types'
import { connect } from 'react-redux'

// We will write these actions in a minute.
import actions from './actions'

// The generic types of the component have changed. We are no longer specifying
// our state, and instead we are saying our component takes props from redux
// (via `mapState` below) and `AppDispatchProps`.
class Counter extends PureComponent<
  ReturnType<typeof mapState> & AppDispatchProps
> {
  render() {
    return (
      <div>
        <Typography type="display3">{this.props.currentNumber}</Typography>

        <Button onClick={this.increment}>Increment!</Button>

        <br />

        <TextField
          value={this.props.incrementBy}
          label="Increment By"
          type="number"
          margin="normal"
          onChange={this.handleIncrementChange}
        />
      </div>
    )
  }

  // Increment the number.
  increment = () => {
    this.props.dispatch(actions.increment())
  }

  // Our event handlers have been simplified, all we are doing is calling
  // actions provided by another module.
  handleIncrementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.dispatch(actions.setIncrementBy(Number(event.target.value)))
  }
}

// This is where we pull props from redux. You give it a function that pulls
// anything from the root redux state.
const mapState = (state: RootState) => ({
  currentNumber: state.counter.currentNumber,
  incrementBy: state.counter.incrementBy,
})

// Here we connect to the redux store, via a handy function named `connect`.
export default connect(mapState)(Counter)
```

To use this component, in another file you would do something like:

```typescript
function App() {
  return (
    <div>
      <Counter />
    </div>
  )
}
```

Yep ... exactly the same as above. That's important. To the outside world,
the your component hasn't changed, so nothing should change outside of it.

> **Note** In fact, it doesn't even use `this.state` anymore, making it a
> _stateless functional component_, keyword being _functional_. Instead of
> writing your component as a class, it could be a function instead. One of the
> most innocuous things in programming.

Let's get on to those actions:

```typescript
// Your redux actions will have a `type` property, and your reducers will need
// to act on it. You could just repeat the string, but DRY.
export const constants = applyNamespace('counter', {
  increment: 0,
  setIncrementBy: 0,
})

// See "Easily Create Actions" below for an explanation of createAction.
export const increment = createAction(constants.increment)
export const setIncrementBy = createAction<number>(constants.setIncrementBy)
```

That's them. They only _describe_ the changes that are happening. We still aren't dealing with any data yet. That comes next, in our reducer.

```typescript
import { PayloadType } from 'react-async-payload'

import actions from './actions'

// This is the initial state of our reducer.
export const initialState = {
  currentNumber: 0,
  incrementBy: 1,
}

// `createReducer` is just a helper to make writing reducers more idiomatic.
// You give it an initial state and a map of action types to functions.
export const reducer = createReducer(initialState, {
  // These functions are given the current state of our reducer, the action
  // being dispatched, and return a new state.
  [actions.constants.increment]: (
    state,
    action: PayloadType<typeof actions.increment>,
  ) =>
    // What we're doing here with these `...state` lines is saying "build a new
    // empty object, merge in everything from state, and then anything else
    // specified."
    ({
      ...state,
      currentNumber: state.currentNumber + state.incrementBy,
    }),

  [actions.constants.setIncrementBy]: (
    state,
    action: PayloadType<typeof actions.setIncrementBy>,
  ) => ({
    ...state,
    incrementBy: action.payload,
  }),
})
```

And we are done. Our component pulls data, calls actions, data changes, rinse
and repeat.

But what do we gain? Well!

- Now there is only one place where data is actually changed (the reducer).
- You can change values in `initialState`, now you can recreate the exact same state from disk or network.
- You can log all actions dispatched to replay someone using your app.

And that's just the development side of things. Testing is also very straight forward.

Since your components just accept new props, you test them the exact same as
before, by passing different props and ensuring they render how they should.
Any redux actions they call can be safely turned to mocks where you just need
to verify that they were called.

You don't test your actions. You test your reducer against those actions:

```
// Get the initial state
let state = reducer(undefined)
expect(state.currentNumber).toBe(0)

// Call increment and verify the state changed
state = reducer(state, actions.increment())
expect(state.currentNumber).toBe(1)

// Test the setIncrementBy logic
state = reducer(state, actions.setIncrementBy(2))
state = reducer(state, actions.increment())
expect(state.incrementBy).toBe(2)
expect(state.currentNumber).toBe(3)
```

Hopefully that can explain what people mean when they say "redux is simple
but not easy". Look again at those tests above. _They don't even mention
Redux_. You are just making sure that a function responds to actions. But it
just took ~1000 words to explain.

Again, see `src/exampleFeature/` to see an example feature.

### Async Actions

Async Actions are a little different:

```typescript
import { AppDispatch, AppGetState } from '@src/redux/types'

export const fetchUsers = () => ({
  type: constants.fetchUsers,

  async payload(dispatch: AppDispatch, getState: AppGetState) {
    const results = await getJson<PaginatedResults<User>>('/users')
    dispatch(recordResults(results))
  },
})
```

This will actually dispatch 3 actions:

- `fetchUsers/start`
- `recordResults`
- `fetchUsers/success`

You can use the `/start` and `/success` actions to show / hide loading
indicators, and `recordResults` to actually store the results.

### Easily Create Actions

You will most often use functions to create your Redux actions. Instead of `dispatch({ type: 'SET_INCREMENT_BY', payload: 1 })`, you'll instead want `dispatch(setIncrementBy(1))`.

Here are 3 ways of writing said action, each one shorter than the last. Remember, they are each 100% equivalent:

```typescript
// Take 1. The most straight-forward way.
function setIncrementBy(n: number) {
  return {
    type: 'SET_INCREMENT_BY',
    payload: n,
  }
}

// Take 2. Uses newer syntax of JavaScript to make it more succinct.
const setIncrementBy = (n: number) => ({
  type: 'SET_INCREMENT_BY',
  payload: n,
})

// Take 3. Uses the `createAction` helper.
const setIncrementBy = createAction<number>('SET_INCREMENT_BY')
```

It goes from 6 lines to 1. That's pretty neat!

## Notes

Uses:

- [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [React](https://reactjs.org/docs/thinking-in-react.html)
- [Redux](https://redux.js.org/docs/basics/)
- [Material-UI](https://material-ui-next.com/)
- [Jest](https://facebook.github.io/jest/docs/en/using-matchers.html#content)
- [Enzyme](http://airbnb.io/enzyme/#basic-usage)
