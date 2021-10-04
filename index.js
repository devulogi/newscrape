const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const url = 'https://www.rappler.com';
const target = '.A__DefaultLink-sc-120nwt8-0';

app.get('/', (req, res) => {
  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(target, html).each(function () {
        const title = $(this).find('h3').text();
        const uri = $(this).attr('href');
        if (title !== '') {
          articles.push({
            title,
            href: `${url}${uri}`,
          });
        }
      });

      res.status(200).json(articles);
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => {
  console.log('App running on http://localhost:3000!');
});
