import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
        console.log('updated', expense);
    }

    onRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id}); //takes in an object with the id
        this.props.history.push('/');
        console.log('Expense deleted');
    }

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense ={this.props.expense} 
                    onSubmit={this.onSubmit} 
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
}

// const EditExpensePage = (props) => {
//     console.log(props);
//     return (
//         <div>
//             <ExpenseForm 
//                 expense ={props.expense} 
//                 onSubmit={(expense) => {
//                     props.dispatch(editExpense(props.expense.id, expense));
//                     props.history.push('/');
//                     console.log('updated', expense)
//                 } }
//             />
//             <button onClick={() => {
//                 props.dispatch(removeExpense({id: props.expense.id})); //takes in an object with the id
//                 props.history.push('/');
//                 console.log('Expense deleted');
//             }}>Remove</button>
//         </div>
//     );
// }

const mapStateToProps = (state, props) => {  //makes expense: equal to the expense we are editing
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);