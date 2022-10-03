"use strict";
$(() => {

    const users = [
        {
            id: 1,
            name: 'ryan',
            email: 'ryan@codeup.com',
            languages: ['clojure', 'javascript'],
            yearsOfExperience: 5
        },
        {
            id: 2,
            name: 'luis',
            email: 'luis@codeup.com',
            languages: ['java', 'scala', 'php'],
            yearsOfExperience: 6
        },
        {
            id: 3,
            name: 'zach',
            email: 'zach@codeup.com',
            languages: ['javascript', 'bash'],
            yearsOfExperience: 7
        },
        {
            id: 4,
            name: 'fernando',
            email: 'fernando@codeup.com',
            languages: ['java', 'php', 'sql'],
            yearsOfExperience: 8
        },
        {
            id: 5,
            name: 'justin',
            email: 'justin@codeup.com',
            languages: ['html', 'css', 'javascript', 'php'],
            yearsOfExperience: 9
        }
    ];

    const smartUsers = users.filter(user => user.languages.length >= 3);
    // console.log(smartUsers);

    const userEmails = users.map(user => user.email);
    // console.log(userEmails);

    const averageExperience = users.reduce((totalYears, user) => totalYears + user.yearsOfExperience, 0) / users.length;
    // console.log(averageExperience);

    const longestEmail = users.reduce((longestEmail, user) => longestEmail.length < user.email.length ? user.email : longestEmail, "");
    // console.log(longestEmail);


    const allUsers = users.reduce((userNames, user, index, array) => index === 0 ? `${userNames} ${user.name}` : index < array.length - 1 ? `${userNames}, ${user.name}` : `${userNames}, ${user.name}.`, "The users are:");
    console.log(allUsers);

    const languagesKnown = users.reduce((languages, user) => {
        for(let language of user.languages) {
            !languages.includes(language) ? languages.push(language) : false;
            return languages;
        }

    }, []);
    console.log(languagesKnown);

});