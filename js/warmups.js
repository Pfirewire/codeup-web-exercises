"use strict";
$(() => {

    // const average = array => array.reduce((a, b) => a + b, 0)/array.length;
    // console.log(`The average of the array [1, 2, 3, 4, 5] is: ${average([1, 2, 3, 4, 5])}`);
    //
    // const longestString = array => {
    //     let longestString = array[0];
    //     for(let i = 0; i < array.length; i++) {
    //         if (typeof array[i] !== "string"){
    //             return false;
    //         }
    //         array[i].length > longestString.length ? longestString = array[i] : false;
    //     }
    //     return longestString;
    // }
    // console.log(`The longest string in the array ["hello", "my", "name", "is", "Constantine"] is: ${longestString(["hello", "my", "name", "is", "Constantine"])}`);

    // Write a function, calculateTotalStudents, that returns the total number of students recorded in the classes array.
    const calculateTotalStudents = classes => {
        let total = 0;
        classes.forEach(e => {
            total += e.students;
        });
        return total;
    }

    let classes = [
        {class: "6th grade history", students: 18},
        {class: "7th grade history", students: 20},
        {class: "8th grade history", students: 22}
    ];

    console.log(calculateTotalStudents(classes));

    // Write a function called convertToObject that takes in a string that is the name of a class, and a number that is the number of students, and returns an object with the properties `class` and `students`

//convertToObject("Intro to Programming", 20) returns {class: "Intro to Programming", students: 20}

    function convertToObject(string, number){
        return {class: string, students: number};
    }

    console.log(convertToObject("Intro to Programming", 20));


    var neighborhood1 ={
        neighborhood: "Lovely Estates",
        medianHomePrice: 280000,
        pool: true,
        tennis: false,
        crimeRate: "low",
        schools: [
            {name: "ES1", rating: 8},
            {name: "MS2", rating: 6},
            {name: "HS3", rating: 8}
        ]
    }

    var neighborhood2 ={
        neighborhood: "Luminous Estates",
        medianHomePrice: 270000,
        pool: true,
        tennis: false,
        crimeRate: "low",
        schools: [
            {name: "ES1", rating: 8},
            {name: "MS2", rating: 8},
            {name: "HS3", rating: 8}
        ]
    }

    var neighborhood3 ={
        neighborhood: "Ginormous Ego Estates",
        medianHomePrice: 350000,
        pool: true,
        tennis: true,
        crimeRate: "low",
        schools: [
            {name: "ES1", rating: 9},
            {name: "MS2", rating: 9},
            {name: "HS3", rating: 9}
        ]
    }

// Write a function that takes a neighborhood object and determines if it is desirable. A neighborhood is desirable if the median home price is less than 300000, crime rates are low, and the total rating of schools is at least 24.

    function desirableNeighborhood(neighborhoodObject){
        let totalRating = 0;
        if(!neighborhoodObject.crimeRate === "low") {
            return false;
        } else if(neighborhoodObject.medianHomePrice >= 300000) {
            return false
        } else {
            neighborhoodObject.schools.forEach(school => totalRating += school.rating);
            if(totalRating < 24){
                return false;
            } else {
                return true;
            }
        }

    }

    console.log(desirableNeighborhood(neighborhood1));
    console.log(desirableNeighborhood(neighborhood2));
    console.log(desirableNeighborhood(neighborhood3));


    //Let's pretend your company just hired your friend from college and paid you a referral bonus. Awesome! To celebrate, you're taking your team out to the terrible dive bar next door and using the referral bonus to buy, and build, the largest three-dimensional beer can pyramid you can. And then probably drink those beers, because let's pretend it's Friday too.
//
// A beer can pyramid will square the number of cans in each level - 1 can in the top level, 4 in the second, 9 in the next, 16, 25...
//
// Complete the beeramid function to return the number of complete levels of a beer can pyramid you can make, given the parameters of:
//
//     your referral bonus, and
//
//     the price of a beer can
//
// For example:
//
// beeramid(1500, 2); // should === 12
// beeramid(5000, 3); // should === 16

    const beeramid = (bonus, pricePerBeer) => {
        let totalCost = 0;
        let level = 1;
        while(totalCost <= bonus) {
            totalCost += ((level ** 2) * pricePerBeer);
            level++;
        }
        if(level <= 2) {
            return 0;
        } else {
            return level - 2;
        }
    }
    console.log(beeramid(1500, 2)); // should === 12
    console.log(beeramid(5000, 3)); // should === 16


});


