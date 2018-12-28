import getExpensesTotal from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
    const result = getExpensesTotal([]);
    expect(result).toBe(0);
});

test('should correctly add up single expense', () => {
    const expense = [
        {
            description: 'Gum',
            note: '',
            amount: 195.00,
            createdAt: 0
        }
    ]
    const result = getExpensesTotal(expense);
    expect(result).toBe(195.00);
});


test('should correctly add up multiple expenses', () => {
    const expenses = [
        {
            description: 'Gum',
            note: '',
            amount: 195.00,
            createdAt: 0
        }, 
        {
            description: 'Rent',
            note: '',
            amount: 1095.00,
            createdAt: 0
        }
    ]
    const result = getExpensesTotal(expenses);
    expect(result).toBe(expenses[0].amount + expenses[1].amount);
});

