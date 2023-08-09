const channels = require('../channel/channelsWithSubscribers.json');
const fs = require('fs');

const subClassifier = async() => {

    let channelsUnderK = {}
    let channelsWithK = {}
    let channelsWithM = {}

    for (let channel of channels) {
        if (channel["subscriptionCount"] && channel["subscriptionCount"].includes("K")) {
            channelsWithK[channel["link"]] = {
                ...channel,
                subCount: parseFloat(channel["subscriptionCount"].replace("K", ""))
            };
        } else if (channel["subscriptionCount"] && channel["subscriptionCount"].includes("M")) {
            channelsWithM[channel["link"]] = {
                ...channel,
                subCount: parseFloat(channel["subscriptionCount"].replace("M", ""))
            };
        } else {
            channelsUnderK[channel["link"]] = {
                ...channel,
                subCount: parseFloat(channel["subscriptionCount"])
            };
        }
    }
    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./channel/subData/channelsUnderK.json", JSON.stringify(bubbleSortObjects(Object.values(channelsUnderK))), 'utf8');


    fs.writeFileSync("./channel/subData/channelsWithK.json", JSON.stringify(bubbleSortObjects(Object.values(channelsWithK))), 'utf8');


    fs.writeFileSync("./channel/subData/channelsWithM.json", JSON.stringify(bubbleSortObjects(Object.values(channelsWithM))), 'utf8');


    console.log('New file created with the JavaScript code.');


};

function bubbleSortObjects(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j].subCount < arr[j + 1].subCount) {
                // Swap the objects
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Start the scraping
subClassifier();