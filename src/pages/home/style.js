import styled from 'styled-components';

const S={};

S.Background=styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #E5E2D9;
    overflow: hidden;
    /* overflow: auto; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`
S.Container = styled.div`
    /* width: 100%; */
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
    position: relative;
    padding:10%;
`;

S.Title = styled.div`
  font-size: 30px;
  width: 100%;
  margin-bottom: 1.5rem;
  color:#21221C;
`;

S.Title2=styled.div`
    font-size: 20px;
    width: 100%;
    color:#49473B;
    margin-bottom: 1.5rem;
`
S.Input = styled.textarea`
  width: 98%;
  /* max-width: 500px; */
  height: 200px;
  padding: 1%;
  font-size: 1rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  border:none;
  outline: none;
  resize: none;
`;

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

S.Response = styled.p`
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #333;
  white-space: pre-wrap;
`;

export default S;