const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// URLs to scrape
const urls = [
  'http://books.toscrape.com/',
  'http://quotes.toscrape.com/',
  'https://www.scrapethissite.com/pages/forms/',
];

// Make multiple asynchronous requests to the URLs using axios
const fetchPages = async () => {
  const pagePromises = urls.map(async (url) => {
    const response = await axios.get(url);
    return response.data;
  });
  return Promise.all(pagePromises);
};

// Use Puppeteer to scrape the rendered HTML for each page
const scrapePages = async (pages) => {
  const results = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (let i = 0; i < pages.length; i++) {
    await page.setContent(pages[i]);
    const $ = cheerio.load(await page.content());
    const title = $('title').text();
    const paragraphs = $('p').text();
    results.push({ title, paragraphs });
  }
  await browser.close();
  return results;
};

// Fetch and scrape the pages, and handle any errors
fetchPages()
  .then(scrapePages)
  .then((results) => {
    console.log('Scraped results:', results);
  })
  .catch((error) => {
    console.error(error);
  });