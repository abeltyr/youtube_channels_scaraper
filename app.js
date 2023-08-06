const puppeteer = require("puppeteer")
const oldData = require("./oldData/channelsData.json")
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

    let url =
        // "https://www.youtube.com/results?search_query=amharic+entertainment&sp=EgIQAg%253D%253D"
        // "https://www.youtube.com/results?search_query=Amharic+news&sp=EgIQAg%253D%253D"
        "https://www.youtube.com/results?search_query=Amharic+music&sp=EgIQAg%253D%253D"
    // "https://www.youtube.com/results?search_query=amahric+movie&sp=EgIQAg%253D%253D"

    await page.goto(url, {
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

            if (count < 29) {
                scroll()
            } else {
                const quotes = await page.evaluate(() => {
                    const quoteList = document.querySelectorAll("#content-section");

                    // Fetch the sub-elements from the previously fetched quote element
                    // Get the displayed text and return it (`.innerText`)


                    // Convert the quoteList to an iterable array
                    // For each quote fetch the text and author
                    return Array.from(quoteList).map((quote) => {
                        //     // Fetch the sub-elements from the previously fetched quote element
                        //     // Get the displayed text and return it (`.innerText`)
                        const channelTitleParent = quote.querySelector("#text")

                        let channelTitle = "";
                        if (channelTitleParent)
                            channelTitle = channelTitleParent.innerText;


                        const channelDescriptionParent = quote.querySelector("#description")

                        let channelDescription = "";
                        if (channelDescriptionParent)
                            channelDescription = channelTitleParent.innerText;




                        const channelLinkParent = quote.querySelector("#main-link");
                        let channelLink = "";
                        if (channelLinkParent)
                            channelLink = channelLinkParent.getAttribute("href");

                        const channelSubParent = quote.querySelector("#video-count");

                        let channelSub = "";
                        if (channelSubParent)
                            channelSub = channelSubParent.innerHTML;



                        return { channelTitle, channelDescription, channelLink, channelSub };
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
                    fs.appendFileSync(path, JSON.stringify([...oldData, ...quotes]), 'utf8');
                    console.log('JavaScript code appended to existing file.');
                } else {
                    // If file doesn't exist, create a new file and write the JavaScript code to it
                    fs.writeFileSync(path, JSON.stringify([...oldData, ...quotes]), 'utf8');
                    console.log('New file created with the JavaScript code.');
                }

                await browser.close();

            }
            count++;
        }, 3000)
    }


    scroll();
    // Close the browser

    // await browser.close()
};

// Start the scraping
getQuotes();