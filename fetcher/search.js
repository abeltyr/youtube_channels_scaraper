const puppeteer = require("puppeteer")
const fs = require('fs');
const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false
    });

    // Open a new page
    const page = await browser.newPage();
    // await page.setViewport({ width: 400, height: 1062 });
    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("https://www.youtube.com/results?search_query=amharic+podcast", {
        waitUntil: "domcontentloaded",
    });
    // let previousHeight;

    // previousHeight = await page.evaluate(document.documentElement.childNodes[1].childNodes[3].scrollHeight);
    // await page.evaluate('window.scrollTo(0, document.documentElement.childNodes[1].childNodes[3].scrollHeight)');
    // await page.waitForFunction(`document.documentElement.childNodes[1].childNodes[3].scrollHeight > ${previousHeight}`);

    // // // await page.waitFor(1000);


    await page.evaluate(() => {
        window.scrollTo(0, document.documentElement.childNodes[1].childNodes[3].scrollHeight);
    });



    let count = 0;

    const scroll = () => {
        setTimeout(async () => {
            const { before, after } = await page.evaluate(() => {

                const before = document.documentElement.childNodes[1].childNodes[3].scrollHeight
                window.scrollTo(0, document.documentElement.childNodes[1].childNodes[3].scrollHeight);
                return { before, after: document.documentElement.childNodes[1].childNodes[3].scrollHeight }
            });

            console.log(`scroll ${count}`, before, after,);

            if (count < 30) {
                scroll()
            } else {
                const quotes = await page.evaluate(() => {
                    const quoteList = document.querySelectorAll("#contents > ytd-video-renderer");

                    // Fetch the sub-elements from the previously fetched quote element
                    // Get the displayed text and return it (`.innerText`)


                    // Convert the quoteList to an iterable array
                    // For each quote fetch the text and author
                    return Array.from(quoteList).map((quote) => {
                        //     // Fetch the sub-elements from the previously fetched quote element
                        //     // Get the displayed text and return it (`.innerText`)
                        const videoDescriptionParent = quote.querySelector("#video-title > yt-formatted-string")

                        let videoDescription = "";
                        if (videoDescriptionParent)
                            videoDescription = videoDescriptionParent.innerText;

                        const channelParent = quote.querySelector("#text > a");

                        let channelLink = "";
                        let channelName = "";
                        if (channelParent) {
                            channelLink = channelParent.getAttribute("href");
                            channelName = channelParent.innerHTML;
                        }


                        // const videoId = quote.querySelector("#video-title").innerText;
                        // const videoView = quote.querySelector("#video-title").innerText;


                        return { videoDescription, channelLink, channelName };
                    });
                });

                // Display the quotes
                console.log("quotes", quotes);

                // await page.evaluate(() => {
                //     window.scrollTo(0, document.documentElement.childNodes[1].childNodes[3].scrollHeight);
                // });


                const path = "channelsData.json";
                if (fs.existsSync(path)) {
                    // If file exists, append the JavaScript code to it
                    fs.appendFileSync(path, JSON.stringify(quotes), 'utf8');
                    console.log('JavaScript code appended to existing file.');
                } else {
                    // If file doesn't exist, create a new file and write the JavaScript code to it
                    fs.writeFileSync(path, JSON.stringify(quotes), 'utf8');
                    console.log('New file created with the JavaScript code.');
                }


            }
            count++;
        }, 3000)
    }


    scroll();
    // Close the browser
    // await browser.close();

    // await browser.close()
};

// Start the scraping
getQuotes();