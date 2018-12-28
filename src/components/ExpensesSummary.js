import React from 'react';
import {connect} from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';


const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = expensesTotal.toFixed(2);

    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling ${formattedExpensesTotal}</h1>
        </div>
    )
}


// const ExpensesSummary = (props) => (
//     <div>
//         {

//             What I came up with on my own
//             props.expenses.length === 1 ? (
//                 <p>Viewing 1 expense totalling ${getExpensesTotal(props.expenses).toFixed(2)}</p>
//             ) : (
//                 <p>Viewing {props.expenses.length} expenses totalling ${getExpensesTotal(props.expenses)}</p>
//             )
//         }
//     </div>
// );

const mapStateToProps = (state) => { //function determines what info from the store we want our component to access
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);