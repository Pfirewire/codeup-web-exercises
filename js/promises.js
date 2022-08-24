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


    const wait = delay => {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        }).then(() => {
            return delay;
        });
    }

    wait(1000).then((delay) => console.log(`You'll see this after ${delay/1000} second`));
    wait(3000).then((delay) => console.log(`You'll see this after ${delay/1000} seconds`));

});






