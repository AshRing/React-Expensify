const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

// test('should add two numbers', () => {
//     const result = add(2, 3);

//     if(result !== 7) {
//         throw new Error('You added 2 and 3. The result was ');
//     }
// });

test('greets with name', () => {
    const result = generateGreeting('Ash');
    expect(result).toBe('Hello Ash!');   //we make the assumption that the result will be 'Hello Ash!'
});

test('should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
});