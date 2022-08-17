"use strict";

$(function () {
    $("dd").addClass("invisible");
    $("#toggle-visibility").click(function () {
        $("dd").toggleClass("invisible");
    });
    $("dt").click(function () {
        $(this).toggleClass("highlighted");
    });
});