const puppeteer = require("puppeteer")
const amharicChannels = require("./channel/amharicChannels.json")
const countData = require("./channel/countData.json")

const fs = require('fs');

const getQuotes = async() => {

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions'],
    });


    let detailedChannel = []
    let count = countData ? countData.count : 0

    for (let amharicChannel of amharicChannels.slice(count, amharicChannels.length)) {


        const page = await browser.newPage();

        let url =
            `https://www.youtube.com${amharicChannel["channelLink"]}/about`

        // Open a new page
        await page.goto(url, {
            waitUntil: "domcontentloaded",
        });

        await delay(2000)
        const {
            channelBanner,
            channelName,
            channelUserName,
            channelLogo,
            channelVideos,
            channelSubscription,
            channelCreated,
            channelViews,
            channelDescription,
            channelCreationLocation,
            channelLink
        } = await page.evaluate(() => {


            const channel = document.querySelector("#page-manager > ytd-browse");

            if (channel) {
                const channelSubscriptionParent = channel.querySelector("#subscriber-count")

                let channelSubscription = "";
                if (channelSubscriptionParent)
                    channelSubscription = channelSubscriptionParent.innerText;


                const channelUserNameParent = channel.querySelector("#channel-handle")

                let channelUserName = "";
                if (channelUserNameParent)
                    channelUserName = channelUserNameParent.innerText;



                const channelVideosParent = channel.querySelector("#meta > span:nth-child(6)")

                let channelVideos = "";
                if (channelVideosParent)
                    channelVideos = channelVideosParent.innerText;


                const channelNameParent = channel.querySelector("#text")

                let channelName = "";
                if (channelNameParent)
                    channelName = channelNameParent.innerText;


                const channelLogoParent = channel.querySelector("img#img.style-scope.yt-img-shadow")

                let channelLogo = "";
                if (channelLogoParent) {
                    channelLogo = channelLogoParent.src;
                    console.log("channelLogo", channelLogo)
                }

                const channelBannerParent = channel.querySelector("#contentContainer > div.banner-visible-area.style-scope.ytd-c4-tabbed-header-renderer")

                let channelBanner = "";
                if (channelBannerParent) {
                    const style = window.getComputedStyle(channelBannerParent);
                    const backgroundImage = style.getPropertyValue('--yt-channel-banner');
                    channelBanner = backgroundImage.slice(4, backgroundImage.length - 2); // remove 'url("' at the start and '")' at the end
                }


                const channelCreatedParent = channel.querySelector("#right-column > yt-formatted-string:nth-child(2) > span:nth-child(2)")

                let channelCreated = "";
                if (channelCreatedParent)
                    channelCreated = channelCreatedParent.innerText;


                const channelViewsParent = channel.querySelector("#right-column > yt-formatted-string:nth-child(3)");

                let channelViews = "";
                if (channelViewsParent)
                    channelViews = channelViewsParent.innerHTML;



                const channelDescriptionParent = channel.querySelector("#description")

                let channelDescription = "";
                if (channelDescriptionParent)
                    channelDescription = channelDescriptionParent.innerText;


                const channelLinksParent = channel.querySelectorAll("#legacy-link-list-container > a");
                let channelLink = [];
                if (channelLinksParent) {
                    for (let channelLinkParent of channelLinksParent) {
                        channelLink = [...channelLink, {
                            name: channelLinkParent.innerText,
                            url: channelLinkParent.getAttribute("href")
                        }]
                    }
                }

                const channelCreationLocationParent = channel.querySelector("#details-container > table > tbody > tr:nth-child(2) > td:nth-child(2) > yt-formatted-string");

                let channelCreationLocation = "";
                if (channelCreationLocationParent)
                    channelCreationLocation = channelCreationLocationParent.innerHTML;

                return { channelBanner, channelName, channelLogo, channelVideos, channelSubscription, channelCreated, channelViews, channelDescription, channelCreationLocation, channelLink, channelUserName };
            }

            return {}
        });

        const data = {
            channelBanner,
            channelName,
            channelLogo,
            channelVideos,
            channelSubscription,
            channelDescription,
            channelCreationLocation,
            channelLink,
            channelCreated,
            channelViews,
            channelLink: amharicChannel["channelLink"],
            channelUserName,
        }

        fs.appendFileSync("./channel/detailedChannelProgress.json",
            JSON.stringify(data) + ",", 'utf8');

        console.log('channel', channelName, "is scraped");

        detailedChannel = [...detailedChannel, data]



        page.close();
        count++;
        fs.writeFileSync("./channel/countData.json",
            JSON.stringify({ count }), 'utf8');
    }

    fs.writeFileSync("./channel/detailedChannel.json", JSON.stringify(detailedChannel), 'utf8');
    console.log('New file created with the JavaScript code.');
    await browser.close()
}


// Start the scraping
getQuotes();

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}