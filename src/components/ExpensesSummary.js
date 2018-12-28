import React from 'react';
import {connect} from 'react-redux';
import getExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

const ExpensesSummary = (props) => (
    <div>
        {
            props.expenses.length === 1 ? (
                <p>Viewing 1 expense totalling ${getExpensesTotal(props.expenses)}</p>
            ) : (
                <p>Viewing {props.expenses.length} expenses totalling ${getExpensesTotal(props.expenses).toFixed(2)}</p>
            )
        }
    </div>
);

const mapStateToProps = (state) => { //function determines what info from the store we want our component to access
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);