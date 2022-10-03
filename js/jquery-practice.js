$(function() {
    let myName = 'Steve';
    // document.getElementsByTagName("h1")

    $("h1").addClass("text-danger");
    // document.getElementById("myFavoriteDiv")
    $("#myFavoriteDiv").append(`
        <h1>Underneath the List with ${myName}</h1>
    `);

    $("ul li:nth-child(4)").addClass("text-warning");

    $(".fs-4").click(function() {
        console.log($(this).parent());
        $(this).parent().parent().css("visibility", "hidden")
    });
    $("ul").last().children().removeClass("text-warning").addClass("text-info");





});