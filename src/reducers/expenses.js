//expenses reducer

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

export default expensesReducer;