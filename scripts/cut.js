const channels = require('../data/channel.json');
const fs = require('fs');

const subClassifier = async() => {

    let usernameBased = {}

    for (let channel of channels) {
        usernameBased[channel["userName"]] = {
            "userName": channel["userName"],
            "name": channel["name"],
            "description": channel["description"]
        };
    }
    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./data/usernameBased.json", JSON.stringify(Object.values(usernameBased)), 'utf8');


    console.log('New file created with the JavaScript code.');


};

// Start the scraping
subClassifier();