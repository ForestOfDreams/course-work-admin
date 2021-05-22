import React, { useState, useContext, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Context from "../context";
import UserRow from "../Components/UserRow";

const UsersPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isLogin, setIsLogin } = useContext(Context);

  const [users, setUsers] = useState([]);

  const [editableUser, setEditableUser] = useState({});

  const fetchUsers = () => {
    axios
      .get("https://internships-hse.herokuapp.com/management/api/students", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (localStorage.getItem("token")) {
          setIsLogin(true);
        }
        setUsers(response.data);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(
        `https://internships-hse.herokuapp.com/management/api/students/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        fetchUsers();
      });
  };

  const editHandlerButton = (id) => {
    const editUser = users.find((user) => {
      return user.user_id === id;
    });
    setEditableUser(editUser);
    setName(editUser.name);
    setSurname(editUser.surname);
    setPatronymic(editUser.patronymic);
    setEmail(editUser.email);
    setPhone(editUser.phone);
    setDayOfBirth(editUser.dayOfBirth);
    handleShow();
  };

  const changeConfirmHandler = () => {
    axios.put(
      `https://internships-hse.herokuapp.com/management/api/students/${editableUser.user_id}`,
      {
        name: name,
        surname: surname,
        patronymic: patronymic,
        email: email,
        phone: phone,
        dayOfBirth: dayOfBirth,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    handleClose();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!isLogin) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Неавторизован!</Alert.Heading>
        <p>
          Необходимо авторизоваться. Нажмите на кнопку "Аутентификация" в
          верхнем меню
        </p>
        <div className="d-flex justify-content-end"></div>
      </Alert>
    );
  }

  return (
    <>
      <Modal
        size={"lg"}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Редактирование</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-2">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Введите имя"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              placeholder="Введите фамилию"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={patronymic}
              onChange={(event) => setPatronymic(event.target.value)}
              placeholder="Введите отчество"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={dayOfBirth}
              onChange={(event) => setDayOfBirth(event.target.value)}
              placeholder="Введите дату рождения"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Введите электронную почту"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Введите телефон"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить изменения
          </Button>
          <Button onClick={changeConfirmHandler} variant="primary">
            Применить изменения
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Логин</th>
            <th>Роль</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>День рождения</th>
            <th>Электронная почта</th>
            <th>Телефон</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <UserRow
                user_id={user.user_id}
                username={user.username}
                role={user.role}
                name={user.name}
                surname={user.surname}
                patronymic={user.patronymic}
                subject={user.subject}
                dayOfBirth={user.dayOfBirth}
                email={user.email}
                phone={user.phone}
                onDelete={deleteUser}
                onEdit={editHandlerButton}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UsersPage;
