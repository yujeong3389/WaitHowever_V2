const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 5000;

// 크롤링할 URL
const targetUrl = 'https://www.newsis.com/view/NISX20250328_0003117519'; // 여기에 크롤링하려는 웹사이트 주소를 넣습니다.

app.get('/crawl', async (req, res) => {
  try {
    // 1. 웹페이지를 가져오기
    const { data } = await axios.get(targetUrl);

    // 2. cheerio로 HTML 파싱
    const $ = cheerio.load(data);

    // 3. 원하는 데이터를 추출
    const titles = [];
    $('h1, h2').each((index, element) => {
      titles.push($(element).text());
    });

    // 4. 추출한 데이터를 API로 응답
    res.json({ titles });
  } catch (error) {
    console.error('크롤링 에러:', error);
    res.status(500).json({ error: '크롤링 중 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
