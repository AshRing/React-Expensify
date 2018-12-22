//validation and form fields
import React from 'react';
import moment from 'moment'; //js library used to format and manipulate dates
import {SingleDatePicker} from 'react-dates';


export default class ExpenseForm extends React.Component {  //by using the plugin "transform class properties", this binding is implicit
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount).toString() : '',  
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused: false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    }

    onAmountChange = (e) => { //by validating here, we don't allow users to ever enter a wrong value
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {   //if amount matches the parameters of the regex, set the state to that amount
            /*   
            REGEX MEANING
            ^d*(\.\d{0,2})?$
            ^ asserts position at start of a line
            \d* matches a digit (equal to [0-9])
            * Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
            1st Capturing Group (\.\d{0,2})?
            ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
            \. matches the character . literally (case sensitive)
            \d{0,2} matches a digit (equal to [0-9])
            {0,2} Quantifier — Matches between 0 and 2 times, as many times as possible, giving back as needed (greedy)
            $ asserts position at the end of a line
            Global pattern flags
            g modifier: global. All matches (don't return after first match)
            m modifier: multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
            */
            this.setState(() => ({amount})); 
            
        }
    }

    onDateChange = (createdAt) => {  //called by the SingleDatePicker 3rd party library, but does the same things as above onChange functions
        if(createdAt) { //only allow state change if there is a value picked
            this.setState(() => ({createdAt}));
        }
    }

    onFocusChange = ({focused}) => {
        this.setState(() => ({calenderFocused: focused}))
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please provide description and amount'}));
        } else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10).toFixed(2),   //takes the string this.state.amount and turns it to a number. multiply by 100 to change to pennies
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    render() { //conditionally render the error if it exists
        return (
            <div>
                {this.state.error && <div>{this.state.error}</div>} 
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        autoFocus 
                        value={this.state.description} 
                        onChange={this.onDescriptionChange} 
                    />
                    <input 
                        type="text" 
                        placeholder="Amount" 
                        value={this.state.amount} 
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}  //shows this number of months when picking date
                        isOutsideRange={() => false}  //makes every single day available to us, past or future
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)" 
                        value={this.state.note} 
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}