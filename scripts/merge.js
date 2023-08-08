const channels = require('../channel/channels.json');
const amharicChannelData = require('../channel/amharicChannelLink.json');

const fs = require('fs');

const getQuotes = async() => {
    let amharicChannels = {}
    for (let channel of channels) {
        amharicChannels[channel["channelLink"]] = {
            "channelTitle": channel["channelTitle"],
            "channelLink": channel["channelLink"],
        };
    }

    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./channel/amharicChannels.json", JSON.stringify([...amharicChannelData, ...Object.values(amharicChannels)]), 'utf8');

    console.log('New file created with the JavaScript code.');
};

// Start the scraping
getQuotes();