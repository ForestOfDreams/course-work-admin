import React, { useState, useContext, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import UserRow from "../Components/UserRow";

const UsersPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users, setUsers] = useState([]);

  const [editableUser, setEditableUser] = useState({});

  const fetchUsers = () => {
    axios
      .get("https://internships-hse.herokuapp.com/management/api/students", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2bGFkNV9hZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6Y2hlY2sifSx7ImF1dGhvcml0eSI6ImNvdXJzZTpyZWFkIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6d3JpdGUifSx7ImF1dGhvcml0eSI6Im9yZ2FuaXphdGlvbjpyZWFkIn0seyJhdXRob3JpdHkiOiJvcmdhbml6YXRpb246d3JpdGUifSx7ImF1dGhvcml0eSI6InJldmlldzplZGl0In0seyJhdXRob3JpdHkiOiJzdHVkZW50OnJlYWQifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifV0sImlhdCI6MTYyMTAzMzczNiwiZXhwIjoxNjIxODE0NDAwfQ.4CCDiLomkxa3TRLhR7t4CxE3VfoXshT1OaKvfIiWrqfhNM5bIk0RvgT8It2s4yhH3UdeIAmPrZDVLo0yPfUuJw",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setUsers(response.data);
      });
  };

  const deleteUser = (id) => {
    console.log("fff");
    axios
      .delete(
        `https://internships-hse.herokuapp.com/management/api/students/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2bGFkNV9hZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6Y2hlY2sifSx7ImF1dGhvcml0eSI6ImNvdXJzZTpyZWFkIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6d3JpdGUifSx7ImF1dGhvcml0eSI6Im9yZ2FuaXphdGlvbjpyZWFkIn0seyJhdXRob3JpdHkiOiJvcmdhbml6YXRpb246d3JpdGUifSx7ImF1dGhvcml0eSI6InJldmlldzplZGl0In0seyJhdXRob3JpdHkiOiJzdHVkZW50OnJlYWQifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifV0sImlhdCI6MTYyMTAzMzczNiwiZXhwIjoxNjIxODE0NDAwfQ.4CCDiLomkxa3TRLhR7t4CxE3VfoXshT1OaKvfIiWrqfhNM5bIk0RvgT8It2s4yhH3UdeIAmPrZDVLo0yPfUuJw",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const editHandlerButton = (id) => {
    const editUser = users.find((user) => {
      return user.user_id === id;
    });
    setEditableUser(editUser);
    setName(editUser.name);
    handleShow();
  };

  const changeConfirmHandler = () => {
    // axios.put(
    //   `https://internships-hse.herokuapp.com/internships/${editableCourse.internship_id}`,
    //   {
    //     name: name,
    //     // description: description,
    //     // startDate: startDate,
    //     // finishDate: finishDate,
    //     // country: country,
    //     // subject: subject,
    //     // language: language,
    //     // price: price,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2bGFkNV9hZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6Y2hlY2sifSx7ImF1dGhvcml0eSI6ImNvdXJzZTpyZWFkIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6d3JpdGUifSx7ImF1dGhvcml0eSI6Im9yZ2FuaXphdGlvbjpyZWFkIn0seyJhdXRob3JpdHkiOiJvcmdhbml6YXRpb246d3JpdGUifSx7ImF1dGhvcml0eSI6InJldmlldzplZGl0In0seyJhdXRob3JpdHkiOiJzdHVkZW50OnJlYWQifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifV0sImlhdCI6MTYyMTAzMzczNiwiZXhwIjoxNjIxODE0NDAwfQ.4CCDiLomkxa3TRLhR7t4CxE3VfoXshT1OaKvfIiWrqfhNM5bIk0RvgT8It2s4yhH3UdeIAmPrZDVLo0yPfUuJw",
    //     },
    //   }
    // );
    handleClose();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
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
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите имя"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите фамилию"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите отчество"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите дату рождения"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите электронную почту"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
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
