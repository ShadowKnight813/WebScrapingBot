const axios = require('axios');
const cheerio = require('cheerio');

// URL to scrape
const url = 'https://example.com';

// Make a GET request to the URL
axios.get(url)
  .then(response => {
    // Load the HTML response into Cheerio
    const $ = cheerio.load(response.data);

    // Find elements on the page using jQuery-style selectors
    const title = $('title').text();
    const paragraphs = $('p').text();

    // Do something with the scraped data
    console.log('Title:', title);
    console.log('Paragraphs:', paragraphs);
  })
  .catch(error => {
    console.error(error);
  });
