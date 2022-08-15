# ReactJS Hooks Sandbox

React Hooks can only be called at the top level of a functional component. They don't work inside of regular javaScript functions, nested function, loops except when used with [Custom Hooks](https://usehooks.com/).

## Rules of Hooks:

1. Only call hooks (useState and useEffect) at the TOP Level

- This means don't call hooks inside loops, conditions or nested functions.
- Always use Hooks at the top level of your react function.
- By following this rule, you ensure hooks are called in the same order each time a component renders.
- This allows react to correctly preserve the state of hooks between useState / useEffect calls.

2. Don't call hooks from regualr JS functions

- Call hooks from React's Functional component
- Call hooks from Custom Hooks

## BAD USE CASE:

Call order is essential for hooks to work correctly. The Call order must remain consistent and predictable. Hence it's omportant to follow the rules.

```
function App(){
    const [randomNo, setRandomNo] = useState(Math.floor(Math.random() * 101)); // Random number b/w 0 and 100

//BAD USE CASE 1: Breaks the call order:
if (randomNo > 50){ // should not use conditional
    const [test, setTest] = useState("Whoops");
}


// BAD USE CASE 2: Conditional must go inside the useEffect:
if (randomNo < 50){
   useEffect(() => {
       console.log("render");
   })

// BAD USE CASE 3: No nested functions:
const testing = () => {
        useEffect(() => {
        console.log("render");
        })
    }
    useEffect(() => {
        console.log("render");
        })

// BAD USE CASE 4: Cannot call hook inside a function
function badFunction(){
     useEffect(() => {
        console.log("render");
        })
    }
}

```

## Fixing the BAD USE CASE:

```
function App(){
    const [randomNo, setRandomNo] = useState(Math.floor(Math.random() * 101)); // Random number b/w 0 and 100

// FIXED BAD USE CASE 1: Breaks the call order:
  const [test, setTest] = useState("Whoops");


// FIXED BAD USE CASE 2: Conditional must go inside the useEffect:

   useEffect(() => {
       if (randomNo < 50){
       console.log("render");
   })
   }

// FIXED BAD USE CASE 3: No nested functions:

   useEffect(() => {
         const testing = () => {
         console.log("render");
            }
            testing(); // scope is now only inside the useEffect Hook
        })

    useEffect(() => {
        console.log("render");
        })

// FIXED BAD USE CASE 4: Cannot call hook inside a function

     useEffect(() => {
        console.log("render");
        })
    }
}
```

Install ESLint plugin for react hooks:
npm install eslint-plugin-react-hooks --save-dev

React has 10 different hooks:

## Basic Hooks:

### `useState`

React's useState Hook is used to add and manage state in a function component.When data changes re-render the UI. UI updates when state changes.

- syntax: const [reactive value, setter] = useState(initial value);
  Ex: const [count, setCount] = useState(0);

The useState Hook value is non-persistent so when the browser refreshes the value is lost. You can use localstorage, redux or a db service to save the state.

### `useEffect`

React's useEffect Hook lets you add side effects in function components. We can have multiple useEffect hooks in a component and it helps seperate actions. They let you use state and other React features without writing a class.

It combines the below 3 lifecycle events / side effects:

```
componentDidMount(){
//initialized
}

componentDidUpdate(){
//state updated
}

componentWillUnmount(){
//destroyed
}
```

UseEffect hook allows us to implement a logic for all the 3 lifecycles from within a single function API. It is a function that takes in the function the user defines as the 1st argument. It runs when mounted and when state changes. An array of dependencies addresses the issue of infinite loops.

```
// Runs on Every Render (Infinite Loop)
useEffect(() => {
console.log("component re-rendered");
});

// With an empty array there are no dependencies -> Runs on first Render/Mount only! - componentDidMount Alternative
useEffect(() => {
console.log("The component mounted!");
}, []);

// Runs on first Render + whenever dependency (state,props or any data) changes! only! - componentDidUpdate Alternative
useEffect(() => {
console.log(`The name changed!: ${name}`);

// Run a cleanup code / teardown code before component is removed from UI (call when the component is destroyed) -> We return a function from useEffect callback.
return () => {
console.log("component unmounted");
};
}, [name]); // can include props or state in the dependency array

// Follows the same rules, except this handles the unmounting on a component! - componentWillUnmount Alternative
useEffect(() => {
console.log("attach listener");
window.addEventListener("resize", updateWindowWidth);
}, []);

const updateWindowWidth = () => {
setWindowWidth(window.innerWidth);
};
```

### `useContext`

useContect Hook allows you to work with React's Context API. It allows to share / scope values through out the entire component tree. "It allows to share data without passing props."

```
Ex:
const moods = {
    happy: ':)',
    sad: ':('
    }

const MoodContext = createContext{moods}; // can share the moods with multiple disconnected components by creating a context.

function App(props){
    return(
        // Use a context provider to share / scope the happy mood there. Any child component inside of it can impair the value without needing to pass down props to the children.
        <MoodContext.Provider value={moods.happy}>
        <MoodEmoji/>
        </MoodContext.Provider>
    );
    }
function MoodEmoji(){
    // useContext Hook here allows to access / consume the current value from the Context Provider that might live many levels higher in the component tree.

    const mood = useContext(MoodContext);
    return <p>{mood}</p>

    // reading a parent value from the nearest parent provider using useContext is much easier than passing props down from multiple children. when the value changes in the parent provider it changes automatically  in here. useContext() has replaced useConsumer().
}
```

## Additional Hooks:

### `useRef`

useRef hook allows you to create a mutable object that will keep the same reference between renders. It can be used when a value changes but the difference being it won't trigger a render when the value changes.
In other words it allows you to have a reference to an element on the page. useRef Hook allows you to persist a value across renders without triggering a re-render. (helps avoid multiple api calls).
Common use case for useRef() is to grab HTML elements from (the DOM) JSX.

```
function App(){
    const myBtn - useRef(null);
    const clickIT = () => myBtn.current.click() // .click() here is a DOM API

    return(
        <button ref={myBtn}></button>
    );
}

```

### `useReducer`

useReducer() is very similar to useState() but works in a different way using Redux pattern to manage state.
Instead of updating the state directly you: <u>Dispatch Actions</u> that goes to a <u>Reducer</u> function and the Reducer function decides how to compute the next state. Just like useState the useReducer returns an array of 2 values. [reactive state, dispatch].
1st value is the "reactive state", but the 2nd value instead of a setter function that updates the state you are given a function that can <u></u>dispatch an action</u> (type:string, payload:any). An action is just an object which has a <i>type</i> and an optional <i>data payload</i>.
You might dispatch an action when a button is clicked which will trigger the useReducer() function. This is a function you define and pass as an argument to the useReducer() Hook. The function takes the <u>current state</u> and the <u>action</u> as arguments and uses these 2 values to compute the next state which is usually handled within a <u>switch statement</u>.

```

function reducer(state, action){
    switch(action.type){
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            throw new Error();
    }
}

function App(){
    const [state, dispatch] = useReducer(reducer, 0); // useReducer takes in a reducer function and an inital state.
    return(

        Count: {State}
        <button onClick={() => dispatch({type:'decrement})}> - </button>
        <button onClick={() => dispatch({type:'increment})}> + </button>
    )
}
```

As you add more components to your app it becomes more difficult to manage state in a reliable and predictable way. The redux pattern helps with the issue.

### `useMemo`

useMemo() Hook helps optimize computation cost for improved performance.
Caution: Use only as needed for expensive calculations that are hurting performance. Instead of re-computing on every re-render we can memoize the value. Memoization: Cache result of function call. We write a function that returns the computed value then as a 2nd argument we add the dependencies to tell when the computation should be run. Recompute: when count changes. This Hook is great for memoizing return values. In other cases you might want to memoize an entire function that's where useCallback() is used.

In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

```
function App(){
    const [count, setCount] = useState(60);

    const expensiveCount = useMemo(() => {
        return count ** 2;
    }, [count])
    return<></>
}

```

### `useCallback`

Because inline functions are cheap, the re-creation of functions on each rendering is not a problem. A few inline functions per component are acceptable.

But in some cases you need to maintain a single function instance between renderings:

1. A functional component wrapped inside React.memo() accepts a function object prop
2. When the function object is a dependency to other hooks, e.g. useEffect(..., [callback])
3. When the function has some internal state, e.g. when the function is debounced or throttled.

That's when useCallback(callbackFun, deps) is helpful: given the same dependency values deps, the hook returns the same function instance between renderings (aka memoization):

import { useCallback } from 'react';
function MyComponent() {
// handleClick is the same function object
const handleClick = useCallback(() => {
console.log('Clicked!');
}, []);
// ...
}

handleClick variable has always the same callback function object between renderings of MyComponent.

Good use case:
Imagine you have a component that renders a big list of items:

```
import useSearch from './fetch-items';
function MyBigList({ term, onItemClick }) {
const items = useSearch(term);
const map = item => <div onClick={onItemClick}>{item}</div>;
return <div>{items.map(map)}</div>;
}
export default React.memo(MyBigList);
```

The list could be big, maybe hundreds of items. To prevent useless list re-renderings, you wrap it into React.memo().

The parent component of MyBigList provides a handler function to know when an item is clicked:

```
import { useCallback } from 'react';
export function MyParent({ term }) {
const onItemClick = useCallback(event => {
console.log('You clicked ', event.currentTarget);
}, [term]);
return (
<MyBigList
      term={term}
      onItemClick={onItemClick}
    />
);
}
```

onItemClick callback is memoized by useCallback(). As long as term is the same, useCallback() returns the same function object.

When MyParent component re-renders, onItemClick function object remains the same and doesn't break the memoization of MyBigList.

That was a good use case of useCallback().

Bad use case:

```
import { useCallback } from 'react';
function MyComponent() {
  // Contrived use of `useCallback()`
  const handleClick = useCallback(() => {
    // handle the click event
  }, []);
  return <MyChild onClick={handleClick} />;
}
function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}
```

Does it make sense to apply useCallback()? Most likely not because <MyChild> component is light and its re-rendering doesn't create performance issues.

Don't forget that useCallback() hook is called every time MyComponent renders. Even useCallback() returning the same function object, still, the inline function is re-created on every re-rendering (useCallback() just skips it).

By using useCallback() you also increased code complexity. You have to keep the deps of useCallback(..., deps) in sync with what you're using inside the memoized callback.

In conclusion, the optimization costs more than not having the optimization.

Simply accept that rendering creates new function objects:

```
import { useCallback } from 'react';
function MyComponent() {
  const handleClick = () => {
    // handle the click event
  };
  return <MyChild onClick={handleClick} />;
}
function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}
```

When you define a function in a component a new function object is created each time a component is re-rendered. In some cases you might need to momoize the function especially with big lists when you pass the same function to multiple child components. Wrap the function within a useCallback to avoid re-rendering of the children because they will always be using the same function object .

```
function App(){
    const [count, setCount] = useState(60);

    const showCount = useCallback(() => {
        alert(`Count ${count}`)
    },[count]);
    return<><SomeChild handler={showCount}/></>
}

```

### `useImperativeHandle`

When you build a reusable component library in react you may need to get access to the underlying DOM element and forward it so it can be accessed by the consumers of your component library. You can access a native DOM element with useRef() Hook. Then you can wrap the component in forwardRef to make that ref available when someone uses this component. We use the useImperativeHandle() hook to change the behavior of the exposed ref. This hook is used very rarely.

```
function CoolButton(props, ref){
    const myBtn = useRef(null);

    useImperariveHandle(ref,() => ({
        click:()=>{
            console.log('clicking button!);
            myBtn.current.click();
        }
    }))
    return(
        <button ref={myBtn}></button>
    );
}
CoolButton = forwardRef(CoolButton);


```

### `useLayoutEffect`

Works like useEffect() Hook with 1 small difference. Your callback will run after rendering the component but before the actual updates have been painted to screen. React waits for your code to finish running before it updates the UI for the end user. Caution: blocks visual updates until your callback is finished.

```
function App(){
    const myBtn = useRef(null);
    useLayourEffect(()=>{
        cons rect = myBtn.current.getBoundingClientRect();
        console.log(box.height);
    })
}
```

### `useDebugValue`

When building your own custom hooks when you open your app in the browser and open react dev tools you notice every component in the tree tells you a little bit about the hooks that are defined there. useDebugValue lets you create you own custom labels in react dev tools when you start building custom hooks.

Incase you have multiple components that want to implement the same logic you can create your own custom function / custom hook and return the value in it so you can use it elsewhere in the application in multiple components. Add useDebugValue() to the custom hook. The argument passed to the hook is the value shown in react dev tools.

```
function useDisplayName() {
     const [displayName, setDisplayName] = useState();
    useEffect(() => {
        const data = fecthFromDatabase(props.userId);
        setDisplayName(data.displayName);
    }, []);
    useDebugValue(displayName ?? 'loading...')
    return displayName;
}
function App(){
    const displayName = useDisplayName();
    return <button>{displayName}</button>
}

```

## Props:

props are present in both class and functional components. They are passed from top to down and are read-only which means they cannot be modified once passed down a component. To modify it we have to make use of state at the component above and then pass it down to the child component. Props get passed in as a parameter to a class or functional based component.
