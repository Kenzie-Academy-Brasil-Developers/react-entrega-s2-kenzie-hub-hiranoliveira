import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 38px;
`;

export const InputContainer = styled.div`
  flex: 1;
  margin-top: 32px;
  padding: 0 38px;
  form {
    display: flex;
    > div {
      max-width: 80%;
      flex: 1;
      margin-right: 16px;
    }

    button {
      max-width: 260px;
      height: 60px;
      margin: 0;
    }
  }
`;

export const TechsContainer = styled.div`
  padding: 0 38px;
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
`;
