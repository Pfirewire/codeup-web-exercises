function showMultiplicationTable (number) {
    for (let i = 1; i < 11; i++){
        console.log(`${number} * ${i} = ${number * i}`);
    }
}

function oddOrEven (number) {
    if (number % 2 === 0){
        return "even";
    } else {
        return "odd";
    }
}

for (let i = 1; i < 11; i++) {
    randomNumber = Math.floor(Math.random() * 180 + 20);
    console.log(`${randomNumber} is ${oddOrEven(randomNumber)}`);
}

for (let i = 1; i < 10; i++) {
    for (let j = 1; j <= i; j++) {
        console.log(i);
    }
}

for (let i = 100; i > 0; i -= 5) {
    console.log(i);
}