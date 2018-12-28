//Get expense total
export default (expenses) => {
    return expenses.map((expense) => parseFloat(expense.amount)).reduce((sum, value) => sum + value, 0);   //creates an array of numbers, then reduces them into their total


    //This code is what I came up with by myself during the code challenge
    // let amountArray = [];
    // let total = 0;
    // for(let i=0; i<expenses.length; i++) {
    //     amountArray.push(parseInt(expenses[i].amount));
    // }
    // amountArray.forEach((amount) => total += amount);
    // return total;
}