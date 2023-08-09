const channels = require('../data/channels.json');
const detailedChannelProgress = require('../data/detailedChannel.json');

// const one = require('../channel/1-9.9K.json');
// const two = require('../channel/10-99K.json');
// const three = require('../channel/over100k.json');

const fs = require('fs');

const getQuotes = async() => {
    let channelsData = {}
    for (let channel of channels) {
        channelsData[channel["link"]] = channel;
    }
    for (let channel of detailedChannelProgress) {
        channelsData[channel["link"]].socialLinks = channel.socialLinks;
    }



    // If file doesn't exist, create a new file and write the JavaScript code to it
    // fs.writeFileSync("./data/channel.json", JSON.stringify([...three, ...two, ...one]), 'utf8');
    fs.writeFileSync("./data/channels.json", JSON.stringify(Object.values(channelsData)), 'utf8');

    console.log('New file created with the JavaScript code.');
};

// Start the scraping
getQuotes();