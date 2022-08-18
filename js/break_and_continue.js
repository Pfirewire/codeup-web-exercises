let isOddAndBetweenOneAndFifty = false;
let userNumber;
while (isOddAndBetweenOneAndFifty === false) {
    userNumber = parseInt(prompt("Enter an odd number between 1 and 50"));
    if (userNumber > 1 && userNumber < 50 && userNumber % 2 !== 0) {
        break;
    }
}
console.log(`The number to skip: ${userNumber}`);
for (let i = 1; i < 50; i++) {
    if (i % 2 === 0 || i === userNumber) {
        continue;
    }
    console.log(`Here is an odd number: ${i}`);
}
