import Button from "../Button";
import { Container } from "./styles";

const Card = ({ title, status, deleteClick }) => {
  return (
    <Container>
      <br />
      <span>{title}</span>
      <br />
      <span>{status}</span>
      <Button onClick={deleteClick}>Deletar</Button>
    </Container>
  );
};

export default Card;
