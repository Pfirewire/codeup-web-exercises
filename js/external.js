console.log("Hello from external JavaScript");

alert("Welcome to my Website!");

let favColor = prompt("What is your favorite color?").toLowerCase();
alert(`Great, ${favColor} is my favorite color too!`);

// Exercise 3.1

let hercules = prompt("How many days did you rent Hercules?");
let brotherBear = prompt("How many days did you rent Brother Bear?");
let theLittleMermaid = prompt("How many days did you rent The Little Mermaid?");
let totalPrice = (hercules * 3) + (brotherBear * 3) + ( theLittleMermaid * 3);
alert(`You paid a total of ${totalPrice} for your rentals.`);

// Exercise 3.2

let google = prompt("How many hours did you work for Google?");
let facebook = prompt("How many hours did you work for Facebook?");
let amazon = prompt("How many hours did you work for Amazon?");
let totalAmountPaid = (google * 400) + (amazon * 380) + (facebook * 350);
alert(`Congratulations! You have made a total of $${totalAmountPaid} this week. Holy cow!`);

// Exercise 3.3

let isClassFull = confirm("Is the class full? OK if yes, Cancel if no.");
let hasConflict = confirm("Is there a schedule conflict? OK if yes, Cancel if no.");
let canEnroll = !(isClassFull || hasConflict);
if (canEnroll) {
    alert("The student is now enrolled.");
} else {
    alert("The student cannot enroll in this class.");
}

// Exercise 3.4

let isPremiumMember = confirm("Are you a Premium Member at ExploitMart?");
let numberOfProducts = prompt("How many products are you buying?");
let isOfferExpired = confirm("Is your offer expired?");
let offerValid;
if (isPremiumMember) {
    offerValid = !isOfferExpired;
} else {
    offerValid = (numberOfProducts > 2) && !isOfferExpired;
}
if (offerValid) {
    alert("You have received a .0001% discount from ExploitMart!");
} else {
    alert("You are not eligible for our extremely awesome discount.");
}