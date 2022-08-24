"use strict";
$(() => {


    const lastCommit = username => {
        let lastCommitDate;
        return fetch(`https://api.github.com/users/${username}/events/public`)
            .then((response) => response.json())
            .then(data => {
                // console.log(data);
                return data[0].created_at.substring(0,10);
            })
            .catch(() => {
            console.log("Error");
        });
    }

    let promise = lastCommit("pfirewire");
    promise.then((result) => console.log(result));


    const wait = number => {

    }


});






