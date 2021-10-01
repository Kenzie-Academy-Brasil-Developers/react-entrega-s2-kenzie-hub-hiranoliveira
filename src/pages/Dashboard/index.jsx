import { Redirect } from "react-router";
import { Container, InputContainer, TechsContainer } from "./styles";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Dashboard = ({ auth }) => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!"),
    status: yup.string().required("Campo obrigatório!"),
  });

  const [user, setUser] = useState([]);

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Khub:token")) || ""
  );

  useEffect(() => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((e) => console.log(e));
  }, []);

  const loadPage = () => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((e) => console.log(e));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (newTech) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", newTech, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(newTech);
        console.log(res.data);
        loadPage();
      })
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
        loadPage();
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
          <input placeholder="Nova tech" {...register("title")} />
          {errors.title?.message}
          <input placeholder="Status" {...register("status")} />
          {errors.status?.message}
          <Button type="submit">Adicionar</Button>
        </form>
      </InputContainer>
      <h2>{user.name}</h2>
      <h2>Tecnologias:</h2>
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
