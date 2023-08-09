const channels = require('../channel/detail0.json');
const fs = require('fs');

const subCheck = async() => {

    let channelsWithSubscribers = {}
    let channelsWithNoSubscribers = {}
    for (let channel of channels) {
        if (
            channel["channelSubscription"] &&
            channel["channelVideos"] &&
            channel["channelViews"] &&
            channel["channelSubscription"].includes(" subscriber") &&
            channel["channelVideos"].includes(" video") &&
            channel["channelViews"].includes(" view")
        ) {
            let subData = channel["channelSubscription"].split(" subscriber")
            let videoData = channel["channelVideos"].split(" video")
            let viewData = channel["channelVideos"].split(" view")


            if (channelsWithSubscribers[channel["channelLink"]]) {

                channelsWithSubscribers[channel["channelLink"]] = {
                    "subscriptionCount": channelsWithSubscribers[channel["channelLink"]]["subscriptionCount"] != "" ? channelsWithSubscribers[channel["channelLink"]]["subscriptionCount"] : subData[0],
                    "videoCount": channelsWithSubscribers[channel["channelLink"]]["videoCount"] != "" ? channelsWithSubscribers[channel["channelLink"]]["videoCount"] : videoData[0],
                    "viewCount": channelsWithSubscribers[channel["channelLink"]]["viewCount"] != "" ? channelsWithSubscribers[channel["channelLink"]]["viewCount"] : viewData[0],
                    "banner": channelsWithSubscribers[channel["channelLink"]]["banner"] != "" ? channelsWithSubscribers[channel["channelLink"]]["banner"] : viewData[0],
                    "name": channelsWithSubscribers[channel["channelLink"]]["name"] != "" ? channelsWithSubscribers[channel["channelLink"]]["name"] : channel["channelName"],
                    "logo": channelsWithSubscribers[channel["channelLink"]]["logo"] != "" ? channelsWithSubscribers[channel["channelLink"]]["logo"] : channel["channelLogo"],
                    "videos": channelsWithSubscribers[channel["channelLink"]]["videos"] != "" ? channelsWithSubscribers[channel["channelLink"]]["videos"] : channel["channelVideos"],
                    "subscription": channelsWithSubscribers[channel["channelLink"]]["subscription"] != "" ? channelsWithSubscribers[channel["channelLink"]]["subscription"] : channel["channelSubscription"],
                    "description": channelsWithSubscribers[channel["channelLink"]]["description"] != "" ? channelsWithSubscribers[channel["channelLink"]]["description"] : channel["channelDescription"],
                    "creationLocation": channelsWithSubscribers[channel["channelLink"]]["creationLocation"] != "" ? channelsWithSubscribers[channel["channelLink"]]["creationLocation"] : channel["channelCreationLocation"],
                    "link": channelsWithSubscribers[channel["channelLink"]]["link"] != "" ? channelsWithSubscribers[channel["channelLink"]]["link"] : channel["channelLink"],
                    "created": channelsWithSubscribers[channel["channelLink"]]["created"] != "" ? channelsWithSubscribers[channel["channelLink"]]["created"] : channel["channelCreated"],
                    "views": channelsWithSubscribers[channel["channelLink"]]["views"] != "" ? channelsWithSubscribers[channel["channelLink"]]["views"] : channel["channelViews"],
                    "userName": channelsWithSubscribers[channel["channelLink"]]["userName"] != "" ? channelsWithSubscribers[channel["channelLink"]]["userName"] : channel["channelUserName"],
                };
            } else {
                channelsWithSubscribers[channel["channelLink"]] = {
                    "subscriptionCount": subData[0],
                    "videoCount": videoData[0],
                    "viewCount": viewData[0],
                    "banner": channel["channelBanner"],
                    "name": channel["channelName"],
                    "logo": channel["channelLogo"],
                    "videos": channel["channelVideos"],
                    "subscription": channel["channelSubscription"],
                    "description": channel["channelDescription"],
                    "creationLocation": channel["channelCreationLocation"],
                    "link": channel["channelLink"],
                    "created": channel["channelCreated"],
                    "views": channel["channelViews"],
                    "userName": channel["channelUserName"],
                };

            }
        } else {
            channelsWithNoSubscribers[channel["channelLink"]] = channel
        }
    }
    // If file doesn't exist, create a new file and write the JavaScript code to it
    fs.writeFileSync("./channel/channelsWithSubscribers.json", JSON.stringify(Object.values(channelsWithSubscribers)), 'utf8');
    fs.writeFileSync("./channel/channelsWithNoSubscribers.json", JSON.stringify(Object.values(channelsWithNoSubscribers)), 'utf8');

    console.log('New file created with the JavaScript code.');

    // Close the browser
    // await browser.close();

    // await browser.close()
};

// Start the scraping
subCheck();