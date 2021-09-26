import { Container, InputContainer } from "./styles";

const Input = ({ label, register, name, error, ...rest }) => {
  return (
    <Container>
      <div>
        {label} {!!error && <span> - {error}</span>}
      </div>

      <InputContainer isErrored={!!error}>
        <input {...rest} />
      </InputContainer>
    </Container>
  );
};

export default Input;
