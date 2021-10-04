import { AnimationContainer, Background, Container, Content } from "./styles";
import Button from "../../components/Button";
import { Link, Redirect, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

const Signup = ({ auth }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    contact: yup.string().required("Campo obrigatório"),
    bio: yup.string().required("Campo obrigatório"),
    course_module: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório!"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = ({
    name,
    email,
    password,
    bio,
    contact,
    course_module,
  }) => {
    const user = { name, email, password, bio, contact, course_module };
    api
      .post("/users", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta, tente outro email"));
    // console.log(user);
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              name="name"
              label="Nome"
              placeholder="Seu nome"
              error={errors.name?.message}
            />

            <Input
              register={register}
              name="email"
              label="Email"
              placeholder="Seu email"
              error={errors.email?.message}
            />

            <Input
              register={register}
              name="bio"
              label="Bio"
              placeholder="Bio"
              error={errors.bio?.message}
            />

            <Input
              register={register}
              name="contact"
              label="Contato"
              placeholder="Ex: linkedin/in/johndoe ou telefone"
              error={errors.contact?.message}
            />

            <Input
              register={register}
              name="course_module"
              label="Módulo"
              placeholder="Ex: Segundo Módulo (Frontend avançado)"
              error={errors.course_module?.message}
            />

            <Input
              register={register}
              name="password"
              label="Senha"
              placeholder="Sua senha"
              type="password"
              error={errors.password?.message}
            />

            <Input
              register={register}
              name="passwordConfirm"
              label="Confirmação de Senha"
              placeholder="Confirmação de senha"
              type="password"
              error={errors.passwordConfirm?.message}
            />

            <Button type="submit">Enviar</Button>
            <p>
              Já é cadastrado? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Signup;
