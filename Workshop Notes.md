Thursday, May 23, 2019

Lecture 1 (Rendering):
React - describe a UI
ReactDOM - makes the UI
react-icons library - import { FaHome } from 'react-icons/fa';
Pass in component rather than component name to pass in props with the component

Lecture 2 (State):
UI = f(state)
useState
- First item gives actually value (value)
- Second item gives a function to set state (setValue)
- Can use state twice if there are multiple states

Think like ticket/PM
- When user checks a checkbox, change the field
- React - flip it. Think the way the designers think. Think of all different states and what does it look like in each state.
- Think in states rather than flows.

const states = []
let callCount = -1  // Keep track of the call counts

function useState(initialValue) {
  const id = ++callCount;

  // Don't create a new state
  if (states[id]) {
    return states[id]
  }

  const setValue = (newValue) => {
    // assign the value for the next render
    states[id][0] = newValue
    // re-render the page
    renderPhonyHooks()
  }
  const arr = [initialValue, setValue]
  states.push(arr);
  return arr
}

function renderPhonyHooks() {
  callCount = -1
  ReactDOM.render(...)
}

Lecture 4 (Effects):

Side effect -> useEffect
- Lets us think in terms of state.
- Always runs on initial render.
- Start to think of them as a new primitive.
- Way to capture some behavior
- Anything that is "not update the UI"

Used to think in terms of events and how to update the DOM when text box text changes
- Need to identify events/initial page load

Think in state vs events

Ref
- createREf
- ref="someString"
- ref={...}
- useRef
  - Keeps a reference to an object, most of the time it's a DOM element

Lecture 5 (Data loading):

useEffect
- Remember second argument
  - When does it need to rerun?
- Cleanup during async work
  - Don't set state when component is gone. Can set a variable.
  - Need to tell React how to cleanup the effect during async calls.

1. Initializing some state
2. Subscribing to posts
3. When we unmount, unsubscribe from posts
4. When the uid changes,
  - Unsubscribe from the last uid
  - Re-subscribe with the new uid

Main trade-off with Hooks
- Used to need to know (React land)
  - classes
  - instances
  - constructors
  - super
  - this
  - method binding
- Now we need to know (Hooks land)
  - functions
  - scope
  - arguments
  - return
  - closures
- Can group together related states

------------------------------------------------------------------------------------------------------------------------------------------------------------

Friday, May 24, 2019

Lecture 7 (Compound Components)

Build out single component, then only when it becomes obvious, break it up into different components.

Context
- Communication channel
- Not stateful
- Like a conveyor belt
- If state changes, then can convey down the path about the changes.
- Keep components in same file (can cause too many imports) or at least same directory since they are all related.

Variable shadowing
- Passing context props down to children

Lecutre 8 (App State)

Advantages of using a reducer (useReducer hook)
1. Manage all of our state together, instead of separately
2. Group changes together
3. "Product speak"

Dispatch is responsible for running reducer to get to the next state.

useReducer
- "Fancy" useState