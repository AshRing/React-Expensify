import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startAddExpense} from '../actions/expenses';

export class AddExpensePage extends React.Component {   //do this to avoid inline functions. Export to allow us to test it unconnected
    onSubmit = (expense) => {  //gets passed the expense object. used this function as a prop so we can re-use expenseform to edit an expense
        //props.dispatch(addExpense(expense));
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
}


//The component looked like this before we made it a class-based component
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm 
//             onSubmit={(expense) => {  //gets passed the expense object. used this function as a prop so we can re-use expenseform to edit an expense
//                 //props.dispatch(addExpense(expense));
//                 props.onSubmit(expense);
//                 props.history.push('/');
//             }} 
//         />
//     </div>
// );

const mapDispatchToProps = (dispatch) => ({  //this allows us to extract Redux store dispatch functions away from the component
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);