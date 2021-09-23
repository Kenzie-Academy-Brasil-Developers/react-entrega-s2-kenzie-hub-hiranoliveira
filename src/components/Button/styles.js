import styled from "styled-components";

export const Container = styled.button`
  background: ${(props) => (props.whiteSchema ? "#689CD3" : "#07153C")};
  color: ${(props) => (props.whiteSchema ? "#07153C" : "#f5f5f5")};
  height: 45px;
  border-radius: 8px;
  border: 2px solid var(--darkblue);
  font-family: "Roboto Mono", monospace;
  margin-top: 16px;
  width: 100%;
  transition: 0.5s;
  :hover {
    border: 2px solid var(--white);
  }
`;
