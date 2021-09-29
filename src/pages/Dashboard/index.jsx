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
  const [data, setData] = useState({});

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Khub:token")) || ""
  );

  useEffect(() => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!"),
    status: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loadPage = () => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const onSubmitFunction = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
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
        // console.log(res.data);
        loadPage();
      })
      .catch((e) => console.log(e));
  };

  if (!auth) {
    return <Redirect to="/login" />;
  }
  console.log(data.techs);

  return (
    <Container>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input placeholder="Nova tech" {...register("title")} name="title" />
          {errors.title?.message}
          <input placeholder="Status" {...register("status")} name="status" />
          {errors.status?.message}
          <Button type="submit">Adicionar</Button>
        </form>
      </InputContainer>
      <h1>Nome: {data.name}</h1>
      <br />
      <h4>Bio: {data?.bio}</h4>
      <br />
      <h4>Contato: {data?.contact}</h4>
      <br />
      <h2>Tecnologias:</h2>
      <TechsContainer>
        {data.techs &&
          data?.techs.map((item, index) => (
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
