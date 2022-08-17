"use strict";

$(function() {
    // ------ jQuery Introduction Exercises ------
    // alert(`The DOM has finished loading!`);

    // ------ ID Selectors Exercises ------
    // alert($("#hello-world").html());
    // alert($("#option-one").html());
    // when two elements have the same id, only the first is selected

    // ------ Class Selectors Exercises ------
    // $(".codeup").css("border", "1px solid red");
    // confirmed when removing "codeup" class from element it takes the border away
    // confirmed adding "codeup" class to element creates a border

    // ------ Element Selectors Exercises ------
    $("li").css("font-size", "20px");
    // $("h1").css("background-color", "brown");
    // $("p").css("background-color", "brown");
    // $("li").css("background-color", "brown");
    alert($("h1").html());

    // ------ Multiple Selectors Exercises ------
    $("h1, p, li").css("background-color", "brown");
});