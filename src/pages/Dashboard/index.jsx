import { Redirect } from "react-router";
import { Container, InputContainer, TechsContainer } from "./styles";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";

const Dashboard = ({ auth }) => {
  const [user, setUser] = useState({});

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Khub:token")) || ""
  );

  const loadTechs = () => {
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      //                                ^^
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTechs();
  });

  const { register, handleSubmit } = useForm();

  const onSubmitFunction = (data) => {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => loadTechs())
      .catch((e) => console.log(e));
  };

  const techDelete = (id) => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        loadTechs();
      })
      .catch((e) => console.log(e));
  };

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Input
            required
            placeholder="Nova tech"
            register={register("title")}
            name="tech"
          />
          <Input
            required
            placeholder="Status"
            register={register("status")}
            name="status"
          />
          <Button type="submit">Adicionar</Button>
        </form>
      </InputContainer>
      <TechsContainer>
        {user.techs &&
          user.techs.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              status={item.status}
              id={item.id}
              deleteClick={() => techDelete(item.id)}
            />
          ))}
      </TechsContainer>
    </Container>
  );
};

export default Dashboard;
