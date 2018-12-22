import { createStore } from 'redux';

//Action generators - functions that return action objects

const incrementCount = ({incrementBy = 1} = {}) => ({  //desctructure "incrementBy" off the passed object. If "incrementBy" is not provided, default to 1. If nothing passed at all, default to an empty object, which will try to destructure incrementBy, which doesn't exist, so it return the default of 1
    type: 'INCREMENT',
    incrementBy  //same as incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count}) => ({  //no default value because user has to provide count
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});


// Reducers -- pure functions: output is only determined by the input (state, action),
// Never change state or action, should just be reading off those things and returning an object

const countReducer = (state = { count: 0 }, action) => { //set default state in argument
    switch (action.type) {   //use a switch statement instead of an if statement for action types, if certain action type, do the state change in the return statement
        case 'INCREMENT': 
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };
        case 'SET': //no test because when the SET action is use, count MUST be specified
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}

//have to pass a function in as an argument to createStore
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => { //function gets calls everytime the store changes
    console.log(store.getState());
}); //call unsubscribe() to stop doing the above function


//Incrementing the count
store.dispatch(incrementCount());

store.dispatch(incrementCount({incrementBy: 5}));


//Incrementing the count
store.dispatch(resetCount());
store.dispatch(setCount({count: 98}));
//Decrement the count
store.dispatch(decrementCount());

//Decrement the count
store.dispatch(decrementCount({decrementBy: 10}));


