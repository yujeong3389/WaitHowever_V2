document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const titleElement = document.querySelector("h2");  

  analyzeBtn.classList.add("hidden");
  loading.classList.remove("hidden");
  result.classList.add("hidden");
  result.textContent = "";
  titleElement.classList.add("hidden");

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_URL" });
    const url = response.url;

    const res = await fetch(`http://127.0.0.1:5000/crawl?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    const article = data.content;

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCcCTgLslAn4ZqUCGmVTV0BUVykeJinpNw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
기사 본문:
${article}

\n\n분석 지침: 당신은 다양한 관점을 제공하는 인공지능입니다. 다음 네 가지 기준으로 입력된 글을 분석하여 결과를 제공하십시오:

- **정치 성향 및 선동 수준**: 글의 정치 성향을 '보수', '중도', '진보' 중 하나로 구분하고, 선동 수준을 1~5로 평가하십시오.
  예시: **policy**: 중도, **agitation**: 3
- **핵심 키워드**: 중요한 5개의 키워드를 추출하여 slash(/)로 구분하십시오.
  예시: **keyword**: 환경/정책/경제/사회/기술
- **사실 요약**: 주요 사실을 한 줄로 요약하십시오.
  예시: **facts**: [사실 요약 내용]
- **반대 입장 및 추가 고려 사항**: 글의 시각과 반대되는 입장과 추가 고려할 만한 사항을 각각 문단으로 나누어 명확히 제시하십시오.

출력 형식은 다음과 같이 각 항목의 제목을 포함하여 제공하십시오:
**keyword, policy, agitation, facts, perspective**.
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const resultJson = await geminiResponse.json();
    const replyText = resultJson.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Gemini 응답 원문:", replyText);

    if (replyText) {
      const agitationColor = {
        1: "teal",
        2: "indigo",
        3: "orange",
        4: "red",
        5: "red",
      };

      const agitationText = {
        1: "매우 낮은 선동성",
        2: "낮은 선동성",
        3: "보통 선동성",
        4: "높은 선동성",
        5: "매우 높은 선동성",
      };

      let updatedText = replyText;
      
      updatedText = updatedText
      .replace(/정치 성향 및 선동 수준/g, "")
      .replace(/핵심 키워드/g, "")
      .replace(/사실 요약:/g, "**Fact:**") 
      .replace(/반대 입장 및 추가 고려 사항:/g, ""); 

      const keywordMatch = updatedText.match(/\*\*keyword\*\*:\s*([^\n]+)/i);
      const policyMatch = updatedText.match(/\*\*policy\*\*:\s*(보수|중도|진보)[,\n]?\s*\*\*agitation\*\*:\s*(\d)/i);
      const factsMatch = updatedText.match(/\*\*facts\*\*:\s*([^\n]+)/i);
      const perspectiveMatch = replyText.match(/\*\*perspective\*\*:\s*([\s\S]+)/i);

      let htmlSections = [];

      if (keywordMatch) {
        const keywords = keywordMatch[1].split("/").map(k => k.trim());
        const badges = keywords.map(k => `
          <span style="
            background-color: #86A789;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.95em;
            font-weight: bold;
          ">#${k}</span>
        `).join("");
        htmlSections.push(`
          <div style="display: flex; flex-wrap: wrap; gap: 0.4em; margin: 0.5em 0 1em 0; justify-content: center;">
            ${badges}
          </div>
        `);
      }

      if (policyMatch) {
        const policyValue = policyMatch[1];
        const agitationValue = parseInt(policyMatch[2]);

        let policyIcon = "";
        let policyColor = "#000000";
        if (policyValue === "보수") policyIcon = "fa-shield";
        else if (policyValue === "중도") policyIcon = "fa-scale-balanced";
        else if (policyValue === "진보") policyIcon = "fa-hammer";

        const agiColor = agitationColor[agitationValue] || "gray";
        const agiText = agitationText[agitationValue] || "모름";

        htmlSections.push(`
          <div style="display: flex; flex-direction: row; justify-content: space-around; gap: 1.5em; margin: 0.5em 0;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <i class="fas ${policyIcon}" style="font-size: 1.8em; color: ${policyColor};"></i>
              <div style="margin-top: 3px; font-weight: bold;">${policyValue}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <i class="fas fa-flag" style="font-size: 1.8em; color: ${agiColor};"></i>
              <div style="margin-top: 3px; font-weight: bold;">${agiText}</div>
            </div>
          </div>
        `);
      }

      if (factsMatch) {
        htmlSections.push(`
          <div style="margin-top: 0.5em;"><strong>Facts</strong><br>${factsMatch[1]}</div>
        `);
      }

      if (perspectiveMatch && perspectiveMatch[1].trim() !== "") {
        const perspectiveHtml = markdownToHtml(perspectiveMatch[1].trim());
        htmlSections.push(`<div class="mb-4"><strong>Perspective:</strong><br>${perspectiveHtml}</div>`);
      }
      result.innerHTML = htmlSections.join("");

      loading.classList.add("hidden");
      result.classList.remove("hidden");
      analyzeBtn.classList.add("hidden");
      titleElement.classList.add("hidden");
    }
  } catch (error) {
    console.error("분석 중 오류 발생:", error);
    result.textContent = "분석 중 오류가 발생했습니다.";
    loading.classList.add("hidden");
    result.classList.remove("hidden");
    analyzeBtn.textContent = "기사 분석";
  }
});

function markdownToHtml(text) {
  let html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\r?\n/g, "<br>");
  html = html.replace(/<br>\* (.*?)(?=<br>|$)/g, "<li>$1</li>");
  if (html.includes("<li>")) {
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
  }
  html = html.replace(/<br><br>/g, "<br><br>");
  return html;
}
