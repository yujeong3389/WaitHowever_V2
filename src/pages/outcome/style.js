import styled from 'styled-components';

const S = {};

// 전체 배경 스타일
S.Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E2D9;
    overflow: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

// 컨테이너 스타일
S.Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
    position: relative;
    padding:5% 10%;
    
`;

// 제목 스타일
S.Title = styled.h1`
    font-size: 1.8rem;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
    align-self: flex-start;
`;

// 응답 텍스트 스타일
S.Response = styled.div`
    font-size: 1rem;
    color: black;
    background-color: #d9d9d9;
    overflow-x: hidden;
    padding: 15px;
    border-radius: 5px;
    
    white-space: pre-wrap;
    text-align: left;  
    line-height: 1.5;
    margin-bottom: 20px;
    padding:30px 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    /* Markdown 스타일 커스터마이징 */
    h2, h3 {
        color: #333333;
        margin-top: 10px;
    }
    p, ul, li {
        margin: 5px 0;
    }
    strong {
        font-weight: bold;
    }
`;

// 버튼 스타일
S.Button = styled.button`
    align-self: flex-end; 
    padding: 0.5rem 1rem;
    font-size: 20px;
    background-color: #708286;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
    }
`;

// 텐던시 아이콘 및 텍스트 스타일
S.TendencyContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: #333333;
    

    svg {
        /* margin-right: 8px; */
        font-size: 30px;
        /* margin-top: 3px; */
    }
`;
S.IconsContainer=styled.div`
    display: flex;
    align-items: center;
    /* width:80%; */
    justify-content: space-evenly;
    font-weight: 600;
    color:#555555;
    
`
S.IconContainer=styled.div`
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items:center;
    margin:30px;
    margin-bottom: 50px;
`
// // 선동 수준 아이콘 및 색상 스타일
S.AgitationContainer = styled.div`
    display: flex;
    align-items: center;
    
    color: ${(props) => props.color || '#333333'};
    /* margin-bottom: 20px; */

    svg {
        /* margin-right: 8px; */
        font-size: 30px;
    }
`;
S.KeywordContainer = styled.div`
    display: flex;
    justify-content:center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
`;

S.Keyword = styled.div`
    background-color: #86A789;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
`;
export default S;
