import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => { //when we import the function we call it and get the store back
    const store = createStore(combineReducers({    //can call multiple reducers this way, put the reducer on a property
        expenses: expensesReducer,
        filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}
