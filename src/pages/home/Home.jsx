import React, { useState } from 'react';

import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import S from './style';
import { useNavigate } from 'react-router-dom';

const API_KEY = "AIzaSyCcCTgLslAn4ZqUCGmVTV0BUVykeJinpNw"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const generateText = async () => {
        if (!prompt.trim()) {  // 입력값이 없거나 공백일 때
            alert("분석하고자 하는 게시글을 입력하세요.");
            return;  // 함수 종료, 분석 진행되지 않음
        }
        setLoading(true);
        try {
            
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                generationConfig: {
                    temperature: 1,
                    top_p: 0.95,
                    top_k: 40,
                    max_output_tokens: 8192,
                    response_mime_type: "text/plain",
                    // system_instruction: "당신은 다양한 관점을 제공하는 인공지능입니다. 사용자가 올린 글을 다음 네 가지로 분석하여 결과를 제공하십시오:\n\n정치 성향 및 선동 수준: 글의 정치 성향을 '보수', '중도', '진보' 중 하나로 구분하고, 선동 수준을 1~5로 평가하십시오. 예시: policy: 중도, agitation: 3\n핵심 키워드: 중요한 5개의 키워드를 추출하여 slash(/)로 구분하십시오. 예시: keyword: 환경/정책/경제/사회/기술\n사실 요약: 주요 사실을 한 줄로 요약하십시오. 예시: facts: [사실 요약 내용]\n반대 입장 및 추가 고려 사항: 글의 시각과 반대되는 입장과 추가 고려할 만한 사항을 각각 문단으로 나누어 명확히 제시하십시오.\n각 항목의 제목은 **\"zai_tendency\", \"zai_keyword\", \"zai_facts\", \"zai_perspective\"**로 표기하여 결과를 제공합니다."
                }
            });
            
            // 명시적으로 prompt에 system_instruction을 결합
            const detailedPrompt = `
            ${prompt}
            \n\n분석 지침: 당신은 다양한 관점을 제공하는 인공지능입니다. 다음 네 가지 기준으로 입력된 글을 분석하여 결과를 제공하십시오:
            
            - **정치 성향 및 선동 수준**: 글의 정치 성향을 '보수', '중도', '진보' 중 하나로 구분하고, 선동 수준을 1~5로 평가하십시오.
              예시: **policy**: 중도, **agitation**: 3
            - **핵심 키워드**: 중요한 5개의 키워드를 추출하여 slash(/)로 구분하십시오.
              예시: **keyword**: 환경/정책/경제/사회/기술
            - **사실 요약**: 주요 사실을 한 줄로 요약하십시오.
              예시: **facts**: [사실 요약 내용]
            - **반대 입장 및 추가 고려 사항**: 글의 시각과 반대되는 입장과 추가 고려할 만한 사항을 각각 문단으로 나누어 명확히 제시하십시오.
            
            출력 형식은 다음과 같이 각 항목의 제목을 포함하여 제공하십시오:
            **policy, agitation, keyword, facts, perspective**.
            `;

            // 텍스트 생성 요청
            const result = await model.generateContent(detailedPrompt);
            const res = await result.response;
            const text = await res.text();
            setResponse(text);
            
            navigate("/outcome", { state: { response: text } });
        } catch (error) {
            console.error("Error generating text:", error);
            setResponse("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <S.Background>
            <S.Container>
                <S.Title>Hello, I am Wait, However a helpful assisant that keeps you balanced.</S.Title>
                <S.Title2>
                    If you want to know the other perspective of article, paste the article in.
                    Artificial Intelligence will help you.</S.Title2>
                <S.Input
                placeholder="분석하고자 하는 게시글을 입력하세요."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                />
                <S.Button onClick={generateText} disabled={loading}>
                    {loading ? "분석중..." : "분석하기"}
                </S.Button>
                {/* {response && <S.Response>{response}</S.Response>} */}
        </S.Container>
      </S.Background>
    );
};

export default Home;


