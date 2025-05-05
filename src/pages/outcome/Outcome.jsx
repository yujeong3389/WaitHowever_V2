import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faHammer, faScaleBalanced, faFlag } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const extractValues = (response) => {
    const cleanResponse = response.replace(/^## 분석 결과\s*\n?/, ''); // '## 분석 결과' 제거

    const policyMatch = cleanResponse.match(/\*\*policy\*\*:\s*(보수|중도|진보)/i);
    const agitationMatch = cleanResponse.match(/\*\*agitation\*\*:\s*(\d+)/i);
    const keywordMatch = cleanResponse.match(/\*\*keyword\*\*:\s*([^\n]+)/i);
    const factsMatch = cleanResponse.match(/\*\*facts\*\*:\s*([^\n]+)/i);
    const perspectiveMatch = cleanResponse.match(/\*\*perspective\*\*:\s*([\s\S]*)/i);

    const policy = policyMatch ? policyMatch[1] : null;
    const agitation = agitationMatch ? parseInt(agitationMatch[1], 10) : null;
    const keyword = keywordMatch ? keywordMatch[1].split('/').map(item => item.trim()) : null;
    const facts = factsMatch ? factsMatch[1].trim() : null;
    const perspective = perspectiveMatch ? perspectiveMatch[1].trim() : null;

    return { policy, agitation, keyword, facts, perspective };
};

const Outcome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const response = location.state?.response || "No data available";

    const { policy, agitation, keyword, facts, perspective } = extractValues(response);

    const policyIcon = {
        보수: <FontAwesomeIcon icon={faShield} />,
        중도: <FontAwesomeIcon icon={faScaleBalanced} />,
        진보: <FontAwesomeIcon icon={faHammer} />
    };

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

    return (
        <S.Background>
            <S.Container>
                <S.Title>Wait, However</S.Title>
                <S.Response>
                {/* 키워드 표시 */}
                <S.KeywordContainer>
                    {keyword && keyword.map((item, index) => (
                        <S.Keyword key={index}># {item}</S.Keyword>
                    ))}
                </S.KeywordContainer>

                {/* 정책 성향과 선동성 아이콘 및 텍스트 표시 */}
                <S.IconsContainer>
                    {policy && (
                        <S.IconContainer>
                            <S.TendencyContainer>
                                <div>{policyIcon[policy]}</div>
                            </S.TendencyContainer>
                            <div>{policy}</div>
                        </S.IconContainer>
                    )}

                    {agitation && (
                        <S.IconContainer>
                            <S.AgitationContainer color={agitationColor[agitation]}>
                                <FontAwesomeIcon icon={faFlag} />
                            </S.AgitationContainer>
                            <div>{agitationText[agitation]}</div>
                        </S.IconContainer>
                    )}
                </S.IconsContainer>

                {/* Facts와 Perspective를 각각 분리하여 렌더링 */}
                
                    {facts && (
                        <>
                            <strong style={{fontSize:'24px'}}>Facts</strong>
                            <div>{facts}</div>
                        </>
                    )}
                    {perspective && (
                        <>
                            <br /> 
                            <strong style={{fontSize:'24px'}}>Perspective</strong>
                            <br /> <br />
                            {/* <div style={{whiteSpace: 'none'}}> */}
                                <ReactMarkdown>{perspective}</ReactMarkdown>
                            {/* </div> */}
                            
                        </>
                    )}
                </S.Response>

                <S.Button onClick={() => navigate(-1)}>돌아가기</S.Button>
            </S.Container>
        </S.Background>
    );
};

export default Outcome;


