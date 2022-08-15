let number = 1;
while (number < 50000) {
    number *= 2;
    console.log(number);
}

let conesToSell = Math.floor(Math.random() * 50 + 50);
console.log(`${conesToSell} cones to sell at the start of my day.`);
do {
    let customerRequest = Math.floor(Math.random() * 4 + 1);
    if (conesToSell - customerRequest < 0) {
        console.log(`I can't sell ${customerRequest} cones, I only have ${conesToSell}!`);
        continue;
    } else if (conesToSell - customerRequest === 0) {
        console.log(`Yay! I sold them all!`);
        break;
    } else {
        console.log(`${customerRequest} cones sold.`);
        conesToSell -= customerRequest;
    }
    console.log(`I now have ${conesToSell} cones left.`)
} while (conesToSell > 0);
