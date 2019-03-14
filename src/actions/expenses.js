import uuid from 'uuid';
import database from '../firebase/firebase';

//expenses action generators

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

//only works with redux-thunk middleware
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

        return database.ref('expenses').push(expense).then((ref) => { //return this promise so we can use test cases on it throguh Promise Chaining
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    }
}

//REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({id}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        });
    }
}

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
}

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses')
            .once('value')
            .then((snapshot) => { 
                const expenses = [];

                snapshot.forEach((childSnapshot) => { //this parses the data into an array
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                console.log(expenses);
                dispatch(setExpenses(expenses));
            });
    }
}