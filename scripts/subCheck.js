const channels = require('../channel/channels.json');
const fs = require('fs');

const subCheck = async () => {

    let channelsWithSubscribers = {}
    for (let channel of channels) {

        if (channel["channelSub"].includes(" subscribers")) {
            let subData = channel["channelSub"].split(" subscribers")
            channelsWithSubscribers[channel["channelLink"]] = {
                "channelTitle": channel["channelTitle"],
                "channelDescription": channel["channelDescription"],
                "channelLink": channel["channelLink"],
                "channelSub": channel["channelSub"],
                "channelSubCount": subData[0],
            };
        }
    }
    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./channel/channelsWithSubscribers.json", JSON.stringify(Object.values(channelsWithSubscribers)), 'utf8');
    console.log('New file created with the JavaScript code.');

    // Close the browser
    // await browser.close();

    // await browser.close()
};

// Start the scraping
subCheck();