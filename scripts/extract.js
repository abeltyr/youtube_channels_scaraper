const channels = require('../oldData/amharicChannels.json');
const fs = require('fs');

const containsAmharic = (str) => {
    const regex = /[\u1200-\u137F]/;
    return regex.test(str);
};


const hasAmharic = (str) => {
    return str.toLocaleLowerCase().includes("ethiopia") ||
        str.toLocaleLowerCase().includes("ethio") ||
        str.toLocaleLowerCase().includes("amharic") ||
        str.toLocaleLowerCase().includes("habesha") ||
        str.toLocaleLowerCase().includes("addis") ||
        str.toLocaleLowerCase().includes("ababa");
};


const getQuotes = async() => {
    let amharicChannelLink = {}
    let nonAmharicChannelLink = {}
    for (let channel of channels) {

        if (
            containsAmharic(channel["videoDescription"]) || containsAmharic(channel["channelName"]) ||
            containsAmharic(channel["channelLink"]) ||
            hasAmharic(channel["videoDescription"]) ||
            hasAmharic(channel["channelName"]) ||
            hasAmharic(channel["channelLink"])
        ) {
            amharicChannelLink[channel["channelLink"]] = {
                "channelTitle": channel["channelName"],
                "channelLink": channel["channelLink"],
            };
        } else {
            nonAmharicChannelLink[channel["channelLink"]] = {
                "channelTitle": channel["channelName"],
                "channelLink": channel["channelLink"],
            };
        }
    }

    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./channel/amharicChannelLink.json", JSON.stringify(Object.values(amharicChannelLink)), 'utf8');

    fs.writeFileSync("./channel/nonAmharicChannelLink.json", JSON.stringify(Object.values(nonAmharicChannelLink)), 'utf8');
    console.log('New file created with the JavaScript code.');

    // Close the browser
    // await browser.close();

    // await browser.close()
};

// Start the scraping
getQuotes();