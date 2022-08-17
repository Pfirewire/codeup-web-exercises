"use strict";

$(function () {

    // ------ Attributes and CSS ------
    $("dd").addClass("invisible");
    $("#toggle-visibility").click(function () {
        $("dd").toggleClass("invisible");
    });
    $("dt").click(function () {
        $(this).toggleClass("highlighted");
    });

    // ------ Traversing ------
    $("#add-yellow-btn").click(function () {
        $(".park-list").each(function (index) {
            $(this).children().last().css("background-color", "yellow");
            $(this).children().last().css("color", "black");
        });
    });
    $("h3").click(function () {
        $(this).next().children().first().css("font-weight", "bold");
    });
    $("li").click(function () {
        $(this).parent().children().first().css("color", "blue");
    });

    $(".btn").click(function () {
        let tempImg = $("#center-img").attr("src");
        if ($(this).attr("id") === "left-btn") {
            swapLeftTwoImages();
        } else if ($(this).attr("id") === "right-btn") {
            swapRightTwoImages();
        } else {
            Math.random() < .5 ? swapLeftTwoImages() : swapRightTwoImages();
        }
    });

    function swapLeftTwoImages() {
        let tempImg = $("#center-img").attr("src");
        $("#center-img").attr("src", $("#left-img").attr("src"));
        $("#left-img").attr("src", tempImg);
    }

    function swapRightTwoImages() {
        let tempImg = $("#center-img").attr("src");
        $("#center-img").attr("src", $("#right-img").attr("src"));
        $("#right-img").attr("src", tempImg);
    }

});