import { Redirect } from "react-router";
import { Container, InputContainer, TechsContainer } from "./styles";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

const Dashboard = ({ auth }) => {
  const [users, setUsers] = useState();
  const functionUsers = () => {
    api.get("/users").then((res) => setUsers(res.data));
  };
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!"),
    status: yup.string().required("Campo obrigatório!"),
  });
  useEffect(() => {
    loadPage();
  }, []);

  const token = JSON.parse(localStorage.getItem("token")) || "";

  const user = JSON.parse(localStorage.getItem("id")) || "";

  const [techs, setTechs] = useState([]);

  const loadPage = () => {
    const { id } = user;
    api
      .get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTechs(res.data))
      .catch((e) => console.log(e));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = ({ title, status }) => {
    api
      .post(
        "/users/techs",
        { title: title, status: status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        loadPage();
      })
      .catch((e) => console.log(e));
  };

  const techDelete = (id) => {
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        loadPage();
      })
      .catch((e) => console.log(e));
  };

  if (!auth) {
    return <Redirect to="/login" />;
  }

  console.log(users);

  return (
    <Container>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input placeholder="Nova tech" {...register("title")} />
          {errors.title?.message}
          <input placeholder="Status" {...register("status")} />
          {errors.status?.message}
          <Button type="submit">Adicionar</Button>
        </form>
      </InputContainer>
      <h2>Tecnologias:</h2>
      <TechsContainer>
        {console.log(techs)}
        {techs.techs &&
          techs.techs.map((item, index) => (
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
