const channels = require('../channel/channels.json');
const fs = require('fs');

const containsAmharic = (str) => {
    const regex = /[\u1200-\u137F]/;
    return regex.test(str);
};
const getQuotes = async () => {
    let amharicChannels = {}
    for (let channel of channels) {
        console.log(channel);

        if (containsAmharic(channel["videoDescription"]) || containsAmharic(channel["channelName"]) || containsAmharic(channel["channelLink"])) {
            amharicChannels[channel["channelLink"]] = channel;
        }
    }
    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("amharicChannels.json", JSON.stringify(Object.values(amharicChannels)), 'utf8');
    console.log('New file created with the JavaScript code.');

    // Close the browser
    // await browser.close();

    // await browser.close()
};

// Start the scraping
getQuotes();