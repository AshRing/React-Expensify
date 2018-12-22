import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => ( //unconnected component, made into a named export
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses.</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense}/>  //Spreads the properties out from expense as props to Expense List Item
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => { //function determines what info from the store we want our component to access
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList);