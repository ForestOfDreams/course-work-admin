import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Context from "../context";

const Login = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { isLogin, setIsLogin } = useContext(Context);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // fetch("https://internships-hse.herokuapp.com/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: login,
    //     password: password,
    //   }),
    // }).then((response) => {
    //   console.log(response);
    // });

    axios
      .post("https://internships-hse.herokuapp.com/login", {
        username: login,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.headers.authorization);
        setIsLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="w-50">
      <Form className={"mt-4"}>
        <Alert className={"alert alert-primary "}>Вход</Alert>

        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            className="form-control"
            placeholder="Введите ваш логин"
          />
        </Form.Group>

        <FormGroup>
          <Form.Label className="mt-2">Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control "
            placeholder="Введите пароль"
          />
        </FormGroup>

        <Row className="row justify-content-between mt-2 w-100">
          <Col className="col-4 text-center">
            <Button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={onSubmitHandler}
            >
              Войти
            </Button>
          </Col>
          <Col className="col-4 text-center">
            <Button
              type="submit"
              className="btn-secondary mt-2 "
              href="/register"
            >
              Перейти к регистрации
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
