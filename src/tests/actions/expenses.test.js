import {startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => { //desctructure these off object
        expensesData[id] = { description, note, amount, createdAt }; //sets up data like it is set up in the firebase database
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({  //Use toEqual instead of toBe when comparing objects
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from database', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;

    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions(); //always do this when creating async tests
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    }); 
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {amount: 123.45});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {amount: 123.45}
    })
});

test('should edit expense in database', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = {
        amount: 200
    }

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
            // ...expenseData,
            // id: expect.any(String)   //because id is randomly generated, we use this jest function to tell the test to expect id to be any String value. Asserts something about the type of the value when you don't know exactly what the value is going to be
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        desciption: 'Mouse',
        amount: '30.00',
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //forces Jest to wait until the async code runs;
    }).then(done, done); 
});

test('should add expense with defaults database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); //forces Jest to wait until the async code runs;
    }).then(done, done);
});

test('should set up set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});