console.log('running...');

import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


////////////////////////////////////////////////////////////////
//EXPENSES REDUCER & ACTION GENERATORS
////////////////////////////////////////////////////////////////

//ADD_EXPENSE
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),  //use uuid library to generate a random unique id. This function returns that id
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesReducerDefaultState = [];

//expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense); //.concat doesn't change state at all, just takes the old state and combines to it, returning the new array
            return [   //this is the exact same thing as above, except it uses the ES6 spread operator. The ...spread operator does not change the original state array, but returns a new array with action.expense added to it
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE': //filter returns a new array with the unwanted id filtered out
            return state.filter(({id}) => id !== action.id); //{id} is the result of destructuring expense.id
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {   //return a new object, grab existing properties and override any properties that were passed down, and that will be the new value for the expense
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;    //no change to expense unless its a match
                }
            });
        default:
            return state;
    }
}

////////////////////////////////////////////////////////////////
//FILTERS REDUCER & ACTION GENERATORS
////////////////////////////////////////////////////////////////

//SET_TEXT_FILTER
const setTextFilter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

//filters reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}


//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        const description = expense.description.toLowerCase();
        const textMatch = text === undefined || description.includes(text.toLowerCase()); //checks to see if expense.description has the text variable inside of it

        return startDateMatch && endDateMatch && textMatch; //if all of these are true, the item will show up in the array. If one is false, nothing shows
    }).sort((a, b) => { // after setting the above filters, sort the items by specified date or amount
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; //if a is less than b, toss b first (most recently created expenses first)
        }else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

//store creation
const store = createStore(combineReducers({    //can call multiple reducers this way, put the reducer on a property
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -1000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -100}));
// //store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(900));
// store.dispatch(setTextFilter('RENT'));
// store.dispatch(setTextFilter());
// store.dispatch(setTextFilter('coffE'));





const demoState = {
    expenses: [{
        id: 'poop',
        description: 'October Rent',
        note: 'This was the 2nd months payment',
        amount: 52800,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}

