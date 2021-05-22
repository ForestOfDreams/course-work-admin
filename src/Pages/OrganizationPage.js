import React, { useState, useContext, useEffect } from "react";
import { Table, Form, Modal, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Context from "../context";

import OrganizationRow from "../Components/OrganizationRow";

const Organization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [editableOrganiation, setEditableOrganiation] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");

  const { isLogin, setIsLogin } = useContext(Context);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchOrganizations = () => {
    axios
      .get("https://internships-hse.herokuapp.com/organizations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setOrganizations(response.data);
      });
  };

  const deleteOrganization = (id) => {
    axios
      .delete(`https://internships-hse.herokuapp.com/organizations/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        fetchOrganizations();
      });
  };

  const editHandlerButton = (id) => {
    const editOrganization = organizations.find((organization) => {
      return organization.organization_id === id;
    });
    setEditableOrganiation(editOrganization);
    setName(editOrganization.name);
    setDescription(editOrganization.description);
    setReference(editOrganization.reference);
    handleShow();
  };
  const changeConfirmHandler = () => {
    axios
      .put(
        `https://internships-hse.herokuapp.com/organizations/${editableOrganiation.organization_id}`,
        {
          name: name,
          description: description,
          reference: reference,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        fetchOrganizations();
      });
    handleClose();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
    fetchOrganizations();
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
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Заполните название"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Заполните описание"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Сайт</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Заполните ссылку на сайт"
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
            <th>Название</th>
            <th>Описание</th>
            <th>Сайт</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => {
            return (
              <OrganizationRow
                organization_id={organization.organization_id}
                name={organization.name}
                reference={organization.reference}
                description={organization.description}
                onDelete={deleteOrganization}
                onEdit={editHandlerButton}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Organization;
