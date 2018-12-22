import moment from 'moment';

//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true; //from moment library. check if end date is on the same date or after the moment the expense was created

        const description = expense.description.toLowerCase();
        const textMatch = text === undefined || description.includes(text.toLowerCase()); //checks to see if expense.description has the text variable inside of it

        return startDateMatch && endDateMatch && textMatch; //if all of these are true, the item will show up in the array. If one is false, nothing shows
    }).sort((a, b) => { // after setting the above filters, sort the items by specified date or amount
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; //if a is less than b, toss b first (most recently created expenses first)
        }else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

export default getVisibleExpenses;