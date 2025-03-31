import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [url, setUrl] = useState('');         // URL을 입력 받을 상태
  const [content, setContent] = useState('');  // 크롤링된 기사 본문

  const handleSubmit = async () => { // URL을 매개변수로 받지 않고 직접 사용
    try {
      // Flask API로 크롤링된 기사 요청
      const response = await axios.get(`http://127.0.0.1:5000/crawl?url=${encodeURIComponent(url)}`);
      setContent(response.data.content); // 받은 기사를 상태에 저장
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  return (
    <div>
      <h1>Article Crawler</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)} // URL 입력 값 상태 업데이트
        placeholder="Enter article URL"
      />
      <button onClick={handleSubmit}>Crawl Article</button>

      {content && (
        <div>
          <h2>Article Content:</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default Test;
