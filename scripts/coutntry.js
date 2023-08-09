const channels = require('../channel/channelsWithSubscribers.json');
const fs = require('fs');

const country = async() => {

    let countries = {}
    for (let channel of channels) {

        if (channel["creationLocation"]) {

            if (!countries[channel["creationLocation"]]) {
                countries[channel["creationLocation"]] = [channel]
            } else {
                countries[channel["creationLocation"]] = [...countries[channel["creationLocation"]], channel]
            }
        }


    }


    for (let country of Object.keys(countries)) {

        fs.writeFileSync(`./channel/country/${country}.json`, JSON.stringify(countries[country]), 'utf8');
    }

    console.log('New file created with the JavaScript code.');

};

// Start the scraping
country();