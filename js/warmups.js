"use strict";
$(() => {

    const average = array => array.reduce((a, b) => a + b, 0)/array.length;
    console.log(`The average of the array [1, 2, 3, 4, 5] is: ${average([1, 2, 3, 4, 5])}`);

    const longestString = array => {
        let longestString = array[0];
        for(let i = 0; i < array.length; i++) {
            if (typeof array[i] !== "string"){
                return false;
            }
            array[i].length > longestString.length ? longestString = array[i] : false;
        }
        return longestString;
    }
    console.log(`The longest string in the array ["hello", "my", "name", "is", "Constantine"] is: ${longestString(["hello", "my", "name", "is", "Constantine"])}`);
});