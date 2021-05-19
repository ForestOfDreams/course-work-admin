import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");

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
      .post("https://internships-hse.herokuapp.com/api/students", {
        username: login,
        password: password,
        name: name,
        surname: surname,
        patronymic: patronymic,
        email: email,
        phone: phone,
        dayOfBirth: dayOfBirth,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="w-50">
      <Form className={"mt-4"}>
        <Alert className={"alert alert-primary"}>Регистрация</Alert>

        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Введите логин"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </Form.Group>

        <FormGroup>
          <Form.Label className="mt-2">Пароль</Form.Label>
          <Form.Control
            type="password"
            className="form-control "
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>

        <Form.Group>
          <Form.Label className="mt-2">Имя</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-2">Фамилия</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Введите вашу фамилию"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-2">Отчество</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Введите ваше отчество"
            value={patronymic}
            onChange={(event) => setPatronymic(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-2">E-mail</Form.Label>
          <Form.Control
            type="e-mail"
            className="form-control"
            placeholder="Введите ваш адрес электронной почты"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-2">Телефон</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Введите ваш телефон"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-2">День рождения</Form.Label>
          <Form.Control
            type="date"
            className="form-control"
            placeholder="Введите ваш телефон"
            value={dayOfBirth}
            onChange={(event) => setDayOfBirth(event.target.value)}
          />
        </Form.Group>

        <Row className="row justify-content-between mt-2 w-100">
          <Col className="col-4 text-center">
            <Button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={onSubmitHandler}
            >
              Зарегистрироваться
            </Button>
          </Col>
          <Col className="col-4 text-center">
            <Button type="submit" className="btn-secondary mt-2 " href="/login">
              Перейти ко входу
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Register;
