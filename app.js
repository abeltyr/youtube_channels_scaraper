const puppeteer = require("puppeteer")
const channels = require("./data/channels.json")

const fs = require('fs');

const getQuotes = async() => {

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions'],
    });


    let detailedChannel = []

    let count = 0
    for (let channel of channels) {

        const page = await browser.newPage();

        let url =
            `https://www.youtube.com${channel["link"]}/about`

        // Open a new page
        await page.goto(url, {
            waitUntil: "domcontentloaded",
        });

        await delay(1000)
        const {
            socialLinks
        } = await page.evaluate(() => {

            const channelLinksParent = document.querySelectorAll("#legacy-link-list-container > a");

            "#legacy-link-list-container > a > yt-formatted-string"
            let socialLinks = [];
            if (channelLinksParent) {
                for (let channelLinkParent of channelLinksParent) {
                    const channelLinkNameParent = channelLinkParent.querySelector("yt-formatted-string");
                    let url = channelLinkParent.getAttribute("href");
                    let name;

                    if (channelLinkNameParent) {
                        name = channelLinkNameParent.innerText;
                    }
                    socialLinks = [...socialLinks, {
                            name,
                            url
                        }

                    ]
                }

                return { socialLinks };
            }

            return {}
        });

        console.log({ socialLinks });

        const data = {
            ...channel,
            socialLinks: socialLinks
        }
        count++
        console.log('channel', channel.name, "link updated", socialLinks, `${count}/${channels.length}`);
        page.close();

        fs.appendFileSync("./data/detailedChannelProgress.json",
            JSON.stringify(data) + ",", 'utf8');


        detailedChannel = [...detailedChannel, data]

    }

    fs.writeFileSync("./data/detailedChannel.json", JSON.stringify(detailedChannel), 'utf8');
    console.log('New file created with the JavaScript code.');
    await browser.close()
}


// Start the scraping
getQuotes();

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}