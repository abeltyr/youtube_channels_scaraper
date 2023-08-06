const channels = require('../channel/channelsWithSubscribers.json');
const fs = require('fs');

const subClassifier = async () => {

    let channelsUnderK = {}
    let channelsWithK = {}
    let channelsWithM = {}

    for (let channel of channels) {
        if (channel["channelSubCount"] && channel["channelSubCount"].includes("K")) {
            channelsWithK[channel["channelLink"]] = channel;
        } else if (channel["channelSubCount"] && channel["channelSubCount"].includes("M")) {
            channelsWithM[channel["channelLink"]] = channel;
        } else {
            channelsUnderK[channel["channelLink"]] = channel;
        }
    }
    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./channel/subData/channelsUnderK.json", JSON.stringify(Object.values(channelsUnderK)), 'utf8');


    fs.writeFileSync("./channel/subData/channelsWithK.json", JSON.stringify(Object.values(channelsWithK)), 'utf8');


    fs.writeFileSync("./channel/subData/channelsWithM.json", JSON.stringify(Object.values(channelsWithM)), 'utf8');


    console.log('New file created with the JavaScript code.');


};

// Start the scraping
subClassifier();